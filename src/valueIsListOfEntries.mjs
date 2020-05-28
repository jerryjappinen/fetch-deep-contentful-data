import { isArray } from 'lodash'

import valueIsEntry from './valueIsEntry.mjs'

export default (value) => {
  return isArray(value) &&
    value.length &&
    valueIsEntry(value[0])
}
