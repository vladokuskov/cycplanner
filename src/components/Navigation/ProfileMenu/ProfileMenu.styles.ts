import styled from 'styled-components';

const StyledProfileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  top: 2.8rem;
  right: 0.5rem;
  position: absolute;
  width: 15rem;
  height: 20rem;
  background-color: #ffffff !important;
  z-index: 5;
  border-radius: 10px;
  border: 2px solid #cacaca;
  padding: 0;
  margin: 0;
  -webkit-box-shadow: 0px 9px 21px -17px rgba(0, 0, 0, 0.233);
  -moz-box-shadow: 0px 9px 21px -17px rgba(0, 0, 0, 0.233);
  box-shadow: 0px 9px 21px -17px rgba(0, 0, 0, 0.233);
`;

const StyledProfileMenuHeader = styled.div`
  width: 100%;
  background-color: #fafafa7f;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #d6d6d6;
`;
const StyledProfileMenuFooter = styled.div`
  background-color: #fafafa7f;
  border-radius: 0 0 10px 10px;
  border-top: 1px solid #d6d6d6;
  width: 100%;
  padding: 1rem 2rem;
  height: 100%;
  max-height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAuthorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5rem 1rem;
`;

const StyledAuthorTitle = styled.p`
  font-weight: 600;
  color: #303030;
  font-family: 'Inter';
  padding: 0;
  margin: 0;
`;

const StyledProfileMenuListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  list-style: none;
  width: 100%;
  height: 100%;
  padding: 1rem 1rem;
  gap: 0.4rem;
`;

const StyledProfileMenuListItem = styled.li`
  width: 100%;
`;

export {
  StyledAuthorTitle,
  StyledAuthorWrapper,
  StyledProfileMenuFooter,
  StyledProfileMenuHeader,
  StyledProfileMenuListItem,
  StyledProfileMenuListWrapper,
  StyledProfileMenuWrapper,
};
