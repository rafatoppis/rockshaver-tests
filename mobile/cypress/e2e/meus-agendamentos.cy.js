import { profissional, agendamentos } from '../fixtures/agendamentos.json' // isso Importa os objetos

describe('Meus agendamentos', () => {
    before(() => {
        cy.criarAgendamentosAPI(profissional, agendamentos)
    })

    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('/')

        cy.contains('p', 'Faça login com a sua conta')
            .should('be.visible')

        cy.login(profissional)
        cy.verificaUsuarioLogado(profissional)
    });

    it('Deve exibir os meus agendamentos', () => {
        cy.get('ul li')
            .should('be.visible')
            .and('have.length', agendamentos.length) // pega o .json agendamentos e compara o lenght do .json com o do website.
            .each(($li, i) => {
                const agendamento = agendamentos[i]
                const resultado = `${agendamento.servico.descricao} no dia ${agendamento.data} às ${agendamento.hora}`

                cy.wrap($li)  //obtem propriedades de elementos da página
                    .invoke('text') // pega a texto
                    .should('contain', agendamento.usuario.nome) // vai comparando o nome de cada cliente baseado na massa de teste.
                    .and('contain', resultado)
            })
    })

    it("Deve cancelar um agendamento", () => {
        const agendamento = agendamentos.find(x => x.usuario.email === 'peter.parker@dailybugle.com')

        cy.contains('ul li', agendamento.usuario.nome)
            .as('agendamentoItem') // Guarda como um alias


        cy.get('@agendamentoItem')  // usa o alias
            .should('be.visible').click()

        cy.contains('span', 'Cancelar agendamento')
            .should('be.visible')
            .click()

        cy.verificaToast('Agendamento cancelado com sucesso!')

        cy.get('@agendamentoItem')  // usa o alias
            .should('not.exist')
    })


        it("Deve enviar uma solicitação de lembrete", () => {
        const agendamento = agendamentos.find(x => x.usuario.email === 'thor.odinson@asgard.com')

        cy.contains('ul li', agendamento.usuario.nome)
            .as('agendamentoItem') // Guarda como um alias


        cy.get('@agendamentoItem')  // usa o alias
            .should('be.visible').click()

        cy.contains('span', 'Enviar lembrete por e-mail')
            .should('be.visible')
            .click()

        cy.verificaToast('Lembrete enviado com sucesso!')
    })
});


