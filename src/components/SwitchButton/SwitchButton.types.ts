import { Difficulty } from '../types/shared/event.types';

type ClickEvent = string | Difficulty;

export type SwitchButton = {
  labels?: string[];
  onClick: (e: ClickEvent) => void;
  className?: string;
  active?: boolean;
};
