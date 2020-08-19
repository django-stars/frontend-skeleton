import Header from './Header'
import Footer from './Footer'
import styles from './layout.scss'

export default function AppLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.main}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
