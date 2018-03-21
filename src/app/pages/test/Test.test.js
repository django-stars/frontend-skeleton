import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { TextField } from 'common/forms'
import Test from './Test'

describe('component Test', function() {
  it('should match snapshot', function() {
    const component = shallow(<Test />)

    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('should have only one TextField with name "firstName"', function() {
    const textField = shallow(<Test />).find(TextField).filter({ name: 'firstName' })

    expect(textField.length).toEqual(1)
  })

  it('should not contain h2 headline with text', function() {
    const wrapper = shallow(<Test />)
    const text = <h2>Text to test</h2>

    expect(wrapper.contains(text)).toEqual(false)
  })
})
