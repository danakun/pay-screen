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

export const CardInput = ({ onCardChange, className = "" }: CardInputProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  // Separate error states for each field
  const [cardError, setCardError] = useState(false);
  const [expiryError, setExpiryError] = useState(false);
  const [cvcError, setCvcError] = useState(false);

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

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  const formatExpiry = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const validateCardNumber = (number: string): boolean => {
    // Luhn algorithm 
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

    if (field === "card" && cardNumber.length === 16) {
      setCardError(!validateCardNumber(cardNumber));
    }

    if (field === "expiry" && expiry.length === 4) {
      setExpiryError(!validateExpiry(expiry));
    }

    if (field === "cvc" && cvc.length > 0) {
      setCvcError(!validateCvc(cvc));
    }
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(value);

      if (cardError) {
        setCardError(false);
      }

      if (value.length === 16) {
        if (!validateCardNumber(value)) {
          setCardError(true);
        } else {
          setCardError(false);
          expiryRef.current?.focus();
        }
      }
    }
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setExpiry(value);

      if (expiryError) {
        setExpiryError(false);
      }

      if (value.length === 4) {
        if (!validateExpiry(value)) {
          setExpiryError(true);
        } else {
          setExpiryError(false);
          cvcRef.current?.focus();
        }
      }
    }
  };

  const handleCvcChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvc(value);

      if (cvcError) {
        setCvcError(false);
      }

      if (value.length === 3) {
        if (!validateCvc(value)) {
          setCvcError(true);
        } else {
          setCvcError(false);
        }
      }
    }
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const getCardIcon = () => {
    if (focusedField === "cvc") return CvcFocusIcon;
    if (cardError) return NumberErrorIcon;
    if (expiryError) return NumberErrorIcon;
    if (cvcError) return CvcErrorIcon;
    if (cardNumber.length > 0) {
      return FilledIcon;
    }
    return EmptyIcon;
  };

  const containerClass = `
  ${styles.container}
  ${focusedField ? styles.focused : ""}
  ${cardNumber.length > 0 ? styles.filled : ""} 
  ${(cardError || expiryError || cvcError) ? styles.error : ""}
  ${cardError ? styles.cardError : ""}
  ${expiryError ? styles.expiryError : ""}
  ${cvcError ? styles.cvcError : ""}
  ${className}
`.trim();

  const getErrorMessage = () => {
    const errors = [];
    if (cardError) errors.push("El número de tu tarjeta no es válido.");
    if (expiryError) errors.push("El año de caducidad de la tarjeta ya ha pasado.");
    if (cvcError) errors.push("El CVC no es correcto.");
    return errors.join(" ");
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

      {(cardError || expiryError || cvcError) && (
        <p className={styles.errorMessage}>{getErrorMessage()}</p>
      )}
    </div>
  );
};