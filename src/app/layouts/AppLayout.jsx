import Header from './Header'
import Footer from './Footer'

export default function AppLayout({ children }) {
  return (
    <div className="wrapper">
      <Header />
      <div className="main">
        {children}
      </div>
      <Footer />
    </div>
  )
}
