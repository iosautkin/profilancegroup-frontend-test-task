import React from 'react';
import { Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useAppSelector } from '../../store/hooks';

export function Home() {
  const user = useAppSelector(state => state.auth.user);
  const login = user?.login || 'Гость';

  return (
    <Content className="content" >
      <div className="content__inner">
      <Typography.Title level={1}>
        Привет, {login}!
      </Typography.Title>
      </div>
    </Content>
   );
}

export default Home;
