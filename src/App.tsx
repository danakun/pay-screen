import { useState } from "react";
import styles from "./App.module.css";
import { Footer } from "./components/layout/Footer";
import { LanguageSelector } from "./components/ui/LanguageSelector";
import { OrderSummary } from "./components/features/OrderSummary";
import { PaymentSection } from "./components/features/PaymentSection";
import Paycomet from "@assets/logos/paycomet.svg";

function App() {
  const [orderData] = useState({
    amount: "100.00",
    currency: "€",
    merchant: "Bankstore",
    reference: "#20220616123806",
  });

  return (
    <div className={styles.mainLayout}>
      {/* Header */}
      <div className={styles.headerLeft}>
        <div className={styles.container}>
          <img src={Paycomet} alt="Paycomet" className={styles.logo} />
        </div>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.container}>
          <LanguageSelector />
        </div>
      </div>

      {/* Content Left */}
      <div className={styles.contentLeft}>
        <div className={styles.container}>
          <OrderSummary
            amount={orderData.amount}
            currency={orderData.currency}
            merchant={orderData.merchant}
            reference={orderData.reference}
          />
        </div>
      </div>

      {/* Content Right */}
      <div className={styles.contentRight}>
        <div className={styles.container}>
          <PaymentSection
            amount={orderData.amount}
            currency={orderData.currency}
          />
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footerLeft}>
        <div className={styles.container}>
          <Footer />
        </div>
      </div>
      <div className={styles.footerRight}></div>
    </div>
  );
}

export default App;
