import { all } from "redux-saga/effects";
import geoSaga from "./geoSaga";

export default function* mainSaga() {
    yield all([
        geoSaga()
    ]);
}