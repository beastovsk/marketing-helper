'use client';

import {useEffect, useRef, useState} from 'react';
import {Input, Button} from 'antd';
import Btn from '@/components/UI/Btn/Btn';
import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';
import {useMutation} from 'react-query';
import {sendMessage} from '@/src/api';

const Assistant = () => {
  const {mutate, isLoading} = useMutation(sendMessage);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleMessageSubmit = () => {
    if (inputValue.trim() === '') return;
    const newMessage = {text: inputValue, sender: 'user'};
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    localStorage.setItem('messages', JSON.stringify([...messages, newMessage]));
    mutate(
      {question: inputValue},
      {
        onSuccess: (data) => {
          if (!data) {
            const errorMessage = {
              text: 'Не удалось загрузить ответ на ваш вопрос, попробуйте задать его еще раз',
              sender: 'bot'
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
            return localStorage.setItem('messages', JSON.stringify([...messages, errorMessage]));
          }

          const answerMessage = {text: data?.answer, sender: 'bot'};
          setMessages((prevMessages) => [...prevMessages, answerMessage]);
          localStorage.setItem('messages', JSON.stringify([...messages, answerMessage]));
        }
      }
    );

    setInputValue('');
    scrollToBottom();
    // Здесь можно добавить логику для ответа ассистента
  };

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length) {
      return scrollToBottom();
    }

    const welcomeMessage = {
      text: 'Привет! Рад приветствовать вас! Я ваш личный помощник в мире маркетинга, анализа и бизнеса. Готов помочь вам с любыми вопросами по вашей кампании, а также предоставить полезные сведения о вашем продукте. Не стесняйтесь обращаться ко мне!',
      sender: 'bot'
    };
    setMessages((prevMessages) => [...prevMessages, welcomeMessage]);
    localStorage.setItem('messages', JSON.stringify([...messages, welcomeMessage]));
  }, []);

  return (
    <SubscriptionBlocker requiredPlan='advanced'>
      <div className='p-4 border border-gray-200 rounded-lg'>
        <div className='mb-4 p-5 h-[70vh] overflow-auto bg-white rounded-lg'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
            >
              <div
                className={`max-w-xs break-[break-word] rounded-lg ${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-[#f6f6f6] text-gray-800'
                } p-2 shadow-md `}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div className='h-5' ref={messagesEndRef}>
            {isLoading ? 'Бот печатает...' : null}
          </div>
          {/* Этот div используется для прокрутки вниз */}
        </div>
        <div className='flex'>
          <Input
            size='large'
            className='flex-1 mr-2 border-2 border-white'
            placeholder='Введите сообщение...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleMessageSubmit}
            maxLength={200}
          />
          <Btn onClick={handleMessageSubmit} disabled={isLoading}>
            Отправить
          </Btn>
        </div>
        <div className='text-gray-400 mt-3 text-sm'>лимит ввода 200 символов *</div>
      </div>
    </SubscriptionBlocker>
  );
};

export default Assistant;
