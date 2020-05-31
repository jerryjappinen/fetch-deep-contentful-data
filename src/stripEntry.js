export default (entry) => {
  return {
    sys: {
      id: entry.sys.id,
      type: entry.sys.type,
      linkType: entry.sys.linkType
    }
  }
}
