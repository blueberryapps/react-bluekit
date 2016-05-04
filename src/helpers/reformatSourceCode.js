export function packSourceCode(text) {
  return text.replace(/`/g, '"BACKTICK"').replace(/\$\{/g, '"ESINSERTION"');
}

export function unpackSourceCode(text) {
  return text.replace(/"BACKTICK"/g, '`').replace(/"ESINSERTION"/g, '${');
}
