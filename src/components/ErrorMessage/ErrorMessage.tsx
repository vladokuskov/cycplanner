import { ErrorMessageWrapper, Title, Description } from './ErrorMessage.styles';
import { Button } from '../Button/Button';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage } from '../types/shared/errorMesssage.types';
import { useRouter } from 'next/router';

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
