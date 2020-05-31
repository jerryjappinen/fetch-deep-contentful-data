import { merge } from 'lodash'

export default (...objectMaps) => {
  return merge({}, ...objectMaps)
}
