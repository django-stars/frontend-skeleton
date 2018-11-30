import { autobind } from 'core-decorators'
import { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody } from 'reactstrap'
import { ModalConfirmation } from 'common/widgets'

// TODO onBeforeUnload

class Prompt extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      isModalShown: false,
      action: null,
      location: null,
    }
  }

  @autobind
  handleBlock(location, action) {
    if(this.props.isLocationAllowed(location)) {
      return true
    }

    this.setState({ isModalShown: true, action, location })

    return false
  }

  @autobind
  toggleModal({ isSuccess }) {
    this.setState({ isModalShown: false })
    if(isSuccess) {
      this.props.onConfirm()
      this.disable()
      this.navigate()
    }
  }

  navigate() {
    const { action, location } = this.state
    this.context.router.history[action.toLowerCase()](
      // FIXME it seems pathname doesn't contains query and hash
      // this should be fixed
      location.pathname,
      location.state,
    )
    this.setState({})
  }

  enable() {
    if(this.unblock) { this.unblock() }

    this.unblock = this.context.router.history.block(this.handleBlock)
  }

  disable() {
    if(this.unblock) {
      this.unblock()
      this.unblock = null
    }
  }

  componentWillMount() {
    this.enable()
  }

  componentWillReceiveProps(nextProps) {
    this.enable()
  }

  componentWillUnmount() {
    this.disable()
  }

  render() {
    const isModalShown = this.state.isModalShown
    const { title, message } = this.props

    return (
      <Modal isOpen={isModalShown}>
        <ModalBody>
          <ModalConfirmation
            title={title}
            description={message}
            toggleModal={this.toggleModal}
          />
        </ModalBody>
      </Modal>
    )
  }
}

Prompt.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      block: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
}

Prompt.propTypes = {
  isLocationAllowed: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
}

Prompt.defaultProps = {
  title: 'Warning!',
  isLocationAllowed: function(location) { return false },
}

export default Prompt
