import { useState } from 'react'

export default function withModal(ChildComponent) {
  return function ModalWrapper(props) {
    const [ active, setToggle ] = useState(!!props.active)
    return (
      <ChildComponent
        {...props}
        active={active}
        toggle={() => setToggle(!active)}
        setToggle={setToggle}
      />
    )
  }
}
