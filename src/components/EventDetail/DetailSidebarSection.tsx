import styled from 'styled-components';
import { IEvent } from '../types/shared/event.types';

const DetailSidebarSectionWrapper = styled.section`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const DetailSidebarSection = ({ event }: { event: IEvent | null }) => {
  return (
    <DetailSidebarSectionWrapper>Sidebar Section</DetailSidebarSectionWrapper>
  );
};

export { DetailSidebarSection };
