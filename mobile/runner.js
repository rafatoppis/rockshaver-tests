const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');


const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjcyMWNhMmZjLWVjNWEtNDU5NC05Yjk4LWZmNTU4N2E0Y2Y0Ni0xNzcxMjgwMTQxMzY1IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiOGM2NWY1OWMtOTQwZC00ODRjLTljNzEtMzJjMmYxYmMyZGZjIiwidHlwZSI6InQifQ.CbeAjsXh17h9FCzNV5mkZsRZTyPSiwiEWAUe1JXCHgU'
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