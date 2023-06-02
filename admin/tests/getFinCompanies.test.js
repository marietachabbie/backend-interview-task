const {getFinCompanies} = require("../src/Utils")

test("Receives all financial companies", async function() {
  const data = await getFinCompanies()
  expect(data.length).toBe(2)
  expect(data[1].length).toBe(3)
})
