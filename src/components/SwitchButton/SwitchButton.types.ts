import { Difficulty } from '../types/shared/event.types';

export type SwitchButton = {
  labels?: string[];
  onClick: (e: string) => void;
  className?: string;
  active?: boolean;
};
