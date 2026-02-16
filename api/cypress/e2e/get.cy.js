import { matricula, senha, agendamentos } from '../fixtures/agendamentos.json'

describe('GET /api/agendamentos', () => {

    before(() => {

        cy.postAgendamentos(matricula, agendamentos)
        cy.login(matricula,senha)

    });
    it('Deve listar os agendamentos do funcionário', () => {

        cy.api({
            method: 'GET',
            url: '/api/agendamentos',
            headers: { // Esse token se refere ao funcionário
                Authorization: `Bearer ${Cypress.env('token')}`

            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length(agendamentos.length)
            
            response.body.forEach((a, i)=>{  //o i vira um contador

                // compara o response com a massa de teste
                expect(a).to.deep.include({
                    nomeCliente: agendamentos[i].nomeCliente,
                    emailCliente: agendamentos[i].emailCliente,
                    data: agendamentos[i].data,
                    hora: agendamentos[i].hora,
                })
                expect(a.servico).to.deep.include({
                    nome: agendamentos[i].servicoNome,
                    preco: agendamentos[i].preco
                })
            })
        })





    });
});