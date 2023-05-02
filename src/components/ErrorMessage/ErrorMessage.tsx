import Image from 'next/image';
import { useRouter } from 'next/router';

import { faRefresh } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../Button/Button';
import { ErrorMessage } from '../types/shared/errorMesssage.types';
import {
  StyledDescription,
  StyledErrorMessageWrapper,
  StyledTitle,
} from './ErrorMessage.styles';

const ErrorMessage = ({ variant }: ErrorMessage) => {
  const router = useRouter();

  const refreshPage = () => {
    window.location.reload();
  };

  const redirectToCreate = () => {
    router.push('/create');
  };
  return (
    <StyledErrorMessageWrapper>
      <Image
        src={`/assets/error/${
          variant === 'loading' ? 'loading.svg' : 'empty.svg'
        }`}
        alt=""
        width={100}
        height={50}
      />
      <StyledTitle>
        {variant === 'loading'
          ? 'Unable to load data'
          : variant === 'no-events' && 'There`s no events :c'}
      </StyledTitle>
      <StyledDescription>
        {variant === 'loading'
          ? 'Please try again later'
          : variant === 'no-events' && 'You can create your own event'}
      </StyledDescription>
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
    </StyledErrorMessageWrapper>
  );
};

export { ErrorMessage };
