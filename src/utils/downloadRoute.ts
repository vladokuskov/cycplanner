import { GeoPoint } from '@/components/types/props/geoPoint.types';
import downloadjs from 'downloadjs';

export const downloadGPXFile = async (route: GeoPoint[]) => {
  const date = new Date();
  const currentDate = `${date.getFullYear()}_${
    date.getMonth() + 1
  }_${date.getDate()}_${date.getHours()}:${date.getMinutes()}`;

  const filename = `event_route_gpx_${currentDate}`;

  let gpxString = `
<?xml version="1.0" encoding="UTF-8"?>
<gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.topografix.com/GPX/gpx_style/0/2 http://www.topografix.com/GPX/gpx_style/0/2/gpx_style.xsd" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpx_style="http://www.topografix.com/GPX/gpx_style/0/2" version="1.1" creator="https://cycplanner.vercel.app/">
  <metadata>
    <name>${filename}</name>
    <author>
      <name>cycroute</name>
      <link href="https://cycplanner.vercel.app/"></link>
    </author>
  </metadata>
  <trk>
    <name>${filename}</name>
    <type>Cycling</type>
    <trkseg>;
      ${route
        .map((point) => `<trkpt lat="${point.lat}" lon="${point.lon}"></trkpt>`)
        .join('\n\t')}
    </trkseg>
  </trk>
</gpx>`;

  downloadjs(gpxString, `${filename}.gpx`, 'application/gpx+xml');
};
