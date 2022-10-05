import cloneDeep from 'lodash-es/cloneDeep'
import isArray from 'lodash-es/isArray'
import keyBy from 'lodash-es/keyBy'
import uniq from 'lodash-es/uniq'

import fetchList from './fetchList'
import valueIsEntry from './valueIsEntry'
import valueIsListOfEntries from './valueIsListOfEntries'

// Fetch nested object fields automatically
// Any linked objects within Linked and embedded objects only contain `.sys`, not `.fields`. This makes it impossible to fully render linked objects, since the data is not nested deeply enough for our purposes.
//
// For example: Blog article has links `Topics` and `Profiles`. When a page links to a blog article, the topics are not returned fully. If we want to render a blog article as page content, we can only render the core blog article data, not data on linked fields (like authors and topics).
//
// We could relatively easily do the following however:
// - Go through each value of each returned resource, to see if it might be a child resource
// - If it is, then, see if this child resource might have further child resources
// - If any is found, see if they're unresolved
// - If they are, store the id and content type to be fetched
// - Collect IDs of unresolved resources
// - Fire additional requests (one per content type?)
// - Merge results so that nested objects on the 2nd level will get their `.fields`

// This will basically artificially increase the nesting level by 2. Makes queries a bit slower but it's ok for our purposes (things are cached and change infrequently). Contentful's GraphQL API is still in beta so we do this as a simple but adequate solution.

// List of IDs by content type
// Map of query results
// {
//   items: [ // 1
//     {
//       sys: { ... }, <- // content type information is here
//       fields: {
//         title: 'Foo bar',
//         components: [ // Level 2
//           {
//             sys: { ... },
//             fields: {
//               topic: {
//                 sys: { ... } <- // content type information is here
//                 // <- no `fields`
//               }
//             }
//           }
//         ]
//       }
//     }
//   ]
// }

// References

const getUnresolvedChildIdsByContentType = (response) => {
  const unresolvedChildren = []

  walkUnresolvedChildren(response, (child) => {
    unresolvedChildren.push(child.sys.id)
  })

  return unresolvedChildren
}

const injectFieldsIntoNestedChildren = (response, dataById) => {
  const responseWithInjected = cloneDeep(response)

  walkUnresolvedChildren(responseWithInjected, (child) => {
    // eslint-disable-next-line no-param-reassign
    child.fields = cloneDeep(dataById[child.sys.id].fields)
  })

  return responseWithInjected
}

const walkUnresolvedChildren = (response, callback) => {
  // Looping through resources on base level
  if (response.items && response.items.length) {
    response.items.forEach((resource) => {
      // Could be any content type at this point, under any key depending on Contentful setup
      // E.g. list of any content types under `components` of a `page`
      // E.g. list of `profile` under `author` of a `blogArticle`
      for (const fieldName in resource.fields) {
        const fieldValue = resource.fields[fieldName]

        // We only care about this field if it is a nested entry
        if (
          valueIsEntry(fieldValue) ||
          valueIsListOfEntries(fieldValue)
        ) {
          // Let's normalize this
          // We don't care about the structure but are only crawling for IDs
          const children = isArray(fieldValue) ? fieldValue : [fieldValue]

          // Starting to look for the next level of children (level 2)
          // These guys will still have their `fields`, but no resolved children of their own
          // FIXME: duplication at this point, would be better to do recursion
          children.forEach((childResource) => {
            for (const childFieldName in childResource.fields) {
              const childFieldValue = childResource.fields[childFieldName]

              if (
                valueIsEntry(childFieldValue) ||
                valueIsListOfEntries(childFieldValue)
              ) {
                const nestedChildren = isArray(childFieldValue) ? childFieldValue : [childFieldValue]

                // Now we should have a list of unresolved children
                nestedChildren.forEach((nestedChildResource) => {
                  if (!nestedChildResource.fields) {
                    callback(nestedChildResource)
                  }
                })
              }
            }
          })
        }
      }
    })
  }

  return response
}

// Fetch deeper children for nested references of a Contentful response's items
export default async (client, response) => {
  // Embedded children in references
  const unresolvedChildIds = uniq(getUnresolvedChildIdsByContentType(response))
  if (unresolvedChildIds && unresolvedChildIds.length) {
    const additionalResults = await fetchList(client, {
      'sys.id[in]': unresolvedChildIds.join(',')
    })

    if (
      additionalResults &&
      additionalResults.items &&
      additionalResults.items.length
    ) {
      const childrenToInject = keyBy(additionalResults.items, 'sys.id')

      // Inject additional results to core results
      return injectFieldsIntoNestedChildren(response, childrenToInject)
    }
  }

  return response
}
