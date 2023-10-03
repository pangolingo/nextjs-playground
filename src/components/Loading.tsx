import { CSSProperties } from "react";
import styles from "./Loading.module.css";

interface Props {
  style: CSSProperties;
}

export default function Loading({ style }: Props) {
  return (
    <div className="flex">
      <span className={styles.loader} style={style} />
    </div>
  );
}
