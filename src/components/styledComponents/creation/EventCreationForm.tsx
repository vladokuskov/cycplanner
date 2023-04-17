import styled from 'styled-components';
import React, { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { useAuth } from '@/context/AuthContext';
import { nanoid } from '@reduxjs/toolkit';
import { FileUploader } from 'react-drag-drop-files';
import { parseString } from 'xml2js';
import { GeoPoint } from '../../types/props/geoPoint.types';
import { createEvent } from '@/firebase/events';
import { IEvent } from '../../types/styledComponents/event.types';
import geohash from 'ngeohash';
import { EventType } from './EventType';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

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
  gap: 1.5rem;
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
  gap: 0.5rem;
`;

const EventTypesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
`;

const EventCreationForm = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<null | File>(null);
  const [route, setRoute] = useState<null | GeoPoint[]>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [eventCreationStatus, setEventCreationStatus] = useState({
    isError: false,
    error: '',
  });

  const [eventForm, setEventForm] = useState<IEvent>({
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
    location: { geoPoint: { lat: null, lon: null }, hash: '' },
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
    const { value } = event.target;
    const regex = /^[0-9\b]+$/;
    if (value === '' || (regex.test(value) && value.length < 6)) {
      setEventForm((prev) => ({ ...prev, distance: value }));
    }
  };

  const handleFileUpload = (file: File) => {
    setFile(file);

    const reader = new FileReader();

    reader.onload = (e: Event) => {
      const content = (e.target as FileReader).result;

      if (typeof content === 'string') {
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
              location: {
                ...prev.location,
                geoPoint: newRoute[0],
                hash: geohash.encode(newRoute[0].lat, newRoute[0].lon),
              },
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
      route: null,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingEvent(true);
    if (route) {
      try {
        await createEvent(eventForm);

        resetForm();
      } catch (err: any) {
        setEventCreationStatus({ isError: true, error: err });
      }
    }

    setIsCreatingEvent(false);
  };

  const handleTypeChange = (e: string) => {
    setEventForm((prev) => ({ ...prev, type: e }));
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
            <EventTypesWrapper>
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
              <EventType
                handleTypeChange={(e: string) => handleTypeChange(e)}
              />
            </EventTypesWrapper>
          </InputsWrapper>
          <FileUploader
            handleChange={handleFileUpload}
            name="file"
            types={['gpx']}
            multiple={false}
            required
          />
        </FormMainWrapper>
        <FormFooterWrapper>
          <Button
            buttonType="submit"
            text={isCreatingEvent ? undefined : 'Create event'}
            icon={isCreatingEvent ? faCircleNotch : null}
            rotate={isCreatingEvent}
            disabled={isCreatingEvent}
            size="md1"
            full
          />
        </FormFooterWrapper>
      </EventFormWrapper>
    </>
  );
};

export { EventCreationForm };
