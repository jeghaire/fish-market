import React, { ReactNode } from 'react';

interface WrapperProps {
  children?: ReactNode | ReactNode[];
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className = null }) => {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-3 md:px-10 ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;
