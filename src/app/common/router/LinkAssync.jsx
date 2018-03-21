// import { Link as RouterLink } from 'react-router-dom' TODO: remove commented code, sebastiyan, 20.03.2018
import { namedRoutes } from './config'

export default function LinkAssync({ to, after, onClick, navigateAfter, ...props }) {
  let path = namedRoutes[to]
  if(!path) {
    throw new Error('no route with name: ' + to)
  }

  function navigate(e) {
    e.preventDefault()
    e.stopPropagation()
    navigateAfter(after)
    onClick && onClick(e)
  }

  return (
    <a href={path} onClick={navigate} {...props} />
  )
}

// TODO: remove commented code, sebastiyan, 20.03.2018
// export default compose(
//   connect(null, {
//     navigateAfter,
//   })
// )(LinkAssync)
