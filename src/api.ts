import { LatLngTuple } from 'leaflet';
import { flow, join, reverse, slice } from 'lodash';

const API_KEY = process.env.REACT_APP_API_KEY;

export type GeoResult = {
    features: Array<{
        geometry: {
            coordinates: LatLngTuple[]
        }
    }>
}

const toApi = flow(slice, reverse, join);

export const requestGeoPath = ({start, end}: {start: LatLngTuple, end: LatLngTuple}): Promise<GeoResult> =>
    fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${toApi(start)}&end=${toApi(end)}`)
        .then(res => res.json());