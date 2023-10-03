import { CSSProperties, StyleHTMLAttributes } from "react";

interface Props {
  style: CSSProperties;
}
export default function IconPokeball({ style }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 125"
      xmlSpace="preserve"
      style={style}
    >
      <g>
        <path d="M40.3,47.6c1.1-4.4,5-7.6,9.7-7.6c4.7,0,8.6,3.2,9.7,7.6C78.2,47.9,94.5,49,95,51.1c0-0.4,0-0.7,0-1.1C95,25.1,74.9,5,50,5   S5,25.1,5,50c0,0.4,0,0.7,0,1.1C5.5,49.1,21.8,47.9,40.3,47.6z" />
        <path d="M37.1,57.6C39.7,62.1,44.6,65,50,65c5.4,0,10.2-2.9,12.9-7.4c13.9,0.3,21.9,1,26,1.6C84.7,77.1,68.7,90,50,90   c-18.7,0-34.7-12.9-38.9-30.7C15.2,58.6,23.2,57.9,37.1,57.6 M40.3,52.6c-17.2,0.3-32.5,1.3-35,3.1C8.2,77.8,27.1,95,50,95   c22.9,0,41.8-17.1,44.6-39.3c-2.5-1.8-17.7-2.8-35-3.1c-1.1,4.3-5,7.4-9.7,7.4C45.4,60,41.5,56.8,40.3,52.6L40.3,52.6z" />
      </g>
    </svg>
  );
}
