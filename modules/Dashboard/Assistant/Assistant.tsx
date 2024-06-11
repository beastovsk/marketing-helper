'use client';

import {useState} from 'react';
import {Input, Button} from 'antd';
import Btn from '@/components/UI/Btn/Btn';

const Assistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleMessageSubmit = () => {
    if (inputValue.trim() === '') return;
    setMessages([...messages, {text: inputValue, sender: 'user'}]);
    setInputValue('');
    // Здесь можно добавить логику для ответа ассистента
  };

  return (
    <div className='p-4 border border-gray-200 rounded-lg'>
      <div className='mb-4 p-5 h-80 overflow-auto bg-white rounded-lg'>
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
            <div
              className={`max-w-xs break-all rounded-lg ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
              } p-2 shadow-md `}
            >
              {message.text}
            </div>
          </div>
        ))}
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
        <Btn onClick={handleMessageSubmit}>Отправить</Btn>
      </div>
      <div className='text-gray-400 mt-3 text-sm'>лимит ввода 200 символов *</div>
    </div>
  );
};

export default Assistant;
