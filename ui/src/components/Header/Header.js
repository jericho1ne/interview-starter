import styles from './Header.module.scss'

export default function Header({ title }) {
  return <div>
      <h2 className={styles.pageTitle}>{title}</h2>
    </div>
}
