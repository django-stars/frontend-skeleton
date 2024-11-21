import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'

FormPanel.propTypes = {
  panelTitle: PropTypes.string,
  isCollapsible: PropTypes.bool,
  isExpanded: PropTypes.bool,
}

FormPanel.defaultProps = {
  isCollapsible: false,
  isExpanded: true,
  panelTitle: '',
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
