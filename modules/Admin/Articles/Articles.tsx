'use client';

import {useState, useEffect} from 'react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useMutation, useQuery} from 'react-query';
import {getAllArticles, createArticle, updateArticle, deleteArticle} from '@/src/api';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import {Form, Input, Modal, Empty} from 'antd';
import Btn from '@/components/UI/Btn/Btn';
import Loading from '@/app/loading';
import {customNotification} from '@/src/helpers/customNotification';
import {CustomEditor} from '@/components/CustomEditor';

export const Articles = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null); // Состояние для редактируемой статьи
  const {data, isSuccess, isLoading, refetch} = useQuery('articles', getAllArticles);
  const {mutate: create} = useMutation(createArticle);
  const {mutate: update} = useMutation(updateArticle);
  const {mutate: remove} = useMutation(deleteArticle);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isSuccess) {
      setArticles(data.articles);
    }
  }, [data, isSuccess]);

  const handleSubmit = (values) => {
    if (editingArticle) {
      // Редактирование статьи
      update(
        {id: editingArticle.id, ...values, content},
        {
          onSuccess: (data) => {
            if (data?.message) {
              customNotification('success', 'top', 'Успешно', data.message);
            }
            setOpen(false);
            form.resetFields();
            setContent('');
            setEditingArticle(null); // Сброс редактируемой статьи после успешного редактирования
          },
          onError: (error) => {
            console.error('Ошибка при редактировании статьи:', error);
            customNotification('error', 'top', 'Ошибка', 'Ошибка при редактировании статьи');
          },
          onSettled: () => {
            refetch();
          }
        }
      );
    } else {
      // Создание новой статьи
      create(
        {...values, content},
        {
          onSuccess: (data) => {
            if (data?.message) {
              customNotification('success', 'top', 'Успешно', data.message);
            }
            setOpen(false);
            form.resetFields();
            setContent('');
          },
          onError: (error) => {
            console.error('Ошибка при создании статьи:', error);
            customNotification('error', 'top', 'Ошибка', 'Ошибка при создании статьи');
          },
          onSettled: () => {
            refetch();
          }
        }
      );
    }
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setOpen(true);
    form.setFieldsValue({
      title: article.title
    });
    setContent(article.content);
  };

  const handleDeleteArticle = (id) => {
    remove(id, {
      onSuccess: (data) => {
        if (data?.message) {
          customNotification('success', 'top', 'Успешно', data.message);
        }
      },
      onError: (error) => {
        console.error('Ошибка при удалении статьи:', error);
        customNotification('error', 'top', 'Ошибка', 'Ошибка при удалении статьи');
      },
      onSettled: () => {
        refetch();
      }
    });
  };

  const handleCloseModal = () => {
    setOpen(false);
    setContent('');
    form.resetFields();
    setEditingArticle(null); // Сброс редактируемой статьи при закрытии модального окна
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold mb-5'>Статьи</h2>
        <Btn onClick={() => setOpen(true)}>Добавить статью</Btn>
      </div>

      <div className='mt-10'>
        {isLoading ? (
          <Loading />
        ) : articles.length ? (
          <div className='grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-3'>
            {articles.map(({id, title, content, date}) => (
              <div key={id} className='box'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-xl mb-2'>{title}</h2>
                  <div className='flex gap-2 items-center'>
                    <EditOutlined
                      className='cursor-pointer text-primary-500 hover:opacity-70 transition-opacity'
                      onClick={() => handleEditArticle({id, title, content})}
                    />
                    <DeleteOutlined
                      className='cursor-pointer text-primary-500 hover:opacity-70 transition-opacity'
                      onClick={() => handleDeleteArticle(id)}
                    />
                  </div>
                </div>
                <span>{dayjs(date).format('DD/MM/YYYY')}</span>
                <p className='mt-5 overflow-hidden truncate text-gray-400'>{parse(content)}</p>
              </div>
            ))}
          </div>
        ) : (
          <Empty description='Список пуст' />
        )}
      </div>

      <Modal open={open} onCancel={handleCloseModal} footer={null}>
        <Form form={form} layout='vertical' onFinish={handleSubmit}>
          <Form.Item
            label='Название статьи'
            name='title'
            rules={[{required: true, message: 'Введите название статьи'}]}
          >
            <Input />
          </Form.Item>
          <CustomEditor getValue={(value) => setContent(value)} propsValue={content} />

          <Btn className='mt-5' htmlTypeButton='submit'>
            {editingArticle ? 'Сохранить изменения' : 'Сохранить'}
          </Btn>
        </Form>
      </Modal>
    </div>
  );
};
