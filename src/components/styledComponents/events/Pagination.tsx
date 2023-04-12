import React, { useState } from 'react';
import styled from 'styled-components';

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 0.8rem;
`;

const PageButton = styled.button<{ isActive: boolean }>`
  font-family: 'Roboto';
  background-color: ${({ isActive }) => (isActive ? '#A3D168' : '#d4d4d4')};
  color: ${({ isActive }) => (isActive ? '#FBFBFB' : '#7a7a7a')};
  border: none;
  border-radius: 5px;
  font-weight: 500;
  padding: 0.3rem 0.6rem;
  transition: 0.2s;
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  &:hover,
  &:focus {
    background-color: ${({ isActive }) => (isActive ? '#A3D168' : '#e6e6e6')};
    color: ${({ isActive }) => (isActive ? '#FBFBFB' : '#616161')};
  }
`;

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
