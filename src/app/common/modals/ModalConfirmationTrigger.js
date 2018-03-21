import ModalTrigger from './ModalTrigger'
import ModalConfirmation from './ModalConfirmation'

export default function ModalConfirmationTrigger(props) {
  const { onConfirm, statusClassName } = props
  return (
    <ModalTrigger
      modalClassName={`${statusClassName} modal-confirmation`}
      component={ModalConfirmation}
      onConfirm={onConfirm}
      {...props}
    />
  )
}
