import { IEvent } from '@/components/types/shared/event.types';

const sortEvents = (
  events: IEvent[],
  sorting: 'newest' | 'oldest'
): IEvent[] => {
  if (sorting === 'newest') {
    return events.sort((a: IEvent, b: IEvent) => {
      if (a.metadata.createdAt && b.metadata.createdAt) {
        return (
          new Date(b.metadata.createdAt).getTime() -
          new Date(a.metadata.createdAt).getTime()
        );
      }
      return 0;
    });
  } else if (sorting === 'oldest') {
    return events.sort((a: IEvent, b: IEvent) => {
      if (a.metadata.createdAt && b.metadata.createdAt) {
        return (
          new Date(a.metadata.createdAt).getTime() -
          new Date(b.metadata.createdAt).getTime()
        );
      }
      return 0;
    });
  } else {
    return events;
  }
};

export { sortEvents };
