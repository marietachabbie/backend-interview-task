const R = require("ramda")
const axios = require("axios")

module.exports.getInvestments = async (res) => {
  try {
    const investmentsURL = "http://localhost:8081/investments"
    const investments = await axios.get(investmentsURL)
    return investments.data
  } catch (err) {
    res.status(500).send({
      message: err.message,
    })
  }
}

module.exports.getFinCompanies = async (investments) => {
  const companiesURL = "http://localhost:8082/companies"
  const companies = await axios.get(companiesURL)
  return [investments, companies.data]
}

module.exports.generateReport = ([investments, companies]) => {
  const report = []
  // flatten holdings and collect raw data
  R.forEach((investment) => {
    R.forEach((holding) => {
      report.push({
        id: holding.id,
        investmentTotal: investment.investmentTotal,
        investmentPercentage: holding.investmentPercentage,
        user: investment.userId,
        firstName: investment.firstName,
        lastName: investment.lastName,
        date: investment.date,
      })
    }, investment.holdings)
  }, investments)

  // add company name and calculate holding value
  R.forEach((holding) => {
    const company = companies.filter(comp => comp.id === holding.id)
    holding.holding = company[0].name
    holding.value = holding.investmentPercentage * holding.investmentTotal
  }, report)

  // rm unnecessary keys
  R.forEach(holding => {
    delete holding.investmentTotal
    delete holding.investmentPercentage
    delete holding.id
  }, report)

  return report
}

module.exports.exportReport = async (report) => {
  const exportURL = "http://localhost:8081/investments/export"
  await axios.post(exportURL, report, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  return report
}

module.exports.logReport = async (report) => {
  console.table(report)
}
