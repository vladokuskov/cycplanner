import { IEventType } from '@/components/types/shared/eventType';
import { EventTypeWrapper, StyledTypeButton } from './EventType.styles';

const EventType = ({ handleTypeChange }: IEventType) => {
  const eventTypes = ['Ride', 'Gravel Ride', 'Race', 'Dirt', 'Chill ride'];
  return (
    <EventTypeWrapper>
      {eventTypes.map((type) => (
        <StyledTypeButton
          onClick={() => handleTypeChange(type)}
          type="button"
          key={type}
        >
          {type}
        </StyledTypeButton>
      ))}
    </EventTypeWrapper>
  );
};

export { EventType };
