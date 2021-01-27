import Header from './header/Header'
import Footer from './footer/Footer'

import classNames from './styles.scss'

export default function AppLayout({ children }) {
  return (
    <div className={classNames.wrapper}>
      <Header />
      <div className={classNames.main}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
