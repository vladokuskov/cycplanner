import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { useAuth } from '@/context/AuthContext';
import { nanoid } from '@reduxjs/toolkit';
import { FileUploader } from 'react-drag-drop-files';
import { parseString } from 'xml2js';

export type GeoPoint = {
  lat: number;
  lng: number;
};

const EventCreation = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<null | File>(null);
  const [route, setRoute] = useState<null | GeoPoint[]>(null);

  const [eventForm, setEventForm] = useState({
    metadata: {
      author: {
        username: user?.displayName,
        photoUrl: user?.photoURL,
        uid: user?.uid,
      },
      id: nanoid(),
      likes: 0,
      createdAt: Date.now(),
    },
    title: '',
    description: '',
    distance: '',
    type: '',
    location: { geoPoint: { lat: null, lng: null } },
    sdate: '',
    edate: '',
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
            const newRoute = points.map((point: any) => ({
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
                return points.map((point: any) => {
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
  };

  return (
    <>
      {file && <p>Uploaded {file.name}</p>}
      <form onSubmit={handleSubmit}>
        <FileUploader
          handleChange={handleFileUpload}
          name="file"
          types={['gpx', 'kml']}
          multiple={false}
          required
        />
        <Input
          placeholder="Enter Title"
          variant="outlined"
          name="title"
          value={eventForm.title}
          required
          onChange={handleFormChange}
        />
        <Input
          placeholder="Enter Description"
          variant="outlined"
          name="description"
          required
          value={eventForm.description}
          onChange={handleFormChange}
        />
        <Input
          placeholder="Enter Distance"
          variant="outlined"
          name="distance"
          required
          value={eventForm.distance}
          onChange={handleFormChange}
        />
        <Input
          placeholder="Enter Type"
          variant="outlined"
          name="type"
          required
          value={eventForm.type}
          onChange={handleFormChange}
        />
        <Input
          placeholder="Enter Start Date"
          variant="outlined"
          name="sdate"
          value={eventForm.sdate}
          onChange={handleFormChange}
        />
        <Input
          placeholder="Enter End Date"
          variant="outlined"
          name="edate"
          value={eventForm.edate}
          onChange={handleFormChange}
        />
        <Button buttonType="submit" text="Submit" />
      </form>
    </>
  );
};

export { EventCreation };
