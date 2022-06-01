import { FC } from "react";
import { useSelector } from "react-redux";
import { List, Typography, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { useAppDispatch } from "store";

import { selectRequest, toEditRequest } from "store/actions/requests";
import { geoRequest } from "store/actions/geo";

import { Request } from "store/reducers/requests";

import { selectSelectedRequest } from "store/selectors/requests";

const RequestElem: FC<Request> = (props) => {
    const dispatch = useAppDispatch();
    const selected = useSelector(selectSelectedRequest);

    const isSelected = props.id === selected?.id;

    return (
        <List.Item
            key={props.id}
            actions={[<EditOutlined onClick={e => {
                e.stopPropagation();
                dispatch(toEditRequest(props));
            }}/>]}
            style={{
                backgroundColor: isSelected ? 'rgba(248, 250, 252, 0.5)' : '#fff',
                padding: '8px 12px',
            }}
            onClick={() => {
                dispatch(selectRequest(props.id));
                dispatch(geoRequest());
            }}
        >
            <Space direction="vertical">
                <Typography.Title level={4}>{props.title}</Typography.Title>
                <Typography.Text>{`Заявка из ${props.depart.title} в ${props.dest.title}`}</Typography.Text>
            </Space>
        </List.Item>
    );
}

export default RequestElem;