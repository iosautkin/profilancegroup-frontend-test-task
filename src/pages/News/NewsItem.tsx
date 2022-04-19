import React from 'react';
import { Card, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { INew } from '../../store/news/newsSlice';


interface INewsItemProps {
  newsItem: INew,
  showButtons: boolean,
  onClickPublish: () => void,
  onClickDelete: () => void,
}

export function NewsItem({
  newsItem: { title, published, text, createdAt },
  showButtons,
  onClickPublish,
  onClickDelete
}: INewsItemProps) {
  return (
    <Card
      title={
        <div className="news-item">
          {title}
          {showButtons ? (
            <div className="news-item__header">
              <div className="news-item__header-buttons" >
                {!published ? (
                  <Button
                    type="primary"
                    size="small"
                    style={{ marginLeft: 24 }}
                    onClick={() => onClickPublish()}
                  >
                    Опубликовать
                  </Button>
                ) : null}
              </div>
              
              <Popconfirm
                title="Вы уверены, что хотите удалить новость?"
                onConfirm={() => onClickDelete()}
                onCancel={() => {}}
                okText="Да"
                cancelText="Нет"
              >
                <Button
                  type="primary"
                  size="small"
                  danger
                  style={{ marginLeft: 24 }}
                >
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </div>
          ) : null}
        </div>
      }
    >
      <p className="news-item__text">
        {text}
      </p>
      <p className="news-item__date">
        {new Date(createdAt).toLocaleString()}
      </p>
    </Card>
   );
}

export default NewsItem;
