import React from 'react';
import { Input, Button, Modal, Form } from 'antd';
import { IAuthState } from './store/auth/authSlice';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


interface ILoginModalProps {
  isVisible: boolean,
  onCancel: () => void,
  onClickLogin: (values: { login: string, password: string }) => void,
  auth: IAuthState,
}

export function LoginModal({
  isVisible,
  onCancel,
  onClickLogin,
  auth
}: ILoginModalProps) {
  return (
    <Modal
      title="Войти"
      visible={isVisible}
      onCancel={onCancel}
      footer={false}
      width={400}
    >
      <Form
        name="login_form"
        initialValues={{
          remember: true,
        }}
        onFinish={onClickLogin}
      >
        <Form.Item
          name="login"
          rules={[{
            required: true,
            message: 'Пожалуйста, ведите имя пользователя!',
          }]}
          {...(auth.status === 'failed' && auth.error === 'No such user' && {
            validateStatus: 'error',
            help: 'Нет такого пользователя!',
          })}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{
            required: true,
            message: 'Пожалуйста, введите пароль!',
          }]}
          {...(auth.status === 'failed' && auth.error === 'Wrong password' && {
            validateStatus: 'error',
            help: 'Неправильный пароль!',
          })}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={auth.status === 'loading'}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Modal>
   );
}

export default LoginModal;
