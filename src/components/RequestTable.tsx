import { FC } from "react";
import { useSelector } from "react-redux";
import { List } from 'antd';

import { selectRequests } from "store/selectors/requests";

import RequestElem from "./Request";

const RequestTable: FC = () => {
    const requests = useSelector(selectRequests);

    return (
        <List
            itemLayout="horizontal"
            dataSource={requests}
            renderItem={RequestElem}
        />
    );
}

export default RequestTable;