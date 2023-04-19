export type IRangeSlider = {
  value: number;
  startValue: number;
  endValue: number;
  label?: string;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
