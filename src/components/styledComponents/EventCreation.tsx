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

const EventFormWrapper = styled.form`
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
`;

const EventCreation = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<null | File>(null);
  const [route, setRoute] = useState<null | GeoPoint[]>(null);

  const [eventForm, setEventForm] = useState({
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
    location: { geoPoint: { lat: null, lng: null } },
    startDate: '',
    endDate: '',
    route: route,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEventForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (file: File) => {
    setFile(file);

    const fileType = file.name.split('.').pop();

    const reader = new FileReader();

    reader.onload = (e: Event) => {
      const content = (e.target as FileReader).result;

      if (fileType === 'gpx' && content) {
        parseString(content, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            const points = result.gpx.trk[0].trkseg[0].trkpt;
            const newRoute = points.flatMap((point: any) => ({
              lat: parseFloat(point.$.lat),
              lng: parseFloat(point.$.lon),
            }));
            setRoute(newRoute);
            setEventForm((prev) => ({
              ...prev,
              route: newRoute,
              location: { ...prev.location, geoPoint: newRoute[0] },
            }));
          }
        });
      } else if (fileType === 'kml' && content) {
        parseString(content, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            const placemarks = result.kml.Document[0].Placemark;
            const newRoute = placemarks
              .filter((placemark: any) => placemark.LineString)
              .map((placemark: any) => {
                const coordinates = placemark.LineString[0].coordinates[0];
                const points = coordinates.split(' ');
                return points.flatMap((point: any) => {
                  const [lng, lat] = point.split(',');
                  return {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng),
                  };
                });
              });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createEvent(eventForm);
  };

  return (
    <>
      <EventFormWrapper onSubmit={handleSubmit}>
        <Input
          label="Title"
          placeholder="Enter Title"
          variant="outlined"
          name="title"
          value={eventForm.title}
          required
          onChange={handleFormChange}
        />
        <Input
          label="Description"
          placeholder="Enter Description"
          variant="outlined"
          name="description"
          required
          value={eventForm.description}
          onChange={handleFormChange}
        />
        <Input
          label="Distance"
          placeholder="Enter Distance"
          variant="outlined"
          name="distance"
          required
          value={eventForm.distance}
          onChange={handleFormChange}
        />
        <Input
          label="Event type"
          placeholder="Example: gravel ride"
          variant="outlined"
          name="type"
          required
          value={eventForm.type}
          onChange={handleFormChange}
        />
        <Input
          label="Start date"
          placeholder="DD/MM/YYYY"
          variant="outlined"
          name="startDate"
          value={eventForm.startDate}
          onChange={handleFormChange}
        />
        <Input
          label="End date"
          placeholder="DD/MM/YYYY"
          variant="outlined"
          name="endDate"
          value={eventForm.endDate}
          onChange={handleFormChange}
        />
        <FileUploader
          handleChange={handleFileUpload}
          name="file"
          types={['gpx', 'kml']}
          multiple={false}
          required
        />
        {file && <p>Uploaded {file.name}</p>}
        <Button buttonType="submit" text="Create event" />
      </EventFormWrapper>
    </>
  );
};

export { EventCreation };
