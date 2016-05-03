export default function renderProp(key, type, value) {
  if (type === 'func') {
    return `${key}={() => alert('INSERT YOUR ${key} function')}`
  }
  else if (typeof value === 'object' || typeof value === 'boolean') {
    return `${key}={${JSON.stringify(value)}}`
  }
  else if (typeof value === 'number')
    return `${key}=${value}`
  else
    return `${key}='${value}'`
}
