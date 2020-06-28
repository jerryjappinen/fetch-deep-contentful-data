import merge from 'lodash/merge'

export default (...objectMaps) => {
  return merge({}, ...objectMaps)
}
