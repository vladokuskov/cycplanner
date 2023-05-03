import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  faCircleExclamation,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';

import { Button } from '../Button/Button';
import { ErrorMessage } from '../types/shared/errorMesssage.types';
import {
  StyledDescription,
  StyledErrorMessageWrapper,
  StyledTitle,
  StyledBasicErrorWrapper,
} from './ErrorMessage.styles';
import { Icon } from '../Icon/Icon';

const ErrorMessage = ({ variant, errorText }: ErrorMessage) => {
  const router = useRouter();

  const refreshPage = () => {
    window.location.reload();
  };

  const redirectToCreate = () => {
    router.push('/create');
  };
  return variant === 'loading' || variant === 'no-events' ? (
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
  ) : (
    <StyledBasicErrorWrapper>
      <Icon icon={faCircleExclamation} />
      <p>{errorText}</p>
    </StyledBasicErrorWrapper>
  );
};

export { ErrorMessage };
