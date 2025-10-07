import styles from "./OrderSummary.module.css";

interface OrderSummaryProps {
  amount: string;
  currency?: string;
  merchant: string;
  reference: string;
}

export const OrderSummary = ({
  amount,
  currency = "€",
  merchant,
  reference,
}: OrderSummaryProps) => {
  return (
    <div className={styles.summary}>
      <p className={styles.label}>Importe del pedido</p>
      <h1 className={styles.amount}>
        {amount} <span className={styles.currency}>{currency}</span>
      </h1>
      <p className={styles.text}>
        El comercio <span className={styles.highlight}>{merchant}</span>{" "}
        solicita una operación con referencia{" "}
        <span className={styles.highlight}>{reference}</span>
      </p>
    </div>
  );
};
