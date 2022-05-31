import {FC} from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import {
    Marker,
    Popup,
    Polyline,
} from 'react-leaflet';
import { selectGeo } from "store/selectors/geo";
import { selectSelectedRequest } from "store/selectors/requests";

const Route: FC = () => {
    const selected = useSelector(selectSelectedRequest);
    const {data, error, loading} = useSelector(selectGeo);

    if (!selected) return null;
    if (error) return null;
    return (
        <>
            <Marker position={selected.depart.pos}>
                <Popup>
                    Отправка из {selected.depart.title}
                </Popup>
            </Marker>
            <Marker position={selected.dest.pos}>
                <Popup>
                    Прибытие в {selected.dest.title}
                </Popup>
            </Marker>
            {loading ?
                <Spin/>:
                <Polyline positions={data}/>}
        </>
    );
}

export default Route;