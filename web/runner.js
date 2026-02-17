const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');


const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjcyMWNhMmZjLWVjNWEtNDU5NC05Yjk4LWZmNTU4N2E0Y2Y0Ni0xNzcxMjg5MzU2NzY4IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiMzY0MDNiZDUtY2I3MS00ZTVlLWE4MTEtMWM2NjQ3NDkzNzA1IiwidHlwZSI6InQifQ.any-k6dHmEIMHYBRRWrfQEZhhRDFNmO5G1vYtGC1FzI'
cypress.run({
  // specs to run here
  browser: 'chrome'
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