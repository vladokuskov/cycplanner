import { useEffect, useState } from 'react';

import { DocumentData } from 'firebase/firestore';

import { SkeletonLoader } from '@/components/skeleton/Skeleton';
import { useAuth } from '@/context/AuthContext';
import {
  approveUserParticipating,
  getUsers,
  removeUserFromParticipating,
} from '@/firebase/events';
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { Button } from '../../Button/Button';
import { ProfilePreview } from '../../ProfilePreview/ProfilePreview';
import { IEvent } from '../../types/shared/event.types';
import { Loading } from '../../types/shared/loadingState.types';
import {
  StyledDetailSidebarSectionWrapper,
  StyledParticipantsList,
  StyledSectionTitle,
  StyledUserControlButtonsWrapper,
  StyledUserControlWrapper,
} from './DetailSidebarSection.styles';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { SwitchButton } from '@/components/SwitchButton/SwitchButton';

const DetailSidebarSection = ({ event }: { event: IEvent | null }) => {
  const { user } = useAuth();

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

  const [errorStatus, setErrorStatus] = useState({
    isError: false,
    errorText: '',
  });

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

      setErrorStatus({
        isError: true,
        errorText: 'An error occurred while loading Participants.',
      });
    }
  };

  const handleFilterChange = (filter: string) => {
    if (filter === 'Submitted') {
      setSelectedFilter('submitted');
    } else if (filter === 'Awaiting') {
      setSelectedFilter('awaiting');
    }
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

  const handleParticipantApprove = async (participantId: string) => {
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
    <StyledDetailSidebarSectionWrapper>
      <StyledSectionTitle>Participants</StyledSectionTitle>
      {user?.uid === event?.metadata.author.uid && (
        <SwitchButton
          onClick={handleFilterChange}
          labels={['Submitted', 'Awaiting']}
          indexActive={selectedFilter === 'submitted' ? 0 : 1}
        />
      )}
      <StyledParticipantsList>
        {loadingState === Loading.loading ? (
          <SkeletonLoader variant="users" />
        ) : loadingState === Loading.success ? (
          <>
            {selectedFilter === 'submitted' && submittedUsers
              ? (() => {
                  const sortedParticipants = submittedUsers
                    .filter(
                      (participant: any) =>
                        participant.uid !== event?.metadata.author.uid
                    )
                    .sort((a: any, b: any) => a.name.localeCompare(b.name));
                  const participantsWithAuthorOnTop = [
                    submittedUsers.find(
                      (participant: any) =>
                        participant.uid === event?.metadata.author.uid
                    ),
                    ...sortedParticipants,
                  ];
                  return participantsWithAuthorOnTop.map(
                    (participant: any, i) => {
                      return (
                        <StyledUserControlWrapper key={i}>
                          <ProfilePreview
                            variant="no-link"
                            name={participant.name}
                            photoURL={participant.photoUrl}
                            description={
                              event?.metadata.author.uid === participant.uid
                                ? 'Event organizer'
                                : ''
                            }
                          />
                          {user?.uid === event?.metadata.author.uid &&
                            user?.uid !== participant.uid && (
                              <StyledUserControlButtonsWrapper>
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
                              </StyledUserControlButtonsWrapper>
                            )}
                        </StyledUserControlWrapper>
                      );
                    }
                  );
                })()
              : awaitingUsers &&
                awaitingUsers
                  .sort((a: any, b: any) => a.name.localeCompare(b.name))
                  .map((participant: any, i) => {
                    return (
                      <StyledUserControlWrapper key={i}>
                        <ProfilePreview
                          variant="no-link"
                          name={participant.name}
                          photoURL={participant.photoUrl}
                          description={
                            event?.metadata.author.uid === participant.uid
                              ? 'Event organizer'
                              : ''
                          }
                        />
                        {user?.uid === event?.metadata.author.uid &&
                          user?.uid !== participant.uid && (
                            <StyledUserControlButtonsWrapper>
                              <Button
                                variant="icon"
                                status="success"
                                text="Approve user"
                                icon={faCheckCircle}
                                size="md3"
                                bold
                                onClick={() =>
                                  handleParticipantApprove(participant.uid)
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
                            </StyledUserControlButtonsWrapper>
                          )}
                      </StyledUserControlWrapper>
                    );
                  })}
          </>
        ) : (
          <ErrorMessage variant="basic" errorText={errorStatus.errorText} />
        )}
      </StyledParticipantsList>
    </StyledDetailSidebarSectionWrapper>
  );
};

export { DetailSidebarSection };
