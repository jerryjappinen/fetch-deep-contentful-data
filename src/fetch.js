import fetchList from './fetchList'
import fetchNestedReferences from './fetchNestedReferences'
import fetchNestedRichText from './fetchNestedRichText'

export default async (client, query) => {
  const initialResponse = await fetchList(client, query)
  const withNestedRichText = await fetchNestedRichText(client, initialResponse)

  return fetchNestedReferences(client, withNestedRichText)
}
