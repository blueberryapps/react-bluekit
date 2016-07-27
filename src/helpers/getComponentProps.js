export default function getComponentProps(definition, onlyRequired = false, override = {}) {
  return definition
    .filter((data, _) => !onlyRequired || onlyRequired && data.get('required'))
    .map((data, key) => data.get('defaultValue'))
}
