// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import './actions/login.action'

Cypress.Commands.add('verificaToast', (mensagem) => {
  cy.get('.toast')
    .should('be.visible')
    .find('div[role="status"]')
    .should('have.text', mensagem)
})

Cypress.Commands.add('criarAgendamentosAPI', (profissional, agendamentos) => {
  // Deleta todos os agendamentos de um profissional da massa de testes
  cy.task('db:connect');
  cy.task('db:deleteMany', { matricula: profissional.matricula });
  cy.task('db:disconnect');

  // cadastra cada agendamento via API
  agendamentos.forEach((a) => {
    // Aqui ele faz o agendamento direto na API, sem usar o frontEnd. ELE CONSOME A API
    cy.request({
      method: 'POST',
      url: `${Cypress.env('baseApi')}/api/agendamentos`,
      statusCode: '201',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 3a8a9b8fae87baf503e7c5fe5b97fd72'
      }, // Aqui ele envia a massa de teste pro agendamento.
      body: {
        nomeCliente: a.usuario.nome,
        emailCliente: a.usuario.email,
        data: a.data,
        hora: a.hora,
        matricula: profissional.matricula,
        codigoServico: a.servico.codigo
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })
})