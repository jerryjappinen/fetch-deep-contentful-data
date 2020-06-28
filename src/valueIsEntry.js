import isPlainObject from 'lodash/isPlainObject'

// These guys are not always returned
// value.sys.contentType &&
// value.sys.contentType.sys &&
// value.sys.contentType.sys.linkType === 'ContentType'
export default (value) => {
  return isPlainObject(value) &&
    value.sys &&
    (
      value.sys.type === 'Entry' ||
      (
        value.sys.type === 'Link' &&
        value.sys.linkType === 'Entry'
      )
    )
}
