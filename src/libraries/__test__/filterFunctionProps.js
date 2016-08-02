import filterFunctionProps from '../filterFunctionProps';
import test from 'ava';

test('filter function props', t => {
  const props = {
    width: 'full',
    disabled: true,
    size: 6,
    onClick: () => 'Test function'
  }
  const filteredProps = filterFunctionProps(props)
  const count = Object.keys(filteredProps).length
  const functionPropName = Object.keys(filteredProps)
    .reduce((acc, key) => {
      if (typeof filteredProps[key] === 'function')
        acc.push(key)
      return acc;
    }, [])
    .indexOf('Test function') === -1

  t.true(count === 3 && functionPropName)
});
