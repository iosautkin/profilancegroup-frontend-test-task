import React from 'react';
import { Input, Button, Modal, Form } from 'antd';


interface IAddNewsItemModalProps {
  onClickAddNews: (values: { title: string, text: string }) => void,
  isVisible: boolean,
  onCancel: () => void,
}

export function AddNewsItemModal({
  onClickAddNews,
  isVisible,
  onCancel,
}: IAddNewsItemModalProps) {
  return (
    <Modal
      title="Добавить новость"
      visible={isVisible}
      onCancel={onCancel}
      footer={false}
    >
      <Form
        name="login_form"
        initialValues={{
          remember: true,
        }}
        onFinish={onClickAddNews}
      >
        <Form.Item
          name="title"
          rules={[{
            required: true,
            message: 'Пожалуйста, введите заголовок новости!',
          }]}
        >
          <Input
            placeholder="Заголовок"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="text"
          rules={[{
            required: true,
            message: 'Пожалуйста, введите текст новости!',
          }]}
        >
          <Input.TextArea
            placeholder="Текст"
            size="large"
            style={{ height: 250 }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
          >
            Создать новость
          </Button>
        </Form.Item>
      </Form>
    </Modal>
   );
}

export default AddNewsItemModal;
