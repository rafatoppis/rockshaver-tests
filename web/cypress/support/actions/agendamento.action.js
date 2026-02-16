// cypress/support/commands.js

// Passo: Iniciar agendamento
Cypress.Commands.add('iniciarAgendamento', () => {
    cy.contains('a', 'Agendar um horário').click()
})

// Passo: Escolhe o profissional
Cypress.Commands.add('escolherProfissional', (nomeProfissional) => {
    cy.contains('div', nomeProfissional)
        .parent()
        .click()
})

// Passo: Seleciona o serviço
Cypress.Commands.add('selecionarServico', (descricaoServico) => {
    cy.contains('div', descricaoServico)
        .parent()
        .click()
})

// Passo: escolher o dia do agendamento
Cypress.Commands.add('escolherDia', (dia) => {
    cy.contains('.dia-semana', dia).click()
})

// Passo: Escolher a hora do agendamento
Cypress.Commands.add('escolherHora', (hora) => {
    cy.contains('.hora-opcao', hora).click()
})

// Passo: Finaliza agendamento
Cypress.Commands.add('finalizarAgendamento', () => {
    cy.contains('button', 'Confirmar e reservar').click()
})
