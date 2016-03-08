export default function getComponentLink({mountPoint, name}) {
  return mountPoint ? `/${mountPoint}/${name}` : `/${name}`
}
