'use client';
import {EditOutlined} from '@ant-design/icons';
export const EditButton = ({...props}) => {
  return <EditOutlined className='cursor-pointer text-primary-500 hover:opacity-70 transition-opacity' {...props} />;
};
