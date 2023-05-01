import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'

ModalWrapper.propTypes = {
  modalClassName: PropTypes.string,
  title: PropTypes.string,
  show: PropTypes.bool,
  onHide: PropTypes.func,
  component: PropTypes.element,
}

ModalWrapper.defaultProps = {
  modalClassName: '',
  title: '',
  show: false,
  onHide: undefined,
  component: null,
}

export default function ModalWrapper(props) {
  const {
    modalClassName,
    title,
    show,
    onHide,
    component: ModalComponent,
  } = props

  return (
    <Modal show={show} onHide={onHide} className={modalClassName}>
      <div className="modal-container">
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <div className="close-btn" onClick={onHide}>&#10005;</div>
        </Modal.Header>
        <Modal.Body>
          <ModalComponent {...props} />
        </Modal.Body>
      </div>
    </Modal>
  )
}
