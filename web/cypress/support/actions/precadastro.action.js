Cypress.Commands.add('start', (usuario) => {
    cy.visit('/')
    cy.get('header nav a[href="pre-cadastro"]')
        .click()
    cy.get('form h2')
        .should('be.visible')
        .and('have.text', 'Seus dados')

    cy.get('input[name="fullname"]').as('fullname')
    cy.get('input[name="email"]').as('email')

    // ? É o mesmo que usar usuario = ''
    if (usuario?.nome) {
        cy.get('@fullname').type(usuario.nome)
    }

    if (usuario?.email) {
        cy.get('@email').type(usuario.email)
    }


    cy.contains('button[type=submit]', 'Continuar')
        .click()
})


Cypress.Commands.add('verify', (usuario = '') => {
    cy.get('.usuario-nome')
        .should('be.visible')
        .and('have.text', 'Olá, ' + usuario.nome.split(' ')[0])   // pega o primeiro nome

    cy.get('.usuario-email')
        .should('be.visible')
        .and('have.text', usuario.email)

    // a função callback vc tem acesso ao 'contexto' da função.
    // Validação do Local Storage do navegador
    cy.window().then((win) => {
        const chaveUsuario = win.localStorage.getItem('usuario')
        expect(chaveUsuario).to.eql(JSON.stringify(usuario))
        // tem que converter pra String pq o objeto 
        // no localStorage na vdd é um string
    })
})


//setar um usuário no local storage, fazendo pre cadastro via local storage.
Cypress.Commands.add('preCadastroLS', (usuario) => {
    cy.window().then((win) => {
        win.localStorage.setItem('usuario', JSON.stringify(usuario))
        cy.visit('/')
        cy.contains(usuario.email)
            .should('be.visible')
    })
})

Cypress.Commands.add('alert', (fieldname, text) => {
    cy.contains('label', fieldname)
        .parent()
        .find('.alert-msg')
        .should('be.visible')
        .and('have.text', text)

})

