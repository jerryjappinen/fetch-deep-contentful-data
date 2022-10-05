import isArray from 'lodash-es/isArray'

import mergeObjectMaps from './mergeObjectMaps'
import stripEntry from './stripEntry'
import valueIsEntry from './valueIsEntry'
import valueIsListOfEntries from './valueIsListOfEntries'

const extractFromOneEntry = (inputEntry) => {
  // End result: all entries in one flat map by ID
  let entriesById = {}

  const mainEntry = {
    ...inputEntry
  }

  if (mainEntry.fields) {
    // Find all children recursively
    for (const fieldName in mainEntry.fields) {
      const fieldValue = mainEntry.fields[fieldName]

      // Multiple nested child
      if (valueIsListOfEntries(fieldValue)) {
        fieldValue.forEach((childEntry, i) => {
          // Merge each child
          entriesById = mergeObjectMaps(entriesById, extractFromOneEntry(childEntry))

          // Remove nesting for main item
          mainEntry.fields[fieldName][i] = stripEntry(childEntry)
        })

        // Lone nested child
      } else if (valueIsEntry(fieldValue)) {
        entriesById = mergeObjectMaps(entriesById, extractFromOneEntry(fieldValue))

        // We have the children, let's remove the nesting
        mainEntry.fields[fieldName] = stripEntry(fieldValue)
      }
    }
  }

  // Add main entry to the result map
  entriesById[mainEntry.sys.id] = mainEntry

  return entriesById
}

export default (entries) => {
  // Support calling this with a list of items or one entry
  const normalizedEntries = (isArray(entries) ? entries : [entries])

  let objectMap = {}
  normalizedEntries.forEach((entry) => {
    objectMap = mergeObjectMaps(objectMap, extractFromOneEntry(entry))
  })

  return objectMap
}
