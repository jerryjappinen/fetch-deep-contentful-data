import merge from 'lodash-es/merge'

export default (...objectMaps) => {
  return merge({}, ...objectMaps)
}
