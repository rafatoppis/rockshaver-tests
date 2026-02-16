import calendario from '../fixtures/calendario.json'
import agendamentos from '../fixtures/agendamentos.json'

describe('Agendamento', () => {

    // Trava o calendário usando intercept
    beforeEach(() => {
        // NO intercept da pra usar caminho relativo **, ele vai interceptar uma rota
        // tque terminar com /api/calendario
        cy.intercept('GET', '**/api/calendario', {
            statusCode: 200,
            body: calendario
        }).as('getCalendario')
    })

    it('Deve fazer um novo agendamento', function () {

        const agendamento = agendamentos.sucesso


        // drop dados de testes dessa massa!
        cy.task('db:connect');
        cy.task('db:deleteMany', { emailCliente: agendamento.usuario.email });
        cy.task('db:disconnect');



        // cy.start(agendamento.usuario)
        // cy.verify(agendamento.usuario)

        cy.preCadastroLS(agendamento.usuario)

        cy.iniciarAgendamento()
        cy.escolherProfissional(agendamento.profissional.nome)
        cy.selecionarServico(agendamento.servico.descricao)
        cy.escolherDia(agendamento.dia)
        cy.escolherHora(agendamento.hora)
        cy.finalizarAgendamento()

        cy.get('h3').should('be.visible')
            .should('have.text', 'Tudo certo por aqui! Seu horário está confirmado.')
    })

    it('Deve mostrar o slot ocupado', function () {


        const agendamento = agendamentos.duplicado;

        // drop da massa criada no banco
        cy.task('db:connect');
        cy.task('db:deleteMany', { emailCliente: agendamento.usuario.email });
        cy.task('db:disconnect');

        // Aqui ele faz o agendamento direto na API, sem usar o frontEnd. ELE CONSOME A API
        cy.agendamentoAPI(agendamento)  // Custom Commands criada

        // cy.start(agendamento.usuario)
        // cy.verify(agendamento.usuario)

        cy.preCadastroLS(agendamento.usuario)

        cy.iniciarAgendamento()
        cy.escolherProfissional(agendamento.profissional.nome)
        cy.selecionarServico(agendamento.servico.descricao)
        cy.escolherDia(agendamento.dia)

        cy.get(`[slot="${agendamento.hora} - ocupado"]`)
            .should('be.visible')
            .find('svg')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(255, 255, 255)')
    })

    it('Deve retornar uma notificação no Sumário em caso de conflito de disponibilidade', function () {

        const agendamento = agendamentos.conflito;

        // drop da massa criada no banco
        cy.task('db:connect');
        cy.task('db:deleteMany', { emailCliente: agendamento.usuario.email });
        cy.task('db:disconnect');


        // cy.start(agendamento.usuario)
        // cy.verify(agendamento.usuario)

        cy.preCadastroLS(agendamento.usuario)

        cy.iniciarAgendamento()
        cy.escolherProfissional(agendamento.profissional.nome)
        cy.selecionarServico(agendamento.servico.descricao)
        cy.escolherDia(agendamento.dia)
        cy.escolherHora(agendamento.hora)

        // Aqui ele faz o agendamento direto na API, agora ignorando tudo que foi em cima até o momento.
        // meio que ta simulando uma outra pessoa, em outro lugar fazendo um agendamento no mesmo horário.
        cy.agendamentoAPI(agendamento)  // Custom Commands criada

        cy.finalizarAgendamento();

        cy.get('.alert-error')
            .should('be.visible')
            .and('have.text', 'Já existe um agendamento para esta data e hora. Por favor, escolha outro horário.')
    })

})
