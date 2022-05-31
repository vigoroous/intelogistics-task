import { FC } from "react";
import {
    MapContainer,
    TileLayer,
} from 'react-leaflet';

import Route from "./Route";

const MapComponent: FC = () =>
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{height: 'calc(100vh - 2rem)'}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Route />
    </MapContainer>

export default MapComponent;