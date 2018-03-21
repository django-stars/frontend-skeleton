import { Button } from 'react-bootstrap'

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
