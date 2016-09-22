import Logo from '../../app/atoms/Logo.react';
import resolveComponent from '../resolveComponent';
import test from 'ava';

test('passed nothing', t => {
  const result = resolveComponent().name === 'InvalidComponent'
  t.true(result)
});

test('passed string', t => {
  const result = resolveComponent('test') === 'test'
  t.true(result)
});

test('passed function', t => {
  const result = resolveComponent(function testFunction() {}).name === 'testFunction'
  t.true(result)
});

test('passed component', t => {
  const result = resolveComponent(Logo) === Logo
  t.true(result)
});

test('passed object', t => {
  const result = typeof resolveComponent({asd: 'asd'}) === 'object'
  t.true(result)
});

test('passed object with default', t => {
  const result = resolveComponent({default: 'asd'}) === 'asd'
  t.true(result)
});
