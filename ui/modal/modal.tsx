import styles from "./styles.module.css";

export default function Modal({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__container}>{children}</div>
    </div>
  );
}
