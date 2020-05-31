import mergeObjectMaps from '../src/mergeObjectMaps'

describe('mergeObjectMaps', () => {
  it('foo', () => {
    const merged = mergeObjectMaps(
      {
        foo: {
          id: 123
        }
      },
      {
        bar: {
          id: 345
        }
      }
    )
    expect(merged.foo).toBeTruthy()
    expect(merged.foo.id).toEqual(123)
    expect(merged.bar).toBeTruthy()
    expect(merged.bar.id).toEqual(345)
  })
})
