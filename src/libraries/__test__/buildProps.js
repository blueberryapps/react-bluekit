import buildProps from '../buildProps';
import test from 'ava';

test('build props', t => {
  const props = {
    anyProp: {type: {name: 'any'}, required: false},
    nodeProp: {type: {name: 'node'}, required: false},
    stringPropDefault: {type: {name: 'string'}, required: true, defaultValue: {value: '\'text\'', computed: true}},
    stringPropDefaultFalse: {type: {name: 'string'}, required: true, defaultValue: {value: '\'text\'', computed: false}},
    stringProp: {type: {name: 'string'}, required: true},
    boolProp: {type: {name: 'bool'}, required: false},
    numberProp: {type: {name: 'number'}, required: false},
    arrayProp: {type: {name: 'array'}, required: false},
    objectProp: {type: {name: 'object'}, required: false},
    funcProp: {type: {name: 'func'}, required: false},
    enumProps: {type: {name: 'enum', value: 'asd'}, required: false},
    shapeProps: {type: {name: 'shape', value: {deepValue: 'asd', Qww: 'qwert'}}, required: false},
    arrayOfProp: {type: {name: 'arrayOf', value: {nextValue: 'asd', PPoo: 'pppp'}}, required: false},
  }

  const builtProps = buildProps(props, true)
  const arrayOfProps = [
    builtProps.arrayOfProp instanceof Array,
    typeof builtProps.objectProp === 'object',
    builtProps.nodeProp === 'NODE nodeProp',
    typeof builtProps.funcProp === 'function',
    typeof builtProps.numberProp === 'number' && builtProps.numberProp === 1,
    builtProps.stringPropDefault === '\'text\'',
    builtProps.boolProp === true || false,
    typeof builtProps.enumProps === 'string',
    typeof builtProps.shapeProps === 'object',
    builtProps.anyProp === 'ANY anyProp',
    builtProps.stringProp === 'stringProp',
    builtProps.stringPropDefaultFalse === 'text',
    builtProps.arrayProp instanceof Array
  ]
  const result = arrayOfProps.reduce((acc, prop) => acc && prop, true)

  t.true(result)
})
