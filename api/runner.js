const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjcyMWNhMmZjLWVjNWEtNDU5NC05Yjk4LWZmNTU4N2E0Y2Y0Ni0xNzcxMjc5ODQwMTMyIiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiYjM2M2U2MTItNGEzOC00YmRjLThmMWMtYmY1OGI0NjY5NzVjIiwidHlwZSI6InQifQ.FpGjHy0mbIEdgHzZgcTvbiq9Z6coF2HSq81qXEbIL7w'
cypress.run({
  // specs to run here
})
.then((results) => {
  const args = {
    target: TOKEN,
  }
  tesults.results(results, args);
})
.catch((err) => {
 console.error(err)
})