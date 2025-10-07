import styles from "./LanguageSelector.module.css";
import SpanishFlag from "@assets/icons/ES.svg";
import ArrowDown from "@assets/icons/arrow-down.svg";

export const LanguageSelector = () => {
  return (
    <button className={styles.selector}>
      <span className={styles.label}>Español</span>
      <img src={SpanishFlag} alt="ES" className={styles.flag} />
      <img src={ArrowDown} alt="Arrow Down" className={styles.arrow} />
    </button>
  );
};
