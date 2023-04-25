export type RangeSlider = {
  value: number;
  startValue: number;
  endValue: number;
  label?: string;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
