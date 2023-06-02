const mock = require("./mockReport.json")
const {generateReport, getFinCompanies, getInvestments} = require("../src/Utils")

test("Generates correct report", async function() {
  const companies = await getFinCompanies()
  const investments = await getInvestments()
  const reports = await generateReport([investments, companies[1]])

  expect(reports.length).toBe(12)
  expect(reports).toEqual(mock)
})
