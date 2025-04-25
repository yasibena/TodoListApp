import styles from "./home.module.css";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Lists from "../../components/lists/Lists";
import Header from "../../components/header/Header";

export default function Home() {
  return (
    <div className={styles.home}>
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className={styles.dashboard}>
        <Navbar />
        <Lists />
      </div>
    </div>
  );
}
