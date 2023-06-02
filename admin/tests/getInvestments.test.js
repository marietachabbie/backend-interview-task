
const {getInvestments} = require("../src/Utils")

test("Receives all investments", async function() {
  const investments = await getInvestments()
  expect(investments.length).toBe(7)
})
