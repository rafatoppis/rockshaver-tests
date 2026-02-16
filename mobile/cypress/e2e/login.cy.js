describe('Login', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('/')

    cy.contains('p', 'Faça login com a sua conta')
      .should('be.visible')
  });

  it('Deve logar como barbeiro', () => {
    const funcionario = {
      matricula: '1007',
      senha: 'pwd123',
      nome: 'Slash'
    }
    cy.login(funcionario)
    cy.verificaUsuarioLogado(funcionario)
  })


  it('Não deve logar com senha inválida', () => {
    const funcionario = {
      matricula: '1008',
      senha: 'gdlsfkjg320', // senha errada
      nome: 'Kurt'
    }
    cy.login(funcionario)

    // Usado só pra pegar o html em tempo real pra saber qual elemento buscar.
    // cy.wait(1000)
    // cy.document().then((doc) => {
    //   const codigoHtml = doc.documentElement.outerHTML // traz o código HTML completo em tempo de execução
    //   cy.writeFile('temp.html', codigoHtml)  // gera um arquivo com o codigoHtml
    // })

    cy.verificaToast('Falha ao realizar login. Verifique suas credenciais.')
  })



  it('Não deve logar com matricula inválida', () => {
    const funcionario = {
      matricula: '1010',
      senha: 'afsgasçldkjf234908', // senha errada
    }
    cy.login(funcionario)
    cy.verificaToast('Falha ao realizar login. Verifique suas credenciais.')

  })


  it('Não deve logar com campo vazio', () => {

    // sem massa

    cy.get('form').submit()  //acha o form e submit
    cy.verificaToast('Informe sua matrícula e sua senha!')

  })
})