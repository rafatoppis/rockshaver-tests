import preRegPage from "../support/pages/pre-reg.page"
import homePage from "../support/pages/home.page"
// import header from "../support/pages/components/header"  -- não preciso importar devido a classe constructor que eu usei

// Actions padrão
import prereg from "../support/actions/prereg"

describe('Login', () => {

  it('Deve fazer o pré-cadastro', () => {

    const usuario = {
      nome: 'Fernando Papito',
      email: 'papito@gmail.com'
    }


    // 1º MODELO = PAGE OBJECTS
    // homePage.go()
    // homePage.header.goToPreReg()
    // preRegPage.fillForm('Fernando Papito', 'rafa@gmail.com')
    // preRegPage.submit()
    // homePage.header.verifyPreReg('Fernando', 'rafa@gmail.com')

    // 2º MODELO = ACTIONS
    // prereg.start('Fernando Papito', 'papito@gmail.com')
    // prereg.verify('Fernando', 'papito@gmail.com')

    // 3º MODELO = CUSTOM COMMANDS
    cy.start(usuario)
    cy.verify(usuario)

  })

  it('Campos Obrigatórios', () => {

    // MODELO PAGE OBJECTS
    // homePage.go()
    // homePage.header.goToPreReg()
    // preRegPage.submit()
    // preRegPage.alerthave('Nome Completo', 'O campo nome é obrigatório.')
    // preRegPage.alerthave('E-mail', 'O campo e-mail é obrigatório.')

    // ACTIONS
    // prereg.start() // Não precisa passar argumento vazio, pois na função ja foi definido a variavel como vazio
    // prereg.alert('Nome Completo', 'O campo nome é obrigatório.')
    // prereg.alert('E-mail', 'O campo e-mail é obrigatório.')

    // CUSTOM COMMANDS
    cy.start()
    cy.alert('Nome Completo', 'O campo nome é obrigatório.')
    cy.alert('E-mail', 'O campo e-mail é obrigatório.')

  })

  it('Não deve fazer cadastro com o primeiro nome', () => {

    const usuario = {
      nome: 'Fernando',
      email: 'papito@gmail.com'
    }


    // MODELO PAGE OBJECTS
    // homePage.go()
    // homePage.header.goToPreReg()
    // preRegPage.fillForm('Fernando', 'rafa@gmail.com')
    // preRegPage.submit()
    // preRegPage.alerthave('Nome Completo', 'Informe seu nome completo.')

    // Actions
    // prereg.start('Fernando', 'rafa@gmail.com')
    // prereg.alert('Nome Completo', 'Informe seu nome completo.')

    // CUSTOM COMMANDS
    cy.start(usuario)
    cy.alert('Nome Completo', 'Informe seu nome completo.')
  })

  it('Email Incorreto', () => {

    const usuario = {
      nome: 'Fernando Papito',
      email: 'papito.gmail.com'
    }

    // MODELO PAGE OBJECTS
    // homePage.go()
    // homePage.header.goToPreReg()
    // preRegPage.fillForm('Fernando Papito', 'rafa.gmail.com')
    // preRegPage.submit()
    // preRegPage.alerthave('E-mail', 'O e-mail inserido é inválido.')

    // Actions
    // prereg.start('Fernando', 'rafa.gmail.com')
    // prereg.alert('E-mail', 'O e-mail inserido é inválido.')

    // CUSTOM COMMANDS
    cy.start(usuario)
    cy.alert('E-mail', 'O e-mail inserido é inválido.')

  })
})