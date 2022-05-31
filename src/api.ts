import { LatLngTuple } from 'leaflet';

const API_KEY = process.env.REACT_APP_API_KEY;

export type GeoResult = {
    features: Array<{
        geometry: {
            coordinates: LatLngTuple[]
        }
    }>
}

export const requestGeoPath = ({start, end}: {start: LatLngTuple, end: LatLngTuple}): Promise<GeoResult> =>
    fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${start.reverse().join(',')}&end=${end.reverse().join(',')}`)
        .then(res => res.json());