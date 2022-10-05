import isArray from 'lodash-es/isArray'

import valueIsEntry from './valueIsEntry'

export default (value) => {
  return isArray(value) &&
    value.length &&
    valueIsEntry(value[0])
}
