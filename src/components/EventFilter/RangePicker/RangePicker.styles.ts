import styled from 'styled-components';

const RangeSelectorWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  position: relative;
  gap: 0.3rem;
`;

const SelectorLabel = styled.label`
  font-family: 'Lato', sans-serif;
  color: rgba(46, 46, 46, 0.53);
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 12px;
  margin-left: 0.5rem;
`;

const RangeOptionsWrapper = styled.ul`
  z-index: 2;
  position: absolute;
  top: 3.6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  box-shadow: 0px 5px 15px -1px rgba(0, 0, 0, 0.09);
`;

const RangeOption = styled.li`
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid rgb(138, 138, 138);
  background-color: #e5e5e5;
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border-bottom: none;
    border-radius: 0 0 8px 8px;
  }
`;

export {
  RangeSelectorWrapper,
  RangeOptionsWrapper,
  RangeOption,
  SelectorLabel,
};
