import valueIsEntry from './valueIsEntry'

export default (value) => {
  return valueIsEntry(value) && value.sys.contentType
    ? value.sys.contentType.sys.id
    : null
}
