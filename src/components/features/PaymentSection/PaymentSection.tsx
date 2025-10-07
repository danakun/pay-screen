import { useState } from "react";
import styles from "./PaymentSection.module.css";
import { CardInput } from "@/components/ui/CardInput/CardInput";
import { PayButton } from "../../ui/PayButton/PayButton";
import { PaymentMethodButton } from "../../ui/PaymentMethodButton/PaymentMethodButton";
import Cards from "@assets/icons/cards.svg";
import Paycomet from "@assets/logos/paycomet.svg";
import GooglePayLogo from "@assets/logos/googlepay.svg";
import ApplePayLogo from "@assets/logos/applepay.svg";
import ClickToPayIcon from "@assets/icons/clicktopay1.svg";
import MastercardLogo from "@assets/logos/mastercard.svg";
import PayPalLogo from "@assets/logos/paypal.svg";
import KlarnaLogo from "@assets/logos/klarna.svg";
import BizumLogo from "@assets/logos/bizum.svg";
import SkrillLogo from "@assets/logos/skrill.svg";

interface PaymentSectionProps {
  amount: string;
  currency?: string;
}

export const PaymentSection = ({
  amount,
  currency = "€",
}: PaymentSectionProps) => {
  const [loadingCard, setLoadingCard] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);
  const [loadingClickToPay, setLoadingClickToPay] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [loadingPayPal, setLoadingPayPal] = useState(false);
  const [loadingKlarna, setLoadingKlarna] = useState(false);
  const [loadingBizum, setLoadingBizum] = useState(false);
  const [loadingSkrill, setLoadingSkrill] = useState(false);

  const handlePayPalClick = () => {
    setSelectedMethod("paypal");
    setLoadingPayPal(true);
    setTimeout(() => setLoadingPayPal(false), 2000);
  };

  const handleKlarnaClick = () => {
    setSelectedMethod("klarna");
    setLoadingKlarna(true);
    setTimeout(() => setLoadingKlarna(false), 2000);
  };

  const handleBizumClick = () => {
    setSelectedMethod("bizum");
    setLoadingBizum(true);
    setTimeout(() => setLoadingBizum(false), 2000);
  };

  const handleSkrillClick = () => {
    setSelectedMethod("skrill");
    setLoadingSkrill(true);
    setTimeout(() => setLoadingSkrill(false), 2000);
  };

  const handleCardClick = () => {
    setLoadingCard(true);
    setTimeout(() => setLoadingCard(false), 3000);
  };

  const handleGoogleClick = () => {
    setLoadingGoogle(true);
    setTimeout(() => setLoadingGoogle(false), 3000);
  };

  const handleAppleClick = () => {
    setLoadingApple(true);
    setTimeout(() => setLoadingApple(false), 3000);
  };

  const handleClickToPayClick = () => {
    setLoadingClickToPay(true);
    setTimeout(() => setLoadingClickToPay(false), 3000);
  };

  return (
    <div className={styles.section}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Datos de la tarjeta</h2>
        <img src={Cards} alt="Cards logos" className={styles.cardlogos} />
      </div>
      <div className={styles.content}>
        <CardInput />

        <PayButton
          variant="primary"
          className={styles.marginM}
          loading={loadingCard}
          onClick={handleCardClick}
        >
          Pagar con tarjeta {amount}
          {currency}
        </PayButton>

        {/* Google Pay */}
        <PayButton
          variant="secondary"
          className={styles.marginS}
          loading={loadingGoogle}
          onClick={handleGoogleClick}
          icon={
            <img
              src={GooglePayLogo}
              alt="Google Pay"
              style={{ height: "20px" }}
            />
          }
        >
          Pagar con
        </PayButton>

        {/* Apple Pay */}
        <PayButton
          variant="secondary"
          className={styles.marginS}
          loading={loadingApple}
          onClick={handleAppleClick}
          icon={
            <img
              src={ApplePayLogo}
              alt="Apple Pay"
              style={{ height: "20px" }}
            />
          }
        >
          Pagar con
        </PayButton>

        {/* Click to Pay */}
        <PayButton
          variant="secondary"
          className={styles.marginS}
          loading={loadingClickToPay}
          onClick={handleClickToPayClick}
          icon={
            <>
              <img src={ClickToPayIcon} alt="" style={{ height: "20px" }} />
              <span style={{ margin: "0 4px" }}>|</span>
              <img
                src={MastercardLogo}
                alt="Mastercard"
                style={{ height: "20px" }}
              />
            </>
          }
        >
          Pagar con
        </PayButton>

        <div className={styles.divider}>
          <span className={styles.line}></span>
          <p className={styles.text}>O paga con otro método alternativo</p>
          <span className={styles.line}></span>
        </div>

        <div className={styles.methodButtons}>
          <PaymentMethodButton
            icon={PayPalLogo}
            label="Paypal"
            selected={selectedMethod === "paypal"}
            loading={loadingPayPal}
            onClick={handlePayPalClick}
          />

          <PaymentMethodButton
            icon={KlarnaLogo}
            label="Klarna"
            selected={selectedMethod === "klarna"}
            loading={loadingKlarna}
            onClick={handleKlarnaClick}
          />

          <PaymentMethodButton
            icon={BizumLogo}
            label="Bizum"
            selected={selectedMethod === "bizum"}
            loading={loadingBizum}
            onClick={handleBizumClick}
          />

          <PaymentMethodButton
            icon={SkrillLogo}
            label="Skrill"
            selected={selectedMethod === "skrill"}
            loading={loadingSkrill}
            onClick={handleSkrillClick}
          />
        </div>

        <img src={Paycomet} alt="Paycomet" className={styles.logoPaycomet} />
      </div>
    </div>
  );
};
