import { combineReducers } from "redux";
import {requestReducer} from "./requests";
import {geoReducer} from "./geo";

const rootReducer =  combineReducers({
    requests: requestReducer,
    geo: geoReducer,
})

export default rootReducer;