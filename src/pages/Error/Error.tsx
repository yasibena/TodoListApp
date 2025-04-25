import React from "react";
import styles from "./error.module.css";

const Error: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.errorBox}>
        <h2 className={styles.header}>Oops! Something went wrong.</h2>
        <p className={styles.message}>
          Please try again later or contact support.
        </p>
      </div>
    </div>
  );
};

export default Error;
