import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Test from './Test'

describe('component Test', function() {
  it('renders correctly', function() {
    const component = renderer.create(<Test />).toJSON()

    expect(component).toMatchSnapshot()
  })

  it('should not contain h2 headline with text', function() {
    const wrapper = shallow(<Test />)
    const text = <h2>Text to test</h2>

    expect(wrapper.contains(text)).toEqual(false)
  })
})
