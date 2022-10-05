import isPlainObject from 'lodash-es/isPlainObject'

export default (value) => {
  return isPlainObject(value) && value.content
}
