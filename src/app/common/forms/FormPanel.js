import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'

const propTypes = {
  panelTitle: PropTypes.string,
  isCollapsible: PropTypes.bool,
  isExpanded: PropTypes.bool,
}

const defaultProps = {
  isCollapsible: false,
  isExpanded: true,
}

export default function FormPanel(props) {
  const { panelTitle, isCollapsible, isExpanded, ...restProps } = props
  return (
    <Panel defaultExpanded={isExpanded}>
      <Panel.Heading>
        <Panel.Title componentClass='h3' toggle={isCollapsible}>{panelTitle}</Panel.Title>
        { isCollapsible && (<Panel.Toggle componentClass='i' className='collapse-icon'></Panel.Toggle>) }
      </Panel.Heading>
      <Panel.Body collapsible={isCollapsible} {...restProps} />
    </Panel>
  )
}

FormPanel.propTypes = propTypes
FormPanel.defaultProps = defaultProps
