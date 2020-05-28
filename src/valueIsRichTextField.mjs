import { isPlainObject } from 'lodash'

export default (value) => {
  return isPlainObject(value) && value.content
}
