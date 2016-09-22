import extendComponentProps from '../extendComponentProps';
import {fromJS} from 'immutable';
import test from 'ava';

test('extend components props', t => {
  const builtProps = fromJS({
    children: 'Any children',
    decorated: 'Test',
    loading: false
  })
  const propsDefinition = fromJS({
    children: {
      description: '',
      required: true,
      type: {name: 'node'}
    },
    icon: {
      description: '',
      required: false,
      type: {name: 'element'}
    },
    decorated: {
      description: '',
      required: false,
      type: {name: 'node'}
    },
    onClick: {
      description: '',
      required: false,
      type: {name: 'func'}
    },
    options: {
      defaultValue: {computed: false, value: []},
      description: '',
      required: true
    },
    value: {
      description: '',
      required: false
    }
  })
  const extended = extendComponentProps(builtProps, propsDefinition)
  const arrayOfProps = [
    extended.getIn(['children', 'type']) === 'span',
    extended.getIn(['decorated', 'props', 'dangerouslySetInnerHTML', '__html']) === 'Test',
    extended.get('loading') === false,
    extended.get('icon') === '',
    extended.size === 4
  ]
  const result = arrayOfProps.reduce((acc, prop) => acc && prop, true)

  t.pass(result)
});
