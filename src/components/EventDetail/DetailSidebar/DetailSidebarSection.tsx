import {
  useEffect,
  useState,
} from 'react';

import { DocumentData } from 'firebase/firestore';

import { SkeletonLoader } from '@/components/skeleton/Skeleton';
import { useAuth } from '@/context/AuthContext';
import {
  approveUserParticipating,
  getUsers,
  removeUserFromParticipating,
} from '@/firebase/events';
import {
  faCheckCircle,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';

import { Button } from '../../Button/Button';
import { ProfilePreview } from '../../ProfilePreview/ProfilePreview';
import { IEvent } from '../../types/shared/event.types';
import { Loading } from '../../types/shared/loadingState.types';
import {
  DetailSidebarSectionWrapper,
  ParticipantsList,
  SectionTiitle,
  SwitchButton,
  SwitcherWrapper,
  UserControlButtonsWrapper,
  UserControlWrapper,
} from './DetailSidebarSection.styles';

const DetailSidebarSection = ({ event }: { event: IEvent | null }) => {
  const [eventUsers, setEventUsers] = useState({
    submitted: [] as string[],
    awaiting: [] as string[],
  });

  const [loadingState, setLoadingState] = useState<Loading>(Loading.loading);
  const [selectedFilter, setSelectedFilter] = useState<string>('submitted');
  const [submittedUsers, setSubmittedUsers] = useState<DocumentData[] | null>(
    null
  );
  const [awaitingUsers, setAwaitingUsers] = useState<DocumentData[] | null>(
    null
  );

  const { user } = useAuth();

  useEffect(() => {
    if (event && event.participating) {
      setEventUsers({
        submitted: event.participating?.submittedUsers,
        awaiting: event.participating?.awaitingUsers,
      });
    }
  }, []);

  const fetchData = async (
    submittedUsersArray: string[],
    awaitingUsersArray: string[]
  ) => {
    try {
      const { submitted, awaiting } = await getUsers(
        submittedUsersArray,
        awaitingUsersArray
      );

      setSubmittedUsers(submitted);
      setAwaitingUsers(awaiting);

      setLoadingState(Loading.success);
    } catch (err) {
      setLoadingState(Loading.error);
    }
  };

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

        setEventUsers((prevState) => ({
          ...prevState,
          submitted: prevState.submitted.filter(
            (userId) => userId !== participantId
          ),
          awaiting: prevState.awaiting.filter(
            (userId) => userId !== participantId
          ),
        }));

        fetchData(
          eventUsers.submitted.filter((userId) => userId !== participantId),
          eventUsers.awaiting.filter((userId) => userId !== participantId)
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

        setEventUsers((prevState) => ({
          ...prevState,
          submitted: [...prevState.submitted, participantId],
          awaiting: prevState.awaiting.filter(
            (userId) => userId !== participantId
          ),
        }));

        fetchData(
          eventUsers.submitted.concat(participantId),
          eventUsers.awaiting.filter((userId) => userId !== participantId)
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
      event.participating.submittedUsers &&
      event.participating.awaitingUsers
    ) {
      fetchData(
        event.participating.submittedUsers,
        event.participating.awaitingUsers
      );
    }
  }, []);

  return (
    <DetailSidebarSectionWrapper>
      <SectionTiitle>Participants</SectionTiitle>
      {user?.uid === event?.metadata.author.uid && (
        <SwitcherWrapper>
          <SwitchButton
            onClick={() => handleFilterChange('submitted')}
            disabled={selectedFilter === 'submitted'}
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
          <SkeletonLoader variant="users" />
        ) : loadingState === Loading.success ? (
          <>
            {selectedFilter === 'submitted'
              ? submittedUsers?.map((participant: any, i) => {
                  return (
                    <UserControlWrapper key={i}>
                      <ProfilePreview
                        variant="no-link"
                        name={participant.name}
                        photoURL={participant.photoUrl}
                        description={
                          event?.metadata.author.uid === participant.uid
                            ? 'Event organizator'
                            : ''
                        }
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
                        photoURL={participant.photoUrl}
                        description={
                          event?.metadata.author.uid === participant.uid
                            ? 'Event organizator'
                            : ''
                        }
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
