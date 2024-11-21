import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import styles from './layout.scss'

AppLayout.propTypes = {
  children: PropTypes.node,
}

AppLayout.defaultProps = {
  children: null,
}

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
