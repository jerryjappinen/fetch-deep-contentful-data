import valueIsEntry from './valueIsEntry.mjs'

export default (value) => {
  return valueIsEntry(value) && value.sys.contentType
    ? value.sys.contentType.sys.id
    : null
}
