import {
    RequestsAddAction,
    RequestsChangeAction,
    RequestsRemoveRequestAction,
    RequestsSelectRequestAction,
    RequestsTypes,
    RequestsSelectForEditAction
} from "store/reducers/requests"

export const addRequest = (payload: RequestsAddAction['payload']): RequestsAddAction => ({
    type: RequestsTypes.ADD_REQUEST,
    payload
});

export const changeRequest = (payload: RequestsChangeAction['payload']): RequestsChangeAction => ({
    type: RequestsTypes.CHANGE,
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

export const toEditRequest = (payload: RequestsSelectForEditAction['payload']): RequestsSelectForEditAction => ({
    type: RequestsTypes.SELECT_FOR_EDIT,
    payload
});

