import parseHighlightedMenu from '../parseHighlightedMenu';
import test from 'ava';

test('parse highlighted', t => {
  const result = parseHighlightedMenu('<bstyle=\"color:red\">Text</b>')
  t.true(result === '<b style=\"color:red\">Text</b>')
});
