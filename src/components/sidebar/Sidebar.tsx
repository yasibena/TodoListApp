import { useContext, useEffect } from "react";
import { MainContext } from "../../context/mainContext";

import styles from "./sidebar.module.css";

export default function Sidebar() {
  const { getTaskById, state } = useContext(MainContext);

  useEffect(() => {
    getTaskById("lists");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.vl}></div>
      {state?.list?.map((list) => (
        <div key={list.id} className={styles.item}>
          <hr className={styles.hl}></hr>
          <div className={styles.title}>{list.title}</div>
        </div>
      ))}
    </div>
  );
}
