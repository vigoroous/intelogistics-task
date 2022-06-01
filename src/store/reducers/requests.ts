import { union, remove, findIndex, find } from 'lodash';
import { LatLngTuple } from 'leaflet';

export type Position = {
    title: string,
    pos: LatLngTuple
};

export type Request = {
    id: number,
    title: string,
    dest: Position,
    depart: Position,
}

export type RequestState = {
    selected: Request | null,
    toEdit: Request | null,
    data: Array<Request>
}

const initialState: RequestState = {
    selected: null,
    toEdit: null,
    data: [
        { title: 'request-1', id: 1, dest: { title: 'A', pos: [55.852985, 38.43966] }, depart: { title: 'D', pos: [55.8467,38.5012] } },
        { title: 'request-2', id: 2, dest: { title: 'B', pos: [51.505, -0.09] }, depart: { title: 'E', pos: [51.5206,-0.0746] } },
        { title: 'request-3', id: 3, dest: { title: 'C', pos: [51.505, -0.09] }, depart: { title: 'F', pos: [51.5320,-0.1061] } },
    ],
}

export enum RequestsTypes {
    ADD_REQUEST = "ADD_REQUEST",
    SELECT_FOR_EDIT = "SELECT_FOR_EDIT",
    REMOVE_REQUEST = "REMOVE_REQUEST",
    CHANGE = "CHANGE",
    SELECT_REQUEST = "SELECT_REQUEST",
}

export type RequestsAddAction = { type: RequestsTypes.ADD_REQUEST, payload: Request }
export type RequestsRemoveRequestAction = { type: RequestsTypes.REMOVE_REQUEST, payload: number }
export type RequestsChangeAction = { type: RequestsTypes.CHANGE, payload: Request }
export type RequestsSelectRequestAction = { type: RequestsTypes.SELECT_REQUEST, payload: Request['id'] }
export type RequestsSelectForEditAction = { type: RequestsTypes.SELECT_FOR_EDIT, payload: Request | null }

export type RequestsActions =
    | RequestsAddAction
    | RequestsRemoveRequestAction
    | RequestsChangeAction
    | RequestsSelectRequestAction
    | RequestsSelectForEditAction

export const requestReducer = (state = initialState, action: RequestsActions): RequestState => {
    switch (action.type) {
        case RequestsTypes.ADD_REQUEST:
            return { ...state, data: union(state.data, [action.payload]) };
        case RequestsTypes.REMOVE_REQUEST:
            return { ...state, data: remove(state.data, { id: action.payload }) };
        case RequestsTypes.CHANGE: {
            const index = findIndex(state.data, { id: action.payload.id });

            if (index !== -1) {
                const data = state.data.slice();
                data[index] = action.payload;
                return { ...state, data, toEdit: null };
            }

            return state;
        }
        case RequestsTypes.SELECT_REQUEST: {
            if (state.selected?.id === action.payload)
                return { ...state, selected: null };

            const found = find(state.data, { id: action.payload });
            if (found)
                return { ...state, selected: found };

            return state;
        }
        case RequestsTypes.SELECT_FOR_EDIT:
            return {...state, toEdit: action.payload };
        default:
            return state;
    }
}