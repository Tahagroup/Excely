import { useCallback, useEffect, useRef } from "react";
import styles from "./SheetSelect.module.css";

export default function SheetSelect(props) {
  var isActive = useRef(0);
  const sheetSelectHandler = useCallback((sheet, index) => {
    isActive.current = index;
    props.setSelectedSheet(sheet);
  }, []);

  useEffect(() => {
    // If new file is loaded or file changes:
    sheetSelectHandler(props.sheetData[0], 0);
    isActive.current = 0;
  }, [props.sheetData, sheetSelectHandler]);

  return (
    <div className={styles.wrapper}>
      {props.sheetData.map((sheetName, index) => (
        <span
          key={index}
          className={
            index === isActive.current
              ? `${styles.active} ${styles.sheetItem}`
              : `${styles.inactive} ${styles.sheetItem}`
          }
          onClick={() => sheetSelectHandler(sheetName, index)}
        >
          {sheetName}
        </span>
      ))}
    </div>
  );
}
