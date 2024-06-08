import React, {ReactNode} from 'react';

interface StatusTextProps {
  success: boolean;
  className?: string;
  children: ReactNode;
}

export const StatusText: React.FC<StatusTextProps> = ({success, className = '', children}) => {
  const statusClass = success ? 'text-success-500' : 'text-danger-500';
  return <span className={`${statusClass} ${className}`}>{children}</span>;
};
