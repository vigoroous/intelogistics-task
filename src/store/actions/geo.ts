import {
    GeoRequestAction,
    GeoRequestFailAction,
    GeoRequestSuccessAction,
    GeoTypes
} from "store/reducers/geo"

export const geoRequest = (): GeoRequestAction => ({
    type: GeoTypes.GEO_FETCH_REQUESTED
});

export const geoFail = (payload: GeoRequestFailAction['payload']): GeoRequestFailAction => ({
    type: GeoTypes.GEO_FETCH_FAILED,
    payload
});

export const geoSuccess = (payload: GeoRequestSuccessAction['payload']): GeoRequestSuccessAction => ({
    type: GeoTypes.GEO_FETCH_SUCCEDED,
    payload
});
