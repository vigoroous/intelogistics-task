import { Col, Form, Input, Modal, Row } from "antd";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { changeRequest, toEditRequest } from "store/actions/requests";

import { selectToEditRequest } from "store/selectors/requests";

type FormType = {
  fromTitle: string;
  fromA: number;
  fromB: number;
  toTitle: string;
  toA: number;
  toB: number;
};

const EditRequestModal: FC = () => {
  const dispatch = useAppDispatch();
  const toEdit = useSelector(selectToEditRequest);
  const [form] = Form.useForm<FormType>();

  useEffect(() => {
      if (!toEdit) return;
      form.resetFields();
  }, [toEdit]); // eslint-disable-line

  return (
    <Modal
      title={`Изменить маршрут ${toEdit?.title}`}
      visible={!!toEdit}
      onOk={() => {
        if (!toEdit) return;
        form
          .validateFields()
          .then((values) => {
            dispatch(
              changeRequest({
                ...toEdit,
                depart: {
                  title: values.fromTitle,
                  pos: [values.fromA, values.fromB],
                },
                dest: {
                  title: values.toTitle,
                  pos: [values.toA, values.toB],
                },
              })
            );
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => dispatch(toEditRequest(null))}
    >
      <Form
        name="request"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          fromTitle: toEdit?.depart.title,
          fromA: toEdit?.depart.pos[0],
          fromB: toEdit?.depart.pos[1],
          toTitle: toEdit?.dest.title,
          toA: toEdit?.dest.pos[0],
          toB: toEdit?.dest.pos[1],
        }}
        autoComplete="off"
      >
        <Form.Item
          name="fromTitle"
          label="Название из"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item name="fromA" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="fromB" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="toTitle"
          label="Название в"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item name="toA" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="toB" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditRequestModal;
