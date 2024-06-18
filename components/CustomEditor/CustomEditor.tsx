import React, {useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import s from './CustomEditor.module.scss';

type CustomEditorProps = {
  propsValue?: string | null;
  getValue: (value: string) => void;
};

export const CustomEditor = ({propsValue, getValue}: CustomEditorProps) => {
  const [value, setValue] = useState<string | undefined>(propsValue); // Используем тип string | undefined для правильного обновления

  useEffect(() => {
    setValue(propsValue); // Обновляем значение value при изменении propsValue
  }, [propsValue]);

  const handleChange = (content: string) => {
    setValue(content);
    getValue(content); // Вызываем функцию getValue для передачи значения наверх
  };

  return <ReactQuill theme='snow' className={s.editor} value={value || ''} onChange={handleChange} />;
};
