import { Form, Modal, Select } from "antd";
import { find } from "lodash";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { changeRequest, toEditRequest } from "store/actions/requests";

import { selectToEditRequest } from "store/selectors/requests";
import { fakeOptions } from "utils";

type FormType = {
  fromTitle: string;
  toTitle: string;
  
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
            const depart = find(fakeOptions, {title: values.fromTitle});
            const dest = find(fakeOptions, {title: values.toTitle});
            if (depart && dest)
              dispatch(
                changeRequest({
                  ...toEdit,
                  depart,
                  dest  
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
          toTitle: toEdit?.dest.title,
        }}
        autoComplete="off"
      >
        <Form.Item name="fromTitle" label="Отправка из">
          <Select>
            {fakeOptions.map(item => (
              <Select.Option key={item.title} value={item.title}>
                {item.title} | [{item.pos.join(',')}]
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="toTitle" label="В">
          <Select>
            {fakeOptions.map(item => (
              <Select.Option key={item.title} value={item.title}>
                {item.title} | [{item.pos.join(',')}]
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditRequestModal;
