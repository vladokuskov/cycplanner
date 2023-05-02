import { RefObject, useEffect, useState } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  initialState: boolean
) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return [isOpen, setIsOpen] as const;
};
