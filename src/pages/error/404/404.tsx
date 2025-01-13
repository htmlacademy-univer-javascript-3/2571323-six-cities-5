import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const NotFound: React.FC = () => (
  <section className={styles.container}>
    <header className={styles.header}>
      <p className={styles.code}>404</p>
      <p className={styles.message}>Oops! This page doesn’t exist.</p>
    </header>
    <Link to="/" className={styles.homeLink}>
      Go back to Home
    </Link>
  </section>
);

export default NotFound;

