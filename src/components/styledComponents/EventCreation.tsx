import styled from 'styled-components';
import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { useAuth } from '@/context/AuthContext';
import { nanoid } from '@reduxjs/toolkit';
import { FileUploader } from 'react-drag-drop-files';
import { parseString } from 'xml2js';
import { GeoPoint } from '../types/props/geoPoint.types';
import { createEvent } from '@/firebase/firestore';
import { EventProps } from '../types/styledComponents/event.types';
import { PageSeparator } from './PageSeparator';

const PageTitle = styled.h2`
  margin-top: 2rem;
  color: rgba(32, 32, 32, 0.77);
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3rem;
`;

const EventFormWrapper = styled.form`
  width: 100%;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const FormMainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 45rem;
  gap: 2rem;
  @media (min-width: 680px) {
    flex-direction: row-reverse;
    align-items: flex-start;
  }
`;

const FormFooterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 680px) {
    width: auto;
  }
`;

const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const EventCreation = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<null | File>(null);
  const [route, setRoute] = useState<null | GeoPoint[]>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [eventCreationStatus, setEventCreationStatus] = useState({
    isError: false,
    error: '',
  });

  const [eventForm, setEventForm] = useState<EventProps>({
    id: nanoid(),
    metadata: {
      author: {
        username: user?.displayName,
        photoUrl: user?.photoURL,
        uid: user?.uid,
      },
      likes: 0,
      createdAt: Date.now(),
    },
    title: '',
    description: '',
    distance: '',
    type: '',
    location: { geoPoint: { lat: null, lon: null } },
    date: '',
    route: route,
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEventForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDistanceInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const regex = /^[0-9\b]+$/;
    if (event.target.value === '' || regex.test(event.target.value)) {
      setEventForm((prev) => ({ ...prev, distance: event.target.value }));
    }
  };

  const handleDateInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    // First, get the new value of the input field and clean it up using regex
    let newValue = event.target.value
      .replace(/[^0-9\/]/g, '')
      .replace(/\/\/+/g, '/')
      .trim();

    // Next, check if the new value is a valid date
    if (
      value !== null &&
      value.length < event.target.value.length &&
      newValue.length > 1
    ) {
      // Split the date into its component parts (month, day, year)
      const parts = newValue.split('/');
      let day = parts[0];
      let month = parts[1];
      let year = parts[2];

      // Check if the new value needs to be formatted differently
      if (newValue.length === 2 && newValue.indexOf('/') === -1) {
        // if the user has only entered the month, add a slash after it
        newValue += '/';
      } else if (newValue.length === 5 && parts.length !== 3) {
        // if the user has entered the month and day, but not the year, add a slash after the day
        newValue += '/';
      } else if (
        newValue.length === 4 &&
        newValue.charAt(1) === '/' &&
        newValue.charAt(3) !== '/'
      ) {
        // if the user has entered the month and year together (e.g. 042023), add a slash between them
        newValue += '/';
      } else if (parts.length > 3 && newValue[newValue.length - 1] === '/') {
        // if the user has entered too many parts (e.g. 04/20/2023/), remove the extra slash
        newValue = newValue.slice(0, -1);
      } else if (parts.length === 3 && year.length > 4) {
        // if the year is longer than 4 digits (e.g. 20230), truncate it to 4 digits
        newValue = `${day}/${month}/${year.slice(0, 4)}`;
      }
    }

    setEventForm((prev) => ({ ...prev, [event.target.name]: newValue }));
  };

  const handleFileUpload = (file: File) => {
    setFile(file);

    // Getting the type of file
    const fileType = file.name.split('.').pop();

    const reader = new FileReader();

    reader.onload = (e: Event) => {
      const content = (e.target as FileReader).result;

      // Checking if filetype is .GPX or .KML
      if (fileType === 'gpx' && typeof content === 'string') {
        parseString(content, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            const points = result.gpx.trk[0].trkseg[0].trkpt;
            // Use flatmap to get rid of nested Array
            const newRoute = points.flatMap((point: { $: GeoPoint }) => ({
              lat: parseFloat(point.$.lat),
              lon: parseFloat(point.$.lon),
            }));
            setRoute(newRoute);
            setEventForm((prev) => ({
              ...prev,
              route: newRoute,
              location: { ...prev.location, geoPoint: newRoute[0] },
            }));
          }
        });
      } else if (fileType === 'kml' && typeof content === 'string') {
        parseString(content, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            const placemarks = result.kml.Document[0].Placemark;
            const newRoute = placemarks
              .filter((placemark: any) => placemark.LineString)
              .flatMap(
                (placemark: { LineString: [{ coordinates: [string] }] }) => {
                  const coordinates = placemark.LineString[0].coordinates[0];
                  const points = coordinates.split(' ');
                  return points.map((point: string) => {
                    const [lng, lat] = point.split(',');
                    return {
                      lat: parseFloat(lat),
                      lon: parseFloat(lng),
                    };
                  });
                }
              );
            // Updating route state and event form
            setRoute(newRoute);
            setEventForm((prev) => ({
              ...prev,
              route: newRoute,
              location: { ...prev.location, geoPoint: newRoute[0] },
            }));
          }
        });
      }
    };

    reader.readAsText(file);
  };

  const resetForm = () => {
    setFile(null);
    setRoute(null);
    setEventForm({
      id: nanoid(),
      metadata: {
        author: {
          username: user?.displayName,
          photoUrl: user?.photoURL,
          uid: user?.uid,
        },
        likes: 0,
        createdAt: Date.now(),
      },
      title: '',
      description: '',
      distance: '',
      type: '',
      location: { geoPoint: { lat: null, lon: null } },
      date: '',
      route: null,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingEvent(true);

    try {
      await createEvent(eventForm);

      resetForm();
    } catch (err: any) {
      setEventCreationStatus({ isError: true, error: err });
    }

    setIsCreatingEvent(false);
  };

  return (
    <>
      <PageTitle>Create Event</PageTitle>
      <EventFormWrapper onSubmit={handleSubmit}>
        <FormMainWrapper>
          <InputsWrapper>
            <Input
              full
              label="Title"
              placeholder="Enter Title"
              variant="outlined"
              name="title"
              value={eventForm.title}
              required
              onChange={handleFormChange}
            />
            <Input
              full
              label="Description"
              placeholder="Enter Description"
              variant="textarea"
              name="description"
              required
              value={eventForm.description}
              onChange={handleFormChange}
            />
            <Input
              full
              label="Distance (km)"
              placeholder="Enter Distance"
              variant="outlined"
              name="distance"
              required
              value={eventForm.distance}
              onChange={handleDistanceInput}
            />
            <Input
              full
              label="Event type"
              placeholder="Example: gravel ride"
              variant="outlined"
              name="type"
              required
              value={eventForm.type}
              onChange={handleFormChange}
            />
            <Input
              full
              label="Start date"
              placeholder="DD/MM/YYYY"
              variant="outlined"
              name="date"
              required
              value={eventForm.date}
              onChange={(e) => handleDateInput(e, eventForm.date)}
            />
          </InputsWrapper>
          <FileUploader
            handleChange={handleFileUpload}
            name="file"
            types={['gpx', 'kml']}
            multiple={false}
            required
          />
        </FormMainWrapper>
        <FormFooterWrapper>
          <Button
            buttonType="submit"
            text={isCreatingEvent ? 'Creating' : 'Create event'}
            disabled={isCreatingEvent}
            size="md1"
            full
          />
        </FormFooterWrapper>
      </EventFormWrapper>
      <PageSeparator />
    </>
  );
};

export { EventCreation };
