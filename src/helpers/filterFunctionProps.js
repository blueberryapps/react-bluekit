export default function filterFunctionProps(props) {
  return Object
    .keys(props)
    .filter(key => typeof props[key] !== 'function')
    .reduce((acc, key) => ({...acc, [key]: props[key]}), {})
}
