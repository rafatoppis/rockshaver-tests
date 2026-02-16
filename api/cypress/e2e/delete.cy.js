describe('DELETE /agendamentos/:id', () => {

    beforeEach(() => {
        // autenticação com funcionário para solicitar o cancelamento
        cy.login('1004', 'pwd123')
    })

    context('Quando tenho um agendamento', () => {
        const agendamento = {
            nomeCliente: 'Daphne Blake',
            emailCliente: 'daphne@gmail.com',
            data: '10/01/2025',
            hora: '10:00',
            matricula: '1004',
            codigoServico: '4'
        }

        let agendamentoId;

        before(() => {

            cy.task('db:connect');
            cy.task('db:deleteMany', { matricula: agendamento.matricula });
            cy.task('db:disconnect');


            cy.postAgendamento(agendamento)
                .then((response) => {
                    expect(response.status).to.eq(201)
                    agendamentoId = response.body.agendamentoId
                })


        })


        it('Deve poder remover pelo ID', () => {
            cy.api({
                method: 'DELETE',
                url: `/api/agendamentos/${agendamentoId}`,  // ele usa o mongoose pra retornar um ID valido do mongoDB mas que não existe.
                headers: { // Esse token se refere ao funcionário
                    Authorization: `Bearer ${Cypress.env('token')}`
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Agendamento cancelado com sucesso')
            })
        })


    })
    it('Deve retornar 404 quando o agendamento não existe', () => {
        cy.deleteAgendamento().then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body.error).to.eq('Agendamento não encontrado')
        })
    })
});

