import type { ReactNode } from 'react';
import styles from './PayButton.module.css';

interface PayButtonProps {
	variant?: 'primary' | 'secondary';
	loading?: boolean;
	disabled?: boolean;
	icon?: ReactNode;
	children: ReactNode;
	onClick?: () => void;
	className?: string;
}

export const PayButton = ({
	variant = 'primary',
	loading = false,
	disabled = false,
	icon,
	children,
	onClick,
	className = '',
}: PayButtonProps) => {
	const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

	return (
		<button
			type='button'
			onClick={onClick}
			disabled={disabled || loading}
			className={buttonClass}>
			{loading ? (
				<LoadingDots />
			) : (
				<>
					<span className={styles.text}>{children}</span>
					{icon && <span className={styles.icon}>{icon}</span>}
				</>
			)}
		</button>
	);
};

// Loading Dots Component
const LoadingDots = () => {
	return (
		<div className={styles.loadingContainer}>
			{[...Array(8)].map((_, index) => (
				<span
					key={index}
					className={styles.dot}
					style={{ animationDelay: `${index * 0.1}s` }}
				/>
			))}
		</div>
	);
};
