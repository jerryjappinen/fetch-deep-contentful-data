import { isString } from 'lodash'
import trimAllWhitespace from 'linna-util/lib/trimAllWhitespace'

expect.extend({
  // @ts-ignore
  toBeNonEmptyString (received) {
    return {
      pass: !!(received && isString(received) && trimAllWhitespace(received).length),
      message: received + ' is empty or not a string'
    }
  }
})
