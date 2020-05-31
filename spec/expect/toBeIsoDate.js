expect.extend({
  // @ts-ignore
  toBeIsoDate (received) {
    // This regexp checks for formatting
    if (
      !/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(received)
    ) {
      return {
        pass: false,
        message: `Expected ${received} to be a valid ISO date string`
      }
    }

    // This checks if JS can correctly parse it
    const d = new Date(received)
    return d.toISOString() === received
      ? {
        pass: true,
        message: `Expected ${received} not to be a valid ISO date string`
      }
      : {
        pass: false,
        message: `Expected ${received} to be a valid ISO date string`
      }
  }
})
