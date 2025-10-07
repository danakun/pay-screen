import styles from "./PaymentMethodButton.module.css";

interface PaymentMethodButtonProps {
  icon: string; // path
  label: string;
  selected?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const PaymentMethodButton = ({
  icon,
  label,
  selected = false,
  loading = false,
  disabled = false,
  onClick,
  className = "",
}: PaymentMethodButtonProps) => {
  const buttonClass = `
    ${styles.button} 
    ${selected ? styles.selected : ""} 
    ${loading ? styles.loading : ""} 
    ${className}
  `.trim();

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || loading}
        className={buttonClass}
      >
        <div className={styles.iconContainer}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <img src={icon} alt={label} className={styles.icon} />
          )}
        </div>
      </button>
      <p className={styles.label}>{label}</p>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => {
  return (
    <div className={styles.spinner}>
      {[...Array(8)].map((_, index) => (
        <span
          key={index}
          className={styles.spinnerDot}
          style={{
            transform: `rotate(${index * 45}deg) translateY(-10px)`,
            animationDelay: `${index * 0.125}s`,
          }}
        />
      ))}
    </div>
  );
};
