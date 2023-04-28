import { useAuth } from '@/context/AuthContext';
import {
  approveUserParticipating,
  getUsers,
  removeUserFromParticipating,
} from '@/firebase/events';
import {
  UserControlButtonsWrapper,
  UserControlWrapper,
  ParticipantsList,
  SwitchButton,
  SwitcherWrapper,
  SectionTiitle,
  DetailSidebarSectionWrapper,
} from './DetailSidebarSection.styles';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ProfilePreview } from '../../ProfilePreview/ProfilePreview';
import { IEvent } from '../../types/shared/event.types';
import { Loading } from '../../types/shared/loadingState.types';
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Button } from '../../Button/Button';

const DetailSidebarSection = ({ event }: { event: IEvent | null }) => {
  const [eventParticipatingUsers, setEventParticipatingUsers] = useState({
    submitedUsers: [] as string[],
    awaitingUsers: [] as string[],
  });

  const [loadingState, setLoadingState] = useState<Loading>(Loading.loading);
  const [selectedFilter, setSelectedFilter] = useState<string>('submited');
  const [submitedUsers, setSubmitedUsers] = useState<DocumentData[] | null>(
    null
  );
  const [awaitingUsers, setAwaitingUsers] = useState<DocumentData[] | null>(
    null
  );
  const { user } = useAuth();

  useEffect(() => {
    if (event && event.participating) {
      setEventParticipatingUsers({
        submitedUsers: event.participating?.submitedUsers,
        awaitingUsers: event.participating?.awaitingUsers,
      });
    }
  }, []);

  const fetchData = async (
    submitedUsersArray: string[],
    awaitingUsersArray: string[]
  ) => {
    try {
      const { submited, awaiting } = await getUsers(
        submitedUsersArray,
        awaitingUsersArray
      );

      setSubmitedUsers(submited);
      setAwaitingUsers(awaiting);

      setLoadingState(Loading.success);
    } catch (err) {
      setLoadingState(Loading.error);
    }
  };

  console.log(eventParticipatingUsers.awaitingUsers);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleParticipantRemove = async (participantId: string) => {
    try {
      const result = window.confirm(
        'Are you sure you want to Remove participant?'
      );
      if (result && event && event?.id && event.participating) {
        await removeUserFromParticipating(event?.id, participantId);

        setEventParticipatingUsers((prevState) => ({
          ...prevState,
          submitedUsers: prevState.submitedUsers.filter(
            (userId) => userId !== participantId
          ),
          awaitingUsers: prevState.awaitingUsers.filter(
            (userId) => userId !== participantId
          ),
        }));

        fetchData(
          eventParticipatingUsers.submitedUsers.filter(
            (userId) => userId !== participantId
          ),
          eventParticipatingUsers.awaitingUsers.filter(
            (userId) => userId !== participantId
          )
        );
      }
    } catch (err) {
      setLoadingState(Loading.error);
      console.log(err);
    }
  };

  const handleParticipantAprrove = async (participantId: string) => {
    if (event && event?.id && event.participating) {
      try {
        await approveUserParticipating(event?.id, participantId);

        setEventParticipatingUsers((prevState) => ({
          ...prevState,
          submitedUsers: [...prevState.submitedUsers, participantId],
          awaitingUsers: prevState.awaitingUsers.filter(
            (userId) => userId !== participantId
          ),
        }));

        fetchData(
          eventParticipatingUsers.submitedUsers.concat(participantId),
          eventParticipatingUsers.awaitingUsers.filter(
            (userId) => userId !== participantId
          )
        );
      } catch (err) {
        setLoadingState(Loading.error);
      }
    }
  };

  useEffect(() => {
    if (
      event &&
      event.participating &&
      event.participating.submitedUsers &&
      event.participating.awaitingUsers
    ) {
      fetchData(
        event.participating.submitedUsers,
        event.participating.awaitingUsers
      );
    }
  }, [event]);

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
