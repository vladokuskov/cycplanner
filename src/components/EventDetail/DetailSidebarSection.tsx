import { useAuth } from '@/context/AuthContext';
import {
  approveUserParticipating,
  getUsers,
  removeUserFromParticipating,
} from '@/firebase/events';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProfilePreview } from '../ProfilePreview/ProfilePreview';
import { IEvent } from '../types/shared/event.types';
import { Loading } from '../types/shared/loadingState.types';
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Button } from '../Button/Button';

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
    width: 80%;
    padding: 1rem;
    border: none;
    margin: 0 auto;
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
  background-color: #d9d9d9;
  border-radius: 8px;
  padding: 0.2rem;

  max-width: 70%;
  margin: 0 auto;
  margin-top: 0.5rem;
`;

const SwitchButton = styled.button`
  font-family: 'Roboto';
  font-size: 0.9rem;
  font-weight: 500;
  width: 50%;
  padding: 0.3rem 0.3rem;
  border-radius: 8px;
  background-color: #e7e7e7;
  transition: 0.2s;
  color: #2c2c2c;
  &:hover,
  &:focus {
    background-color: #f1f1f1;
  }
  :disabled {
    background-color: #d9d9d9;
    color: #9b9b9b;
  }
`;

const ParticipantsList = styled.div`
  padding-top: 1rem;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0.9rem;
`;

const UserControlWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.2rem;
`;

const UserControlButtonsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const DetailSidebarSection = ({ event }: { event: IEvent | null }) => {
  const [loadingState, setLoadingState] = useState<Loading>(Loading.loading);
  const [selectedFilter, setSelectedFilter] = useState<string>('submited');
  const [submitedUsers, setSubmitedUsers] = useState<DocumentData[] | null>(
    null
  );
  const [awaitingUsers, setAwaitingUsers] = useState<DocumentData[] | null>(
    null
  );
  const { user } = useAuth();

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleParticipantRemove = async (participantId: string) => {
    try {
      const result = window.confirm(
        'Are you sure you want to Remove participant?'
      );
      if (result && event && event?.id) {
        await removeUserFromParticipating(event?.id, participantId);
      }
    } catch (err) {
      setLoadingState(Loading.error);
      console.log(err);
    }
  };

  const handleParticipantAprrove = async (participantId: string) => {
    if (event && event?.id) {
      await approveUserParticipating(event?.id, participantId);
      setLoadingState(Loading.loading);
    }
  };

  useEffect(() => {
    if (
      event &&
      event.participating &&
      event.participating.submitedUsers &&
      event.participating.awaitingUsers
    ) {
      const fetchData = async () => {
        try {
          if (event.participating) {
            const { submited, awaiting } = await getUsers(
              event.participating.submitedUsers,
              event.participating.awaitingUsers
            );
            setSubmitedUsers(submited);
            setAwaitingUsers(awaiting);
          }

          setLoadingState(Loading.success);
        } catch (err) {
          setLoadingState(Loading.error);
        }
      };
      fetchData();
    }
  }, [event, loadingState]);

  return (
    <DetailSidebarSectionWrapper>
      <SectionTiitle>Participants</SectionTiitle>
      {user?.uid === event?.metadata.author.uid && (
        <SwitcherWrapper>
          <SwitchButton
            onClick={() => handleFilterChange('submited')}
            disabled={selectedFilter === 'submited'}
            title="Participants"
          >
            Participants
          </SwitchButton>
          <SwitchButton
            onClick={() => handleFilterChange('awaiting')}
            disabled={selectedFilter === 'awaiting'}
            title="Awaiting participants"
          >
            Awaiting
          </SwitchButton>
        </SwitcherWrapper>
      )}
      <ParticipantsList>
        {loadingState === Loading.loading ? (
          <p>Loading</p>
        ) : loadingState === Loading.success ? (
          <>
            {selectedFilter === 'submited'
              ? submitedUsers?.map((participant: any, i) => {
                  return (
                    <UserControlWrapper key={i}>
                      <ProfilePreview
                        variant="no-link"
                        name={participant.name}
                        photoURL={participant.photoURL}
                      />
                      {user?.uid === event?.metadata.author.uid &&
                        user?.uid !== participant.uid && (
                          <UserControlButtonsWrapper>
                            <Button
                              variant="icon"
                              status="error"
                              text="Remove user"
                              icon={faTrashAlt}
                              size="md3"
                              bold
                              onClick={() =>
                                handleParticipantRemove(participant.uid)
                              }
                            />
                          </UserControlButtonsWrapper>
                        )}
                    </UserControlWrapper>
                  );
                })
              : awaitingUsers?.map((participant: any, i) => {
                  return (
                    <UserControlWrapper key={i}>
                      <ProfilePreview
                        variant="no-link"
                        name={participant.name}
                        photoURL={participant.photoURL}
                      />
                      {user?.uid === event?.metadata.author.uid &&
                        user?.uid !== participant.uid && (
                          <UserControlButtonsWrapper>
                            <Button
                              variant="icon"
                              status="success"
                              text="Approve user"
                              icon={faCheckCircle}
                              size="md3"
                              bold
                              onClick={() =>
                                handleParticipantAprrove(participant.uid)
                              }
                            />
                            <Button
                              variant="icon"
                              status="error"
                              text="Remove user"
                              icon={faTrashAlt}
                              size="md3"
                              bold
                              onClick={() =>
                                handleParticipantRemove(participant.uid)
                              }
                            />
                          </UserControlButtonsWrapper>
                        )}
                    </UserControlWrapper>
                  );
                })}
          </>
        ) : (
          <p>Error</p>
        )}
      </ParticipantsList>
    </DetailSidebarSectionWrapper>
  );
};

export { DetailSidebarSection };
