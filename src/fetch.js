import { filter, isPlainObject } from 'lodash'

import fetchList from './fetchList'
import fetchNestedReferences from './fetchNestedReferences'
import fetchNestedRichText from './fetchNestedRichText'

const fetch = async (client, query) => {
  const initialResponse = await fetchList(client, query)
  const withNestedRichText = await fetchNestedRichText(client, initialResponse)

  return fetchNestedReferences(client, withNestedRichText)
}

export default async (client, ...queries) => {
  // User wants to run multiple queries in parallel
  if (queries.length > 1) {
    // If user supplies other arguments, we ignore them
    // NOTE: this is why user can run only one query in array mode by calling fetch(client, query, true)
    const filteredQueries = filter(queries, isPlainObject)

    // Run queries in parallel
    return Promise.all(filteredQueries.map((query) => {
      return fetch(client, query)
    }))
  }

  // User only sent us one query
  return fetch(client, queries[0])
}
