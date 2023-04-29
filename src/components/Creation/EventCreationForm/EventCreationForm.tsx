import React, { useState } from 'react';
import {
  EventTypesWrapper,
  InputsWrapper,
  FormFooterWrapper,
  FormMainWrapper,
  EventFormWrapper,
  PageTitle,
} from './EventCreationForm.styles';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { useAuth } from '@/context/AuthContext';
import { nanoid } from '@reduxjs/toolkit';
import { FileUploader } from 'react-drag-drop-files';
import { parseString } from 'xml2js';
import { GeoPoint } from '../../types/shared/geoPoint.types';
import { createEvent } from '@/firebase/events';
import { IEvent } from '../../types/shared/event.types';
import geohash from 'ngeohash';
import { EventType } from '../EventType/EventType';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const EventCreationForm = () => {
  const [file, setFile] = useState<null | File>(null);
  const [route, setRoute] = useState<null | GeoPoint[]>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [eventCreationStatus, setEventCreationStatus] = useState({
    isError: false,
    error: '',
  });
  const { user } = useAuth();

  const INITIAL_EVENT_FORM_STATE: IEvent = {
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
    participating: { submitedUsers: [user ? user.uid : ''], awaitingUsers: [] },
    bookmarkedUsers: [],
    title: '',
    description: '',
    distance: '',
    type: '',
    location: { geoPoint: { lat: null, lon: null } },
    route: null,
  };

  const [eventForm, setEventForm] = useState<IEvent>(INITIAL_EVENT_FORM_STATE);

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
    setEventForm(INITIAL_EVENT_FORM_STATE);
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
              fieldType="number"
              label="Distance (km)"
              placeholder="Enter Distance"
              variant="outlined"
              name="distance"
              required
              value={eventForm.distance}
              onChange={handleFormChange}
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
