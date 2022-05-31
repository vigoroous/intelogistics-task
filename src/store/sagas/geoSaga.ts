import { select, put, call, takeEvery } from "redux-saga/effects";
import { head } from "lodash";

import { selectSelectedRequest } from "store/selectors/requests";
import { Request } from "store/reducers/requests";
import { requestGeoPath, GeoResult } from "api";
import { geoFail, geoSuccess } from "store/actions/geo";
import { GeoTypes } from "store/reducers/geo";
import { toast } from "react-toastify";

function* fetchGeo() {
    const selected = (yield select(selectSelectedRequest)) as Request | null;
    if (!selected) return;
    const response = (yield call(requestGeoPath, {start: selected.depart.pos, end: selected.dest.pos})) as GeoResult & {error?: {message: string}};
    if (response.error) {
        yield put(geoFail(new Error(response.error.message)));
        toast.error(response.error.message);
    } else {
        const points = head(response.features)?.geometry.coordinates ?? [];
        yield put(geoSuccess(points.map(([a, b]) => [b, a])));
    }
}

export default function* geoSaga() {
    yield takeEvery(GeoTypes.GEO_FETCH_REQUESTED, fetchGeo);
}