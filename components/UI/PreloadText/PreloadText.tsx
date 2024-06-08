import React, {ElementType, ReactNode} from 'react';
import {Skeleton} from 'antd';

interface PreloadTextProps {
  className?: string;
  elementType?: ElementType;
  children?: ReactNode;
}

export const PreloadText: React.FC<PreloadTextProps> = ({className = '', elementType: Component = 'div', children}) => {
  return (
    <Component className={className}>
      {children === undefined || children === null ? <Skeleton.Button active /> : children}
    </Component>
  );
};
