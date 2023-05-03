import React, { useState } from 'react';

import geohash from 'ngeohash';
import { FileUploader } from 'react-drag-drop-files';
import { parseString } from 'xml2js';

import { useAuth } from '@/context/AuthContext';
import { createEvent } from '@/firebase/events';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from '@reduxjs/toolkit';

import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { IEvent } from '../../types/shared/event.types';
import { GeoPoint } from '../../types/shared/geoPoint.types';
import { EventType } from '../EventType/EventType';
import {
  StyledEventFormWrapper,
  StyledEventTypesWrapper,
  StyledFormFooterWrapper,
  StyledFormMainWrapper,
  StyledInputsWrapper,
  StyledPageTitle,
} from './EventCreationForm.styles';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';

const EventCreationForm = () => {
  const { user } = useAuth();

  const [file, setFile] = useState<null | File>(null);
  const [route, setRoute] = useState<null | GeoPoint[]>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [errorStatus, setErrorStatus] = useState({
    isError: false,
    errorText: '',
  });

  const initialFormState: IEvent = {
    id: nanoid(),
    metadata: {
      author: {
        username: user?.displayName,
        photoUrl: user?.photoURL,
        uid: user?.uid,
      },
      likes: 0,
      createdAt: Date.now(),
      lastUpdatedAt: Date.now(),
    },
    participating: {
      submittedUsers: [user ? user.uid : ''],
      awaitingUsers: [],
    },
    favoriteUsers: [],
    title: '',
    description: '',
    distance: '',
    type: '',
    location: { geoPoint: { lat: null, lon: null } },
    route: null,
  };

  const [eventForm, setEventForm] = useState<IEvent>(initialFormState);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEventForm((prev) => ({ ...prev, [name]: value }));
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
            // Using flatMap to get rid of nested Array ->
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
    setEventForm(initialFormState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingEvent(true);
    if (route) {
      try {
        await createEvent(eventForm);

        resetForm();

        if (errorStatus.isError) {
          setErrorStatus({
            isError: false,
            errorText: '',
          });
        }
      } catch (err) {
        setErrorStatus({
          isError: true,
          errorText: 'An error occurred while creating the event',
        });
      }
    }

    setIsCreatingEvent(false);
  };

  const handleTypeChange = (e: string) => {
    setEventForm((prev) => ({ ...prev, type: e }));
  };

  return (
    <>
      <StyledPageTitle>Create Event</StyledPageTitle>
      <StyledEventFormWrapper onSubmit={handleSubmit}>
        <StyledFormMainWrapper>
          <StyledInputsWrapper>
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
              fieldType="number"
              label="Distance (km)"
              placeholder="Enter Distance"
              variant="outlined"
              name="distance"
              required
              value={eventForm.distance}
              onChange={handleFormChange}
            />
            <StyledEventTypesWrapper>
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
              {errorStatus.isError && (
                <ErrorMessage
                  variant="basic"
                  errorText={errorStatus.errorText}
                />
              )}
            </StyledEventTypesWrapper>
          </StyledInputsWrapper>
          <FileUploader
            handleChange={handleFileUpload}
            name="file"
            types={['gpx']}
            multiple={false}
            required
          />
        </StyledFormMainWrapper>
        <StyledFormFooterWrapper>
          <Button
            buttonType="submit"
            text={isCreatingEvent ? 'Creating' : 'Create event'}
            icon={isCreatingEvent ? faCircleNotch : null}
            rotate={isCreatingEvent}
            disabled={isCreatingEvent}
            size="md1"
            full
          />
        </StyledFormFooterWrapper>
      </StyledEventFormWrapper>
    </>
  );
};

export { EventCreationForm };
