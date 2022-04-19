import React, { useEffect, useState } from 'react';
import logo from './assets/logo.svg';
import logoMobile from './assets/logo_mobile.png';
import { Layout, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loginAction, logoutAction } from './store/auth/authSlice';
import LoginModal from './LoginModal';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const isLogged = !!auth.user;

  const onClickLogin = (credentials: { login: string, password: string }) => {
    dispatch(loginAction(credentials));
  }

  useEffect(() => {
    if (auth.status !== 'loading') setLoginModalVisible(auth.status === 'failed')
  }, [auth.status])

  const onClickLogout = () => {
    dispatch(logoutAction());
  }

  return (
    <Layout>
      <Header className="header">
        <Link className="header__logo-link" to="/">
          <img className="header__logo" src={logo} alt="logo" />
          <img className="header__logo header__logo_mobile" src={logoMobile} alt="logo" />
        </Link>
        <Menu
          className="header__menu"
          mode="horizontal"
          selectedKeys={[pathname]}
        >
          <Menu.Item className="header__home-menu-item" key="/" onClick={() => navigate(`/`)}>
            Главная
          </Menu.Item>
          <Menu.Item key="/news" onClick={() => navigate(`/news`)}>
            Новости
          </Menu.Item>

          <Menu.Item
            key="login"
            className="header__login"
            onClick={() => {
              isLogged
                ? onClickLogout()
                : setLoginModalVisible(true);
            }}
          >
            {isLogged ? 'Выйти' : 'Войти'}
          </Menu.Item>
        </Menu>
      </Header>

      <Routes>
        <Route path="/news" element={<News />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <LoginModal
        isVisible={isLoginModalVisible}
        onCancel={() => setLoginModalVisible(false)}
        onClickLogin={onClickLogin}
        auth={auth}
      />
    </Layout>
   );
}

export default App;
