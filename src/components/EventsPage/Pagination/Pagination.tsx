import React, { useState } from 'react';
import { PaginationContainer, PageButton } from './Pagination.styles';
import { PaginationProps } from './Pagination.types';

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageClick = (page: number) => {
    setActivePage(page);
    onPageChange(page);
  };

  const getPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <PageButton
          disabled={activePage === i}
          key={i}
          isActive={activePage === i}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </PageButton>
      );
    }
    return buttons;
  };

  return <PaginationContainer>{getPageButtons()}</PaginationContainer>;
};

export { Pagination };
