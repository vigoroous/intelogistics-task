import { FC } from "react";
import { useSelector } from "react-redux";
import { List, Typography, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { useAppDispatch } from "store";

import { selectRequest } from "store/actions/requests";
import { geoRequest } from "store/actions/geo";

import { Request } from "store/reducers/requests";

import { selectSelectedRequest } from "store/selectors/requests";

const RequestElem: FC<Request> = ({id, depart, dest, title}) => {
    const dispatch = useAppDispatch();
    const selected = useSelector(selectSelectedRequest);

    const isSelected = id === selected?.id;

    return (
        <List.Item
            key={id}
            actions={[<EditOutlined onClick={() => console.log('test')}/>]}
            className={`${isSelected ? 'bg-slate-50' : 'bg-white'}`}
            onClick={() => {
                dispatch(selectRequest(id));
                dispatch(geoRequest());
            }}
        >
            <Space direction="vertical">
                <Typography.Title level={4}>{title}</Typography.Title>
                <Typography.Text>{`Заявка из ${depart.title} в ${dest.title}`}</Typography.Text>
            </Space>
        </List.Item>
    );
}

export default RequestElem;