export type PayloadProps = {
  timestamp: string;
  TMP: number;
  SKY: number;
  POP: number;
  WSD: number;
  PTY: number;
};

export type CustomizedDotProps = {
  cx: number;
  cy: number;
  dataKey: string;
  fill: string;
  height: number;
  index: number;
  name: string;
  payload: PayloadProps;
  r: number;
  stroke: string;
  strokeWidth: number;
  value: number;
  width: number;
};

export type weatherDataProps = {
  timestamp: string;
  TMP: number;
  SKY: number;
  POP: number;
  PTY: number;
};