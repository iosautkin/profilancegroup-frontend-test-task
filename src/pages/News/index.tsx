import React, { useCallback, useEffect, useState } from 'react';
import { Input, Button, Spin } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createNews, deleteNews, loadNews, publishNews, selectAvailableNews } from '../../store/news/newsSlice';
import { debounce } from 'lodash';
import AddNewsItemModal from './AddNewsItemModal';
import NewsItem from './NewsItem';

export function News() {
  const news = useAppSelector(selectAvailableNews);
  const isLoading = useAppSelector(state => state.news.status === 'loading');
  const userRole = useAppSelector(state => state.auth.user?.role);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');

  const loadNewsCallback = useCallback(
    debounce(search => dispatch(loadNews(search)), 500),
    [dispatch]
  );

  useEffect(() => {
    loadNewsCallback(search);
  }, [search, loadNewsCallback]);

  function onClickAddNews({ title, text }: { title: string, text: string }) {
    dispatch(createNews({ title, text }));
    setModalVisible(false);
  }

  function onClickPublish(id: number) {
    dispatch(publishNews(id));
  }

  function onClickDeleteNews(id: number) {
    dispatch(deleteNews(id));
  }

  return (
    <Content className="content">
      {isLoading && (
        <Spin
          style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 100 }}
          indicator={<LoadingOutlined style={{ fontSize: 96 }} spin />}
        />
      )}

      <div
        className="news__toolbar"
      >
        <Input
          size="large"
          placeholder="Искать новость по заголовку"
          prefix={<SearchOutlined />}
          style={{ width: 350 }}
          onChange={e => setSearch(e.target.value)}
          allowClear
        />
        {userRole ? (
          <Button
            type="primary"
            size="large"
            onClick={() => setModalVisible(true)}
          >
            Добавить новость
          </Button>
        ) : null}
      </div>

      <div className="news">
        {news.map((newsItem, i) => (
          <div className="news__column" key={newsItem.id}>
            <NewsItem
              newsItem={newsItem}
              showButtons={userRole === 'admin'}
              onClickPublish={() => onClickPublish(newsItem.id)}
              onClickDelete={() => onClickDeleteNews(newsItem.id)}
            />
          </div>
        ))}
      </div>

      <AddNewsItemModal
        isVisible={isModalVisible}
        onCancel={() => setModalVisible(false)}
        onClickAddNews={onClickAddNews}
      />
    </Content>
   );
}

export default News;
