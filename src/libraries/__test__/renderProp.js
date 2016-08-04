import renderProp from '../renderProp';
import test from 'ava';

test('passed func', t => {
  const result = renderProp('key', 'func', 'value')
  t.true(result === 'key={() => alert(\'INSERT YOUR key function\')}')
});

test('passed object', t => {
  const result = renderProp('key', 'object', {object: 'objectKey'})
  t.true(result === 'key={{\"object\":\"objectKey\"}}')
});

test('passed bool', t => {
  const result = renderProp('key', 'bool', true)
  t.true(result === 'key={true}')
});

test('passed element', t => {
  const result = renderProp('key', 'element', 'value')
  t.true(result === 'key={value}')
});

test('passed node', t => {
  const result = renderProp('key', 'node', 'value')
  t.true(result === 'key={value}')
});

test('passed number', t => {
  const result = renderProp('key', 'number', 6)
  t.true(result === 'key={6}')
});

test('passed everything else', t => {
  const result = renderProp('key', 'number', 'value')
  t.true(result === 'key=\"value\"')
});
