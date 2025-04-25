import { ChangeEvent, useContext, useState } from "react";
import moment from "moment";
import clsx from "clsx";

import styles from "./navbar.module.css";
import { MingcuteSearch } from "../../icons/MingcuteSeacrch";
import { MingcuteAdd } from "../../icons/MingcuteAdd";
import CustomModal from "../addModal/Modal";
import { MainContext } from "../../context/mainContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const now = moment();
  const { addTask, state, searchInTask, showCompletedTask, getTaskById } =
    useContext(MainContext);

  const [isModalOpen, setIsOpenModal] = useState(false);
  const [title, setTitle] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [deadLine, setDeadLine] = useState<string>();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

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

  const addTaskTodo = () => {
    if (!title || !desc || !deadLine) {
      toast.error("Please fill in all fields!");
      return;
    }
    addTask({
      id: (state.list.length + 1).toString(),
      title: title || "",
      desc: desc || "",
      deadline: deadLine || "",
      completed: false,
    });
    setIsOpenModal(false);
  };

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    searchInTask(value);
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.navbar}>
        <CustomModal isOpen={isModalOpen} onClose={() => setIsOpenModal(false)}>
          <h3>Add Task to TodoList</h3>
          <div className={styles.inputs}>
            <label>Title :</label>
            <input type="text" onChange={handleTitleChange} />
            <label>description :</label>{" "}
            <textarea
              onChange={handleDescChange}
              value={desc || ""}
              rows={4}
              className={styles.textarea}
            />
            <label>Deadline :</label>
            <input type="text" onChange={handleDeadLineChange} />
          </div>

          <div className={styles.addBtn}>
            <button className={styles.button} onClick={addTaskTodo}>
              Add Task
            </button>
          </div>
        </CustomModal>
        <div className={styles.date}>
          <h4>{now.format("YYYY/MM/DD")}</h4>
          <div className={styles.category}>
            <li
              onClick={() => {
                getTaskById("lists");
                setActiveTab("all");
              }}
              className={clsx({ [styles.active]: activeTab === "all" })}
            >
              All
            </li>
            <li
              onClick={() => {
                showCompletedTask();
                setActiveTab("completed");
              }}
              className={clsx({ [styles.active]: activeTab === "completed" })}
            >
              Completed
            </li>
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.input}>
            <MingcuteSearch />
            <input
              type="text"
              placeholder="Search List"
              value={search}
              onChange={searchHandler}
            />
          </div>

          <div className={styles.button}>
            <button onClick={() => setIsOpenModal(true)}>
              <MingcuteAdd />
              Add New List
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
