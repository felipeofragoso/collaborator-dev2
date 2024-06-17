import React from 'react';
import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';

export interface ListBreadcrumb {
  name: string;
  navigateTo?: string; 
}

interface BreadcrumbProps {
  listBreadcrumb: ListBreadcrumb[];
}

const CustomBreadcrumb: React.FC<BreadcrumbProps> = ({ listBreadcrumb }) => {
  const navigate = useNavigate(); 

  const handleGoToClick = (navigateTo: string) => {
    navigate(navigateTo);
  };

  return (
    <Breadcrumb>
      {listBreadcrumb.map((breadcrumb, index) => (
        <Breadcrumb.Item key={`breadcrumb-${index}`}>
          {breadcrumb.navigateTo ? (
            <a onClick={() => handleGoToClick(breadcrumb.navigateTo || '')}>{breadcrumb.name}</a>
          ) : (
            breadcrumb.name
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
