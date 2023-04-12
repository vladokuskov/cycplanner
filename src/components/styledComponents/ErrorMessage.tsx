import styled from 'styled-components';
import { Button } from './Button';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage } from '../types/styledComponents/errorMesssage.types';
import { useRouter } from 'next/router';

const ErrorMessageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h2`
  font-family: 'Lato';
  color: #525252;
  font-size: 1.2rem;
`;

const Description = styled.p`
  font-family: 'Roboto';
  color: #929292;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = ({ variant }: ErrorMessage) => {
  const router = useRouter();

  const refreshPage = () => {
    window.location.reload();
  };

  const redirectToCreate = () => {
    router.push('/create');
  };
  return (
    <ErrorMessageWrapper>
      <Title>
        {variant === 'loading'
          ? 'Unable to load data'
          : variant === 'no-events' && 'There`s no events :c'}
      </Title>
      <Description>
        {variant === 'loading'
          ? 'Please try again later'
          : variant === 'no-events' && 'You can create your own event'}
      </Description>
      {variant === 'loading' ? (
        <Button
          text="Refresh page"
          variant="default"
          bold
          icon={faRefresh}
          onClick={refreshPage}
        />
      ) : (
        variant === 'no-events' && (
          <Button
            text="Create event"
            variant="filled"
            onClick={redirectToCreate}
          />
        )
      )}
    </ErrorMessageWrapper>
  );
};

export { ErrorMessage };
