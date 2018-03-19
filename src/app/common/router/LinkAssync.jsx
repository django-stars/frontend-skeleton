import { Link as RouterLink } from 'react-router-dom'

import { namedRoutes } from './config'


export default function LinkAssync({to, after, onClick, navigateAfter, ...props}) {
  let path = namedRoutes[to]
  if(!path) {
    throw 'no route with name: ' + to
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

export default compose(
  connect(null, {
    navigateAfter,
  })
)(LinkAssync)
