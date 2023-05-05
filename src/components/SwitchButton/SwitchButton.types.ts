import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type SwitchButton = {
  labels?: string[];
  onClick: (e: string) => void;
  className?: string;
  active?: boolean;
  indexActive?: number;
  icon?: IconDefinition[];
};
