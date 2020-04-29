
module.exports = (app) => {

    /**
     * Tela de Login
     * Autalmente está cadastrando um admin caso tabela usuario esteja vazia
     */
    app.route('/login')
        .post(app.routes.login_management.setAdmin)

    /**
     * Tela Principal
     * @param get: Lista todos os emprestimos realizados pelo usuario logado
     */
    app.route('/principal') 
        .get(app.routes.lending_management.findMain)
    
    /**
     * Tela de administração do usuario - LISTA
     * @param get: Mostra lista de usuários cadastrados, somente administrador
     * Tela de manutenção do usuario - CADASTRO
     * @param post: Botão confirmar da tela de cadastro do usuario, somente administrador
     * @param put:  Altera usuario id, somente administrador
     * @param delete: Deleta usuario id, somente administrador
     */
    app.route('/usuario_manutencao')
        .get(app.routes.user_maintenance.findAll)
        .post(app.routes.user_maintenance.create)  
    app.route('/usuario_manutencao/:id')   
        .put(app.routes.user_maintenance.change) 
        .delete(app.routes.user_maintenance.delete) 
    /**
     * Tela de administração da literatura - LISTA
     * @param get: Mostra lista de literaturas cadastradas, somente administrador
     * Tela de manutenção da literatura - CADASTRO
     * @param post: Botão confirmar da tela de cadastro da literatura
     * @param put: Altera obra id
     * @param delete: Deleta obra id
     */
    app.route('/obra_manutencao')
        .get(app.routes.books_maintenance.findAll)
        .post(app.routes.books_maintenance.create)
    app.route('/obra_manutencao/:id')   
        .put(app.routes.books_maintenance.change) 
        .delete(app.routes.books_maintenance.delete) 

    /**
     * Tela ou Modal que deve conter:
     * @param post: input com botão de confirmar para cadastrar um nome de autor
     * @param get: abaixo do cadastro deve conter um grid com todos os autores
     * cadastrados e deve ser possivel filtrar e selecionar para anexar ao cadastro da obra.
     */
    app.route('/autor')
        .get(app.routes.author_maintenance.findAll)
        .post(app.routes.author_maintenance.create)      
         
    /**
     * Tela de devolução - CADASTRO
     * @param post: Quando clicado no botão confirmar é feito a devolução 
     * alterando as colunas: 
     * data_devolucao 
     * situação.
     */
    app.route('/devolucao') 
        .post(app.routes.return_management.change)  

    /**
     * Tela de emprestimo - CADASTRO
     * @param post: Quando clicado no botão de confirmar é feito o emprestimo
     * alterando as colunas:
     * data_prevista_devolucao
     * data_emprestimo
     * situacao
     *   
     */
    app.route('/emprestimo')      
        .post(app.routes.lending_management.create)

    /**
     * Tela de emprestimo e Tela de devolução - CADASTRO
     * quando digitado código da literatura é carregado os valores nos inputs.
     */
    app.route('/emprestimo/:id')
        .get(app.routes.lending_management.findBook)    

}