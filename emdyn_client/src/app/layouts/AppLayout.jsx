import Header from './Header'
import Nav from '../modules/dashboard/nav'
import Main from '../modules/dashboard/main'

export default (props) => {
  let {children, ...restProps } = props;
  return (
    <div className="wrap">
      <Header />
      <main>
        <Nav {...restProps} />
        {children || <Main />}
      </main>
    </div>
  )
}
