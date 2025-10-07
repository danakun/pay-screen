import styles from "./App.module.css";
import { Footer } from "./components/layout/Footer";
import { LanguageSelector } from "./components/ui/LanguageSelector";
import { OrderSummary } from "./components/features/OrderSummary";
import { PaymentSection } from "./components/features/PaymentSection";
import Paycomet from "@assets/logos/Paycomet.svg";

function App() {
  return (
    <>
      <div className={styles.mainLayout}>
        <header className={styles.header}>
          <div className={`${styles.leftColumn} ${styles.leftHeaderP}`}>
            <div
              className={`${styles.container} ${styles.headerContainer} ${styles.left}`}
            >
              <img src={Paycomet} alt="Paycomet" className={styles.logo} />
            </div>
          </div>

          <div className={`${styles.rightColumn} ${styles.rightHeaderP}`}>
            <div className={`${styles.container} ${styles.headerContainer}`}>
              <div className={styles.langInput}>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </header>

        <div className={styles.leftColumn}>
          <div className={`${styles.container} ${styles.left}`}>
            <div className={styles.content}>
              <OrderSummary
                amount="100.00"
                merchant="Bankstore"
                reference="#20220616123806"
              />
            </div>
            <Footer className={styles.footer} />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.container}>
            <div className={styles.content}>
              <PaymentSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
