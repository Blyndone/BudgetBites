import React from 'react';
import renderer from 'react-test-renderer';
import Splash from '../src/components/Splash';

test('renders correctly', () => {
  const tree = renderer.create(<Splash />).toJSON();
  expect(tree).toMatchSnapshot();
});
