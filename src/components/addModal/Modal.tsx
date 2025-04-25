import { MouseEvent, useEffect, ReactNode } from "react";
import styles from "./modal.module.css";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function CustomModal({
  isOpen,
  onClose,
  children,
}: CustomModalProps) {
  useEffect(() => {
    if (isOpen) {
      //   document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
