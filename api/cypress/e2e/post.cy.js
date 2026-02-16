describe('POST /api/agendamentos', () => {


  it('Deve criar um novo agendamento', () => {

    const body = {
      "emailCliente": "fernando@yahoo.com",
      "nomeCliente": "Fernando Papito",
      "data": "20/12/2024",
      "hora": "15:00",
      "matricula": "1001",
      "codigoServico": "1"
    }

    cy.task('db:connect');
    cy.task('db:deleteMany', { matricula: body.matricula });
    cy.task('db:disconnect');

    cy.postAgendamento(body)
      .should((response) => {  //promisse que retorna o response da API
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq('Agendamento criado com sucesso')
        expect(response.body.agendamentoId).to.match(/^[a-fA-F0-9]{24}$/)
      })
  })


  it('Deve retornar erro quando o agendamento é duplicado', () => {
    const body = {
      "emailCliente": "papito@yahoo.com",
      "nomeCliente": "Fernando Poapit",
      "data": "20/12/2024",
      "hora": "10:00",
      "matricula": "1002",
      "codigoServico": "2"
    }
    cy.task('db:connect');
    cy.task('db:deleteMany', { matricula: body.matricula });
    cy.task('db:disconnect');

    cy.postAgendamento(body)
      .should((response) => {  //promisse que retorna o response da API
        expect(response.status).to.eq(201)
      })

    // Duplicado pra testar a segunda vez se ta duplicado
    cy.postAgendamento(body)
      .should((response) => {  //promisse que retorna o response da API
        expect(response.status).to.eq(409) // 409 na docs significa que ja existe um agendamento
        expect(response.body.message).to.eq('Já existe um agendamento para esta data e hora. Por favor, escolha outro horário.')
      })
  })

  it('Deve retornar erro quando o email é inválido', () => {
    const body = {
      "emailCliente": "papito.yahoo.com",
      "nomeCliente": "Fernando Poapit",
      "data": "20/12/2024",
      "hora": "10:00",
      "matricula": "1002",
      "codigoServico": "2"
    }

    // SEM OPERAÇÃO NO BANCO DE DADOS, POIS A API PROCESSA ANTES DE SALVAR NO BD.

    cy.postAgendamento(body)
      .should((response) => {  //promisse que retorna o response da API
        expect(response.status).to.eq(400) // 400 na docs significa que ja existe um agendamento
        expect(response.body.error).to.eq('O campo emailCliente deve conter um email válido.')
      })
  })

  it('Deve retornar erro quando o funcionário não existe', () => {
    const body = {
      "emailCliente": "papito@yahoo.com",
      "nomeCliente": "Fernando Poapit",
      "data": "20/12/2024",
      "hora": "10:00",
      "matricula": "3452",
      "codigoServico": "2"
    }

    // SEM OPERAÇÃO NO BANCO DE DADOS, POIS A API PROCESSA ANTES DE SALVAR NO BD.

    cy.postAgendamento(body)
      .should((response) => {  //promisse que retorna o response da API
        expect(response.status).to.eq(404) // 400 na docs significa que ja existe um agendamento
        expect(response.body.error).to.eq('Funcionário não encontrado.')
      })
  })

  it('Deve retornar erro quando o servico não existe', () => {
    const body = {
      "emailCliente": "papito@yahoo.com",
      "nomeCliente": "Fernando Poapit",
      "data": "20/12/2024",
      "hora": "10:00",
      "matricula": "1001",
      "codigoServico": "10"
    }

    // SEM OPERAÇÃO NO BANCO DE DADOS, POIS A API PROCESSA ANTES DE SALVAR NO BD.

    cy.postAgendamento(body)
      .should((response) => {  //promisse que retorna o response da API
        expect(response.status).to.eq(404) // 400 na docs significa que ja existe um agendamento
        expect(response.body.error).to.eq('Serviço não encontrado para o código fornecido.')
      })
  })

  
  context('Campos Obrigatórios', () => {

    const camposObrigatorios = [
      { campo: "emailCliente", mensagem: 'O campo emailCliente é obrigatório.' },
      { campo: "nomeCliente", mensagem: 'O campo nomeCliente é obrigatório.' },
      { campo: "data", mensagem: 'O campo data é obrigatório.' },
      { campo: "hora", mensagem: 'O campo hora é obrigatório.' },
      { campo: "matricula", mensagem: 'O campo matricula é obrigatório.' },
      { campo: "codigoServico", mensagem: 'O campo codigoServico é obrigatório.' }
    ]

    // Para cada campo obrigatório vai rodar um teste case.
    camposObrigatorios.forEach((i)=>{
    it(`Deve retornar erro quando ${i.campo} é obrigatório`, () => {

      // Massa de teste
      const body = {
        "emailCliente": "joao@gmail.com",
        "nomeCliente": "Fernando Poapit",
        "data": "20/12/2024",
        "hora": "10:00",
        "matricula": "1001",
        "codigoServico": "1"
      }

      // Trick: vai deletar o campo que for ser testado.
      delete body[i.campo]

      cy.postAgendamento(body)
        .should((response) => {  //promisse que retorna o response da API
          expect(response.status).to.eq(400) // 400 na docs significa que ja existe um agendamento
          expect(response.body.error).to.eq(i.mensagem)
        })
    })
    })
  });
})


