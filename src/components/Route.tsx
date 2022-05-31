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
    const {data, loading} = useSelector(selectGeo);
    
    if (!selected) return null;
    return (
        <>
            {loading ?
                <Spin/>:
                <Polyline positions={data}/>}
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
        </>
    );
}

export default Route;