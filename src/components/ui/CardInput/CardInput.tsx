// CardInput.tsx
import { useState, useEffect, useRef, type ChangeEvent } from "react";
import styles from "./CardInput.module.css";
import EmptyIcon from "@assets/icons/empty.svg";
import FilledIcon from "@assets/icons/filled.svg";
import NumberErrorIcon from "@assets/icons/number-error.svg";
import CvcErrorIcon from "@assets/icons/cvc-error.svg";
import CvcFocusIcon from "@assets/icons/cvc-focus.svg";

interface CardInputProps {
  onCardChange?: (cardData: CardData) => void;
  className?: string;
}

interface CardData {
  cardNumber: string;
  expiry: string;
  cvc: string;
}

type ErrorType = "card" | "expiry" | "cvc" | null;

export const CardInput = ({ onCardChange, className = "" }: CardInputProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    if (onCardChange) {
      onCardChange({
        cardNumber,
        expiry,
        cvc,
      });
    }
  }, [cardNumber, expiry, cvc, onCardChange]);

  const cardRef = useRef<HTMLInputElement>(null);
  const expiryRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);

  // Format card number with spaces
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  // Format expiry as MM/AA
  const formatExpiry = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const validateCardNumber = (number: string): boolean => {
    // Luhn algorithm for card validation
    if (number.length !== 16) return false;

    let sum = 0;
    let isEven = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const validateExpiry = (expiryValue: string): boolean => {
    if (expiryValue.length !== 4) return false;

    const month = parseInt(expiryValue.slice(0, 2));
    const year = parseInt("20" + expiryValue.slice(2, 4));

    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
  };

  const validateCvc = (cvcValue: string): boolean => {
    return cvcValue.length === 3;
  };

  const handleBlur = (field: string) => {
    setFocusedField(null);

    // Validate on blur
    if (field === "card" && cardNumber.length === 16) {
      if (!validateCardNumber(cardNumber)) {
        setError("card");
      }
    }

    if (field === "expiry" && expiry.length === 4) {
      if (!validateExpiry(expiry)) {
        setError("expiry");
      }
    }

    if (field === "cvc" && cvc.length > 0) {
      if (!validateCvc(cvc)) {
        setError("cvc");
      }
    }
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(value);

      // Clear error when typing
      if (error === "card") {
        setError(null);
      }

      // Validate in real-time when complete
      if (value.length === 16) {
        if (!validateCardNumber(value)) {
          setError("card");
        } else {
          setError(null);
          expiryRef.current?.focus();
        }
      }
    }
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setExpiry(value);

      // Clear error when typing
      if (error === "expiry") {
        setError(null);
      }

      // Validate in real-time when complete
      if (value.length === 4) {
        if (!validateExpiry(value)) {
          setError("expiry");
        } else {
          setError(null);
          cvcRef.current?.focus();
        }
      }
    }
  };

  const handleCvcChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvc(value);

      // Clear error when typing
      if (error === "cvc") {
        setError(null);
      }

      // Validate in real-time when complete
      if (value.length === 3) {
        if (!validateCvc(value)) {
          setError("cvc");
        } else {
          setError(null);
        }
      }
    }
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  // Get the appropriate icon based on state
  const getCardIcon = () => {
    if (focusedField === "cvc") return CvcFocusIcon;
    if (error === "card") return NumberErrorIcon;
    if (error === "expiry") return NumberErrorIcon;
    if (error === "cvc") return CvcErrorIcon;
    if (cardNumber.length > 0) {
      return FilledIcon;
    }
    return EmptyIcon;
  };

  const containerClass = `
  ${styles.container}
  ${focusedField ? styles.focused : ""}
  ${cardNumber.length > 0 ? styles.filled : ""} 
  ${error ? styles.error : ""}
  ${error === "card" ? styles.cardError : ""}
  ${error === "expiry" ? styles.expiryError : ""}
  ${error === "cvc" ? styles.cvcError : ""}
  ${className}
`.trim();

  const getErrorMessage = () => {
    if (error === "card") return "El número de tu tarjeta no es válido.";
    if (error === "expiry")
      return "El año de caducidad de la tarjeta ya ha pasado.";
    if (error === "cvc") return "El CVC no es correcto.";
    return "";
  };

  return (
    <div className={styles.wrapper}>
      <div className={containerClass}>
        <img src={getCardIcon()} alt="" className={styles.cardIcon} />

        <input
          ref={cardRef}
          type="text"
          value={formatCardNumber(cardNumber)}
          onChange={handleCardNumberChange}
          onFocus={() => handleFocus("card")}
          onBlur={() => handleBlur("card")}
          placeholder="Número de tarjeta"
          className={`${styles.input} ${styles.cardInput}`}
        />

        <input
          ref={expiryRef}
          type="text"
          value={formatExpiry(expiry)}
          onChange={handleExpiryChange}
          onFocus={() => handleFocus("expiry")}
          onBlur={() => handleBlur("expiry")}
          placeholder="MM/AA"
          className={`${styles.input} ${styles.expiryInput}`}
        />

        <input
          ref={cvcRef}
          type="text"
          value={cvc}
          onChange={handleCvcChange}
          onFocus={() => handleFocus("cvc")}
          onBlur={() => handleBlur("cvc")}
          placeholder="CVC"
          className={`${styles.input} ${styles.cvcInput}`}
        />
      </div>

      {error && <p className={styles.errorMessage}>{getErrorMessage()}</p>}
    </div>
  );
};
