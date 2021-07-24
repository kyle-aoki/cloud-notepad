import React, { FC } from 'react';

interface SpinnerProps {
  width?: number;
  height?: number;
  thickness?: number;
}

export const Spinner: FC<SpinnerProps> = ({ width, height, thickness }) => {
  return (
    <div
      className="spinner-border"
      style={{ width: `${width}px`, height: `${height}px`, borderWidth: `${thickness}px` }}
    />
  );
};
