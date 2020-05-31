import fetchList from './fetchList'
import fetchNestedReferences from './fetchNestedReferences'
import fetchNestedRichText from './fetchNestedRichText'

// FIXME: support multiple queries
const fetch = async (client, query) => {
  const initialResponse = await fetchList(client, query)
  const withNestedRichText = await fetchNestedRichText(client, initialResponse)

  return fetchNestedReferences(client, withNestedRichText)
}

export default async (client, ...queries) => {
  return Promise.all(queries.map((query) => {
    return fetch(client, query)
  }))
}
