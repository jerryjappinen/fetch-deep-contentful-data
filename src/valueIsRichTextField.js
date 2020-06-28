import isPlainObject from 'lodash/isPlainObject'

export default (value) => {
  return isPlainObject(value) && value.content
}
