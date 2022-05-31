import { LatLngTuple } from 'leaflet';

export type RequestState = {
    loading: boolean;
    data: LatLngTuple[];
    error: any | null;
}

const initialState: RequestState = {
    data: [],
    error: null,
    loading: false,
}

export enum GeoTypes {
    GEO_FETCH_REQUESTED = "GEO_FETCH_REQUESTED",
    GEO_FETCH_SUCCEDED = "GEO_FETCH_SUCCEDED",
    GEO_FETCH_FAILED = "GEO_FETCH_FAILED",
}

export type GeoRequestAction = {type: GeoTypes.GEO_FETCH_REQUESTED}
export type GeoRequestSuccessAction = {type: GeoTypes.GEO_FETCH_SUCCEDED, payload: RequestState['data']}
export type GeoRequestFailAction = {type: GeoTypes.GEO_FETCH_FAILED, payload: Error}

export type GeoActions =
    | GeoRequestAction
    | GeoRequestSuccessAction
    | GeoRequestFailAction

export const geoReducer = (state = initialState, action: GeoActions): RequestState => {
    switch (action.type) {
        case GeoTypes.GEO_FETCH_REQUESTED:
            return {...state, loading: true, error: null};
        case GeoTypes.GEO_FETCH_FAILED:
            return {...state, loading: false, error: action.payload};
        case GeoTypes.GEO_FETCH_SUCCEDED:
            return {data: action.payload, loading: false, error: null};
        default:
            return state;
    }
}