import PropTypes from 'prop-types'

Wizard.propTypes = {
  steps: PropTypes.array,
  activeStepIndex: PropTypes.number,
}

Wizard.defaultProps = {
  steps: [],
  activeStepIndex: 0,
}

export default function Wizard(props) {
  const { steps, activeStepIndex } = props

  return (
    <nav className='steps-nav'>
      {
        steps.map((step, index) => (
          <a
            className={`item ${activeStepIndex === index ? 'active' : ''}`}
            href={step.url}
            key={index}>
            <div className='step-item'>
              <span className='number'>{ index + 1 }</span>
              <span className='text'>{ step.title }</span>
            </div>
          </a>
        ))
      }
    </nav>
  )
}
