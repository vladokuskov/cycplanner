import { useState } from 'react';
import styled from 'styled-components';
import { ProfilePreview } from '../ProfilePreview/ProfilePreview';
import { IEvent } from '../types/shared/event.types';

const DetailSidebarSectionWrapper = styled.section`
  width: 100%;
  height: 100%;
  border-top: 1px solid #dfdfdf;
  padding-top: 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  @media (min-width: 680px) {
    display: grid;
    padding: 1rem;
    border: none;
  }
`;

const SectionTiitle = styled.h2`
  font-family: 'Lato';
  letter-spacing: 0.01em;
  font-weight: 600;
  color: #777777;
`;

const SwitcherWrapper = styled.div`
  width: 100%;
  background-color: #777777;
`;

const ParticipantsList = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailSidebarSection = ({ event }: { event: IEvent | null }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('submited');

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <DetailSidebarSectionWrapper>
      <SectionTiitle>Participants</SectionTiitle>
      <SwitcherWrapper></SwitcherWrapper>
      <ParticipantsList></ParticipantsList>
    </DetailSidebarSectionWrapper>
  );
};

export { DetailSidebarSection };
