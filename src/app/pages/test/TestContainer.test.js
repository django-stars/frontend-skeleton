import configureMockStore from 'redux-mock-store'
import { shallow } from 'enzyme'

import TestContainer from './TestContainer'

const middlewares = []
const mockStore = configureMockStore(middlewares)

describe('TestContainer', () => {
  const INITIAL_STATE = {
    form: 'test',
    initialValues: {
      firstName: 'Stephen',
      lastName: 'Hawking',
      salutation: 'mr',
    },
  }
  let store, container

  beforeEach(() => {
    store = mockStore(INITIAL_STATE)
    container = shallow(<TestContainer store={store} />)
  })

  it('should render the connected TestContainer component', () => {
    expect(container.length).toEqual(1)
  })

  it('should match props with initialState', () => {
    expect(container.prop('form')).toEqual(INITIAL_STATE.form)
    expect(container.prop('initialValues')).toEqual(INITIAL_STATE.initialValues)
  })
})
