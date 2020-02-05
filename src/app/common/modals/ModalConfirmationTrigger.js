import ModalTrigger from './ModalTrigger'
import ModalConfirmation from './ModalConfirmation'
import PropTypes from 'prop-types'

ModalConfirmationTrigger.propTypes = {
  onConfirm: PropTypes.func,
  statusClassName: PropTypes.string,
}

ModalConfirmationTrigger.defaultProps = {
  onConfirm: undefined,
  statusClassName: '',
}

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
