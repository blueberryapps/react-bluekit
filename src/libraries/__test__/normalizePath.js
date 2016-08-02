import normalizePath from '../normalizePath';
import test from 'ava';

test('replace with \'\\\'', t => {
  const text = '\\folder\\folder\\file.js'
  const result = normalizePath(text, '\\')
  t.true(result === '/folder/folder/file.js')
});

test('replace without \'\\\'', t => {
  const text = 'folder/folder/file.js'
  const result = normalizePath(text)
  t.true(result === 'folder/folder/file.js')
});
