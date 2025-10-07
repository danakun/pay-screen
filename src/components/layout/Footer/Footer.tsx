import styles from './Footer.module.css';

interface FooterProps {
	userId?: string;
	userName?: string;
	address?: string;
	phone?: string;
	email?: string;
	links?: Array<{ label: string; href: string }>;
	className?: string;
}

export const Footer = ({
	userId = '77976556b',
	userName = 'Jhon Doe',
	address = 'Calle Inventada - 08080 Barcelona',
	phone = '666666666',
	email = 'usuario@proveedor.com',
	links = [
		{ label: 'Enlace 1', href: '#' },
		{ label: 'Enlace 2', href: '#' },
		{ label: 'Enlace 3', href: '#' },
	],
	className = '',
}: FooterProps) => {
	return (
		<footer className={`${styles.footer} ${className}`}>
			<div className={styles.info}>
				<p className={styles.text}>
					{userId} - {userName}
				</p>
				<p className={styles.text}>Dirección: {address}</p>
				<p className={styles.text}>
					Teléfono: {phone} - Email:{' '}
					<a href={`mailto:${email}`} className={styles.emailLink}>
						{email}
					</a>
				</p>
			</div>
			<nav className={styles.links}>
				{links.map((link, index) => (
					<a key={index} href={link.href} className={styles.link}>
						{link.label}
					</a>
				))}
			</nav>
		</footer>
	);
};
