import React, { useEffect, useState } from 'react';

import geohash from 'ngeohash';
import { FileUploader } from 'react-drag-drop-files';
import { parseString } from 'xml2js';

import { useAuth } from '@/context/AuthContext';
import { createEvent } from '@/firebase/events';
import {
  faCircleNotch,
  faExternalLink,
  faPersonBiking,
  faPersonBreastfeeding,
  faPersonRunning,
  faPersonWalking,
  faPersonWalkingLuggage,
} from '@fortawesome/free-solid-svg-icons';
import { nanoid } from '@reduxjs/toolkit';

import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { Difficulty, Duration, IEvent } from '../../types/shared/event.types';
import { GeoPoint } from '../../types/shared/geoPoint.types';
import { EventType } from '../EventType/EventType';
import {
  StyledEventFormWrapper,
  StyledEventTypesWrapper,
  StyledFormFooterWrapper,
  StyledFormMainWrapper,
  StyledInputsWrapper,
  StyledPageTitle,
  StyledExternalLink,
  StyledCreationOptionWrapper,
  StyledLabel,
} from './EventCreationForm.styles';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { Icon } from '@/components/Icon/Icon';
import { SwitchButton } from '@/components/SwitchButton/SwitchButton';
import { calculateRouteDistance } from '@/utils/getDistance';
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';

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
    difficulty: Difficulty.easy,
    duration: Duration.short,
    ageRestriction: false,
    isPaid: false,
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

  useEffect(() => {
    setEventForm((prev) => ({
      ...prev,
      distance: route ? calculateRouteDistance(route).toFixed(2) : '',
    }));
  }, [route]);

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
              distance: route ? calculateRouteDistance(route).toFixed(2) : '',
            }));
          }
        });
      }
    };

    reader.readAsText(file);
  };

  const handleTypeChange = (e: string) => {
    setEventForm((prev) => ({ ...prev, type: e }));
  };

  const handleDifficultyChange = (e: string) => {
    if (e === 'Easy') {
      setEventForm((prev) => ({ ...prev, difficulty: Difficulty.easy }));
    } else if (e === 'Medium') {
      setEventForm((prev) => ({ ...prev, difficulty: Difficulty.medium }));
    } else if (e === 'Hard') {
      setEventForm((prev) => ({ ...prev, difficulty: Difficulty.hard }));
    } else if (e === 'Expert') {
      setEventForm((prev) => ({ ...prev, difficulty: Difficulty.expert }));
    }
  };

  const handleDurationChange = (e: string) => {
    if (e === '<1 hour') {
      setEventForm((prev) => ({ ...prev, duration: Duration.short }));
    } else if (e === '1-2 hours') {
      setEventForm((prev) => ({ ...prev, duration: Duration.medium }));
    } else if (e === '2-4 hours') {
      setEventForm((prev) => ({ ...prev, duration: Duration.long }));
    } else if (e === '>4 hours') {
      setEventForm((prev) => ({ ...prev, duration: Duration.endurance }));
    }
  };

  const handleAgeRestrictionChange = (e: string) => {
    if (e === 'Yes') {
      setEventForm((prev) => ({ ...prev, ageRestriction: true }));
    } else if (e === 'No') {
      setEventForm((prev) => ({ ...prev, ageRestriction: false }));
    }
  };

  const handlePaidChange = (e: string) => {
    if (e === 'Paid') {
      setEventForm((prev) => ({ ...prev, isPaid: true }));
    } else if (e === 'Free') {
      setEventForm((prev) => ({ ...prev, isPaid: false }));
    }
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

  return (
    <>
      <StyledPageTitle>Create Event</StyledPageTitle>
      <StyledEventFormWrapper onSubmit={handleSubmit}>
        <StyledFormMainWrapper>
          <StyledInputsWrapper>
            <StyledExternalLink
              title="Open route builder (cycroute)"
              target="_blank"
              href="https://cycroute.vercel.app/"
            >
              <span>Route builder</span>
              <Icon icon={faExternalLink} />
            </StyledExternalLink>
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
            <StyledCreationOptionWrapper>
              <StyledLabel>Difficulty</StyledLabel>
              <SwitchButton
                onClick={handleDifficultyChange}
                labels={['Easy', 'Medium', 'Hard', 'Expert']}
                icon={[
                  faPersonWalking,
                  faPersonWalkingLuggage,
                  faPersonRunning,
                  faPersonBiking,
                ]}
                indexActive={
                  eventForm.difficulty === 0
                    ? 0
                    : eventForm.difficulty === 1
                    ? 1
                    : eventForm.difficulty === 2
                    ? 2
                    : eventForm.difficulty === 3
                    ? 3
                    : 0
                }
              />
            </StyledCreationOptionWrapper>
            <StyledCreationOptionWrapper>
              <StyledLabel>{'Age restriction (>18)'}</StyledLabel>
              <SwitchButton
                onClick={handleAgeRestrictionChange}
                labels={['Yes', 'No']}
                indexActive={eventForm.ageRestriction === true ? 0 : 1}
              />
            </StyledCreationOptionWrapper>
            <StyledCreationOptionWrapper>
              <StyledLabel>Approximate duration</StyledLabel>
              <SwitchButton
                onClick={handleDurationChange}
                labels={['<1 hour', '1-2 hours', '2-4 hours', '>4 hours']}
                indexActive={
                  eventForm.duration === 0
                    ? 0
                    : eventForm.duration === 1
                    ? 1
                    : eventForm.duration === 2
                    ? 2
                    : eventForm.duration === 3
                    ? 3
                    : 0
                }
              />
            </StyledCreationOptionWrapper>
            <StyledCreationOptionWrapper>
              <StyledLabel>{'Event cost'}</StyledLabel>
              <SwitchButton
                onClick={handlePaidChange}
                labels={['Paid', 'Free']}
                icon={[faMoneyBill1]}
                indexActive={
                  eventForm.isPaid === true
                    ? 0
                    : eventForm.isPaid === false
                    ? 1
                    : 0
                }
              />
            </StyledCreationOptionWrapper>
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
