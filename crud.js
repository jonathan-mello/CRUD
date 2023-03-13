const fs = require('fs')                                              // Informamos ao script que utilizaremos o módulo fs (File System)
const databaseFile = 'database.json'                                  // Atribuímos uma variável para o local da nossa base de dados

function readAllUsers() {                                             // Declaramos a função que vai ler todos os usuários da nossa base
    const data = fs.readFileSync(databaseFile)
    return JSON.parse(data)                                           // Retorna os dados da minha base parseados/compilados no formato JSON
}

function createUser(user) {                                           /// 1º: Declaramos a função que cria o usuário
    const users = readAllUsers()
    users.push(user)
    fs.writeFileSync(databaseFile, JSON.stringify(users))
}

function readUser(email) {                                            /// 2º: Declaramos a função que lê o usuário
    const users = readAllUsers()
    let userExist
    for (const user of users) {
        if (user.email == email) {
            userExist = user                                           // Retorna o usuário com o e-mail correspondente
        }  
    } 
    return userExist ? userExist : console.log('Usuário inexistente!')
}

function updateUser(email, updates) {                                 /// 3º: Declaramos a função que faz a atualização/update dos usuários da nossa base
    const users = readAllUsers()
    const index = users.findIndex(user => user.email == email)
    if (index >= 0) {
        const updateUser = { ...users[index], ...updates }
        users[index] = updateUser                                     //salvando os novos valores na memória
        fs.writeFileSync(databaseFile, JSON.stringify(users))         //salvando os novos valores na base
    }
}

function deleteUser(email) {                                          /// 4º: Declaramos a função que exclui um usuário da base de dados
    const users = readAllUsers()
    const index = users.findIndex(user => user.email == email)
    if (index >= 0) {
        users.splice(index, 1)
        fs.writeFileSync(databaseFile, JSON.stringify(users))
    }
}

const newUser = {
    nome: 'Andrei',
    email: 'andrei@gmail.com',
    password: 'senha123',
    endereco: {
        cep: '01234-567',
        rua: 'Rua Exemplo',
        numero: '123',
        bairro: 'Bairro Exemplo'
    }
}

// createUser(newUser)
// console.log(readUser('usuario@gmail.com'))
// updateUser('usuario@gmail.com', {nome: 'nome', password: 'senha123'})
// deleteUser('usuario@gmail.com')