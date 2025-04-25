import MingcuteLogo from "../../icons/MingcuteLogo";
import styles from "./header.module.css";

export default function Header() {
  return (
    <main className={styles.header}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <MingcuteLogo height={35} width={35} />
        </div>
        <h1>Todo List</h1>
      </div>
    </main>
  );
}
