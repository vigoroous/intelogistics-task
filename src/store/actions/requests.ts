import {
    RequestsAddAction,
    RequestsChangeDestAction,
    RequestsChangeDepartAction,
    RequestsRemoveRequestAction,
    RequestsSelectRequestAction,
    RequestsTypes
} from "store/reducers/requests"

export const addRequest = (payload: RequestsAddAction['payload']): RequestsAddAction => ({
    type: RequestsTypes.ADD_REQUEST,
    payload
});

export const changeDest = (payload: RequestsChangeDestAction['payload']): RequestsChangeDestAction => ({
    type: RequestsTypes.CHANGE_DEST,
    payload
});

export const changeDepart = (payload: RequestsChangeDepartAction['payload']): RequestsChangeDepartAction => ({
    type: RequestsTypes.CHANGE_DEPART,
    payload
});

export const removeRequest = (payload: RequestsRemoveRequestAction['payload']): RequestsRemoveRequestAction => ({
    type: RequestsTypes.REMOVE_REQUEST,
    payload
});

export const selectRequest = (payload: RequestsSelectRequestAction['payload']): RequestsSelectRequestAction => ({
    type: RequestsTypes.SELECT_REQUEST,
    payload
});

