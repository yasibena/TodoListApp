import React, { useContext } from "react";
import { MainContext } from "../../context/mainContext";
import List from "../../pages/list/List";
import { Task } from "../../types/task";
import styles from "./lists.module.css";

export default function Lists() {
  const { state } = useContext(MainContext);
  return (
    <div className={styles.lists}>
      {state?.list.map((task: Task) => (
        <List key={task.id} task={task} />
      ))}
    </div>
  );
}
