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
    data: Array<Request>
}

const initialState: RequestState = {
    selected: null,
    data: [
        // { title: 'request', id: 1, dest: { title: 'A', pos: [-0.09, 51.505]}, depart: { title: 'G', pos: [-0.02933,51.47970]}  },
        { title: 'request', id: 1, dest: { title: 'A', pos: [55.852985, 38.43966] }, depart: { title: 'G', pos: [55.88559, 38.44870] } },
        { title: 'request', id: 2, dest: { title: 'B', pos: [51.505, -0.09] }, depart: { title: 'H', pos: [51.47970, -0.02933] } },
        { title: 'request', id: 3, dest: { title: 'C', pos: [51.505, -0.09] }, depart: { title: 'I', pos: [51.47970, -0.02933] } },
        { title: 'request', id: 4, dest: { title: 'D', pos: [51.505, -0.09] }, depart: { title: 'J', pos: [51.47970, -0.02933] } },
        { title: 'request', id: 5, dest: { title: 'E', pos: [51.505, -0.09] }, depart: { title: 'K', pos: [51.47970, -0.02933] } },
        { title: 'request', id: 6, dest: { title: 'F', pos: [51.505, -0.09] }, depart: { title: 'L', pos: [51.47970, -0.02933] } },
    ],
}

export enum RequestsTypes {
    ADD_REQUEST = "ADD_REQUEST",
    REMOVE_REQUEST = "REMOVE_REQUEST",
    CHANGE_DEST = "CHANGE_DEST",
    CHANGE_DEPART = "CHANGE_DEPART",
    SELECT_REQUEST = "SELECT_REQUEST",
}

export type RequestsAddAction = { type: RequestsTypes.ADD_REQUEST, payload: Request }
export type RequestsRemoveRequestAction = { type: RequestsTypes.REMOVE_REQUEST, payload: number }
export type RequestsChangeDestAction = { type: RequestsTypes.CHANGE_DEST, payload: Pick<Request, 'id' | 'dest'> }
export type RequestsChangeDepartAction = { type: RequestsTypes.CHANGE_DEPART, payload: Pick<Request, 'id' | 'depart'> }
export type RequestsSelectRequestAction = { type: RequestsTypes.SELECT_REQUEST, payload: Request['id'] }

export type RequestsActions =
    | RequestsAddAction
    | RequestsRemoveRequestAction
    | RequestsChangeDestAction
    | RequestsChangeDepartAction
    | RequestsSelectRequestAction

export const requestReducer = (state = initialState, action: RequestsActions): RequestState => {
    switch (action.type) {
        case RequestsTypes.ADD_REQUEST:
            return { ...state, data: union(state.data, [action.payload]) };
        case RequestsTypes.REMOVE_REQUEST:
            return { ...state, data: remove(state.data, { id: action.payload }) };
        case RequestsTypes.CHANGE_DEST: {
            const index = findIndex(state.data, { id: action.payload.id });
            if (index !== -1) {
                const data = state.data.slice();
                data[index].dest = action.payload.dest;
                return { ...state, data };
            }
            return state;
        }
        case RequestsTypes.CHANGE_DEPART: {
            const index = findIndex(state.data, { id: action.payload.id });
            if (index !== -1) {
                const data = state.data.slice();
                data[index].depart = action.payload.depart;
                return { ...state, data };
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
        default:
            return state;
    }
}