import fetchList from './fetchList.mjs'
import fetchNestedReferences from './fetchNestedReferences.mjs'
import fetchNestedRichText from './fetchNestedRichText.mjs'

export default async (client, query) => {
  const initialResponse = await fetchList(client, query)
  const withNestedRichText = await fetchNestedRichText(client, initialResponse)

  return fetchNestedReferences(client, withNestedRichText)
}
