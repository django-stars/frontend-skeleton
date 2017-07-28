// Link.react-test.js
import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';
import renderer from 'react-test-renderer';

describe('components', function() {
  describe('<Dashboard />', function() {
    it('renders correctly', function() {
      var dashboard = renderer.create(<Dashboard />).toJSON();

      expect(dashboard).toMatchSnapshot();
      expect(dashboard.props.id).toEqual('dash')
    });

    it('should contain correct text inside', function() {
      const wrapper = shallow(<Dashboard />);
      const welcome = <h2>DASHBOARD</h2>;

      expect(wrapper.contains(welcome)).toEqual(true);
    });
  });
});
