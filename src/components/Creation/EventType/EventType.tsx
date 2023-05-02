import { IEventType } from '@/components/types/shared/eventType';

import {
  StyledEventTypeWrapper,
  StyledTypeButton,
} from './EventType.styles';

const EventType = ({ handleTypeChange }: IEventType) => {
  const eventTypes = [
    'Ride',
    'Gravel Ride',
    'Race',
    'High tempo',
    'Chill ride',
  ];
  return (
    <StyledEventTypeWrapper>
      {eventTypes.map((type) => (
        <StyledTypeButton
          onClick={() => handleTypeChange(type)}
          type="button"
          key={type}
        >
          {type}
        </StyledTypeButton>
      ))}
    </StyledEventTypeWrapper>
  );
};

export { EventType };
