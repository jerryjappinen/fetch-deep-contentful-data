import { describe, it, expect } from 'vitest'

import isPlainObject from 'lodash/isPlainObject'
import uniq from 'lodash/uniq'
import values from 'lodash/values'

import extractNestedEntries from '../src/extractNestedEntries'

import contentfulObject2 from './data/contentfulObject2'
import contentfulObject3 from './data/contentfulObject3'

describe('extractNestedEntries', () => {
  const extracted = extractNestedEntries(contentfulObject3)

  const ids = uniq([
    contentfulObject3.sys.id,
    contentfulObject3.fields.parent.sys.id,
    contentfulObject3.fields.parents[0].sys.id,
    contentfulObject3.fields.parents[1].sys.id,
    contentfulObject2.fields.child.sys.id
  ])

  it('is an object', () => {
    expect(isPlainObject(extracted)).toBeTruthy()
  })

  it('has the right amount of entries', () => {
    expect(values(extracted).length).toEqual(ids.length)

    ids.forEach((id) => {
      expect(extracted[id]).toBeTruthy()
    })
  })
})
