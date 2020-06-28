import cloneDeep from 'lodash/cloneDeep'
import filter from 'lodash/filter'
import keyBy from 'lodash/keyBy'
import uniq from 'lodash/uniq'

import fetchList from './fetchList'
import { isCustomEntry } from './richTextType'
import valueIsRichTextField from './valueIsRichTextField'

const getEmbeddedIds = (response) => {
  const ids = []

  walkRichTextFields(response, (field) => {
    // Only consider nodes that are custom entries
    const richTextEntries = filter(field.content, (node) => {
      return isCustomEntry(node.nodeType)
    })

    // Store IDs of custom entries
    richTextEntries.forEach((richTextEntry) => {
      ids.push(richTextEntry.data.target.sys.id)
    })
  })

  return ids
}

const injectFieldIntoNodeContent = (response, dataById) => {
  const responseWithInjected = cloneDeep(response)

  walkRichTextFields(responseWithInjected, (field) => {
    field.content.forEach((node) => {
      if (isCustomEntry(node.nodeType)) {
        // If node is custom entry, replace data if we have it
        const customNodeId = node.data.target.sys.id
        if (dataById[customNodeId]) {
          // FIXME: not great
          // eslint-disable-next-line no-param-reassign
          node.data.target = cloneDeep(dataById[customNodeId])
        }
      }
    })
  })

  return responseWithInjected
}

const walkRichTextFields = (response, callback) => {
  response.items.forEach((resource) => {
    walkRichTextFieldsInResource(resource, callback)
  })
}

const walkRichTextFieldsInResource = (resource, callback) => {
  for (const fieldName in resource.fields) {
    const fieldValue = resource.fields[fieldName]
    if (valueIsRichTextField(fieldValue)) {
      callback(fieldValue)
    }
  }
}

// Supercharge Contentful response items' rich text field with deeper child values
export default async (client, response) => {
  // Embedded children in rich text
  // FIXME: this should be recursive but is not
  const embeddedIdsInRichText = uniq(getEmbeddedIds(response))
  if (embeddedIdsInRichText && embeddedIdsInRichText.length) {
    const additionalResults = await fetchList(client, {
      'sys.id[in]': embeddedIdsInRichText.join(',')
    })

    if (
      additionalResults &&
      additionalResults.items &&
      additionalResults.items.length
    ) {
      const richTextChildrenToInject = keyBy(additionalResults.items, 'sys.id')
      return injectFieldIntoNodeContent(response, richTextChildrenToInject)
    }
  }

  return response
}
