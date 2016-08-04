import path from 'path';

export default function normalizePath(str, separator = path.sep) {
  if (separator === '\\') {
    str = str.replace(/\\/g, '/');
  }
  return str;
}
