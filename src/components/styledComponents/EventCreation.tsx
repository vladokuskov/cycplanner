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
    startDate: '',
    endDate: '',
    route: route,
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEventForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (file: File) => {
    setFile(file);

    const fileType = file.name.split('.').pop();

    const reader = new FileReader();

    reader.onload = (e: Event) => {
      const content = (e.target as FileReader).result;

      if (fileType === 'gpx' && typeof content === 'string') {
        parseString(content, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            const points = result.gpx.trk[0].trkseg[0].trkpt;
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
      startDate: '',
      endDate: '',
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
              label="Distance"
              placeholder="Enter Distance"
              variant="outlined"
              name="distance"
              required
              value={eventForm.distance}
              onChange={handleFormChange}
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
              name="startDate"
              required
              value={eventForm.startDate}
              onChange={handleFormChange}
            />
            <Input
              full
              label="End date"
              placeholder="DD/MM/YYYY"
              variant="outlined"
              name="endDate"
              required
              value={eventForm.endDate}
              onChange={handleFormChange}
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
