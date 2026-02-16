describe('POST /agendamentos/:id/lembrete', () => {

    beforeEach(() => {
        // autenticação com funcionário para solicitar o cancelamento
        cy.login('1005', 'pwd123')
    })

    context('Quando tenho um agendamento', () => {
        const agendamento = {
            nomeCliente: 'Miguel Dias',
            emailCliente: 'Dias@gmail.com',
            data: '10/01/2025',
            hora: '10:00',
            matricula: '1005',
            codigoServico: '2'
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


        it('Deve poder enviar um lembrete por email', () => {
            cy.log('ToDo')

            cy.api({
                method: 'POST',
                url: `/api/agendamentos/${agendamentoId}/lembrete`,  // ele usa o mongoose pra retornar um ID valido do mongoDB mas que não existe.
                failOnStatusCode: false,
                headers: { // Esse token se refere ao funcionário
                    Authorization: `Bearer ${Cypress.env('token')}`
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Lembrete enviado com sucesso')
            })


            // NÃO CONSEGUI FAZER verificar no banco
            // cy.task('db:connect').then(() => {
            //     cy.task('convertToObjectId', agendamentoId).then((id) => {
            //         cy.task('db:find', { collection: 'lembretes', filter: { agendamentoId: id } })
            //             .then((result) => {
            //                 cy.log(JSON.stringify(result)) // mostra o objeto
            //                 // expect(result.categoria).to.eq('Lembrete de Agendamento')
            //             })
            //     }).then(() => {
            //         cy.task('db:disconnect')
            //     })
            // })

        })


    })

});

