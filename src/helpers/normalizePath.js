import path from 'path';

export default function normalizePath(str) {
  if (path.sep === '\\') {
    str = str.replace(/\\/g, '/');
  }
  return str;
}
