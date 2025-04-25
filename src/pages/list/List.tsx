import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Task } from "../../types/task";
import styles from "./list.module.css";
import { getLightPastelColor } from "../../helpers/helper";
import { MainContext } from "../../context/mainContext";
import MingcuteTrash from "../../icons/MingcuteTrash";
import CustomModal from "../../components/addModal/Modal";
import MingcuteEdit from "../../icons/MingcuteEdit";

interface ListProps {
  task: Task;
}

export default function List({ task }: ListProps) {
  const { completedTask, removeTask, editTask } = useContext(MainContext);
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.desc);
  const [deadLine, setDeadLine] = useState(task.deadline);
  const [isChecked, setIsChecked] = useState(task.completed);

  useEffect(() => {
    setIsChecked(task.completed);
  }, [task.completed]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDesc(e.target.value);
  };

  const handleDeadLineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeadLine(e.target.value);
  };

  const handleCheckboxChange = (targetTask: Task) => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    completedTask({
      id: targetTask.id,
      title: targetTask.title,
      desc: targetTask.desc,
      deadline: targetTask.deadline,
      completed: newCheckedState,
    });
  };

  const editTaskTodo = (targetTask: Task) => {
    editTask({
      id: targetTask.id,
      title: title || "",
      desc: desc || "",
      deadline: deadLine || "",
      completed: false,
    });
    setIsOpenModal(false);
  };

  return (
    <div
      className={styles.list}
      style={{ background: getLightPastelColor(task.title) }}
    >
      <CustomModal isOpen={isModalOpen} onClose={() => setIsOpenModal(false)}>
        <h3>Edit Task</h3>
        <div className={styles.inputs}>
          <label>Title :</label>
          <input type="text" onChange={handleTitleChange} value={title} />
          <label>description :</label>{" "}
          <textarea
            onChange={handleDescChange}
            value={desc || ""}
            rows={4} 
            className={styles.textarea}
          />
          <label>Deadline :</label>
          <input type="text" onChange={handleDeadLineChange} value={deadLine} />
        </div>

        <div className={styles.addBtn}>
          <button className={styles.button} onClick={() => editTaskTodo(task)}>
            Edit Task
          </button>
        </div>
      </CustomModal>
      <div className={styles.header}>
        <div className={styles.titleCheck}>
          <input
            type="checkbox"
            id={`task-${task.id}`}
            checked={task.completed}
            onChange={() => handleCheckboxChange(task)}
          />
          <h4>{task.title}</h4>
        </div>
        <div className={styles.icon}>
          <MingcuteTrash onClick={() => removeTask(task.id)} />
          <MingcuteEdit onClick={() => setIsOpenModal(true)} />
        </div>
      </div>
      <p>{task.desc}</p>
      <span className={styles.deadline}>{task.deadline}</span>
    </div>
  );
}
