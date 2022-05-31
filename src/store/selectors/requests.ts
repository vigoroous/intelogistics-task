import { RootState } from "store"

export const selectRequests = (state: RootState) => state.requests.data;
export const selectSelectedRequest = (state: RootState) => state.requests.selected;