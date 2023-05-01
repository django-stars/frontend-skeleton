import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

ModalConfirmation.propTypes = {
  onHide: PropTypes.func,
  onConfirm: PropTypes.func,
  confirmationText: PropTypes.node,
  dismissBtn: PropTypes.node,
  confirmBtn: PropTypes.node,
}

ModalConfirmation.defaultProps = {
  onHide: undefined,
  onConfirm: undefined,
  confirmationText: null,
  dismissBtn: null,
  confirmBtn: null,
}

export default function ModalConfirmation(props) {
  const { onHide, onConfirm, confirmationText, dismissBtn, confirmBtn } = props
  return (
    <div>
      {confirmationText}
      <div className="modal-footer">
        <Button onClick={onHide} className="btn-accent">{dismissBtn}</Button>
        <Button onClick={onConfirm} className="btn-request">{confirmBtn}</Button>
      </div>
    </div>
  )
}
