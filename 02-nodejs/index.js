/*
 0 Obter um usuário
 1 Obter número de telefone de um usuário a partir de seu id
 2 Obter o endereço do usuário pelo id
*/

function obterUsuario() {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                id: 1,
                nome: 'Matheus',
                dataNascimento: new Date()
            })
        }, 1000)
    })  
}

function obterTelefone(idUsuario) {
    return new Promise(function  resolverPromise(resolve, reject) {
         setTimeout(() => {
        return resolve ({
            telefone: '9 9999 9999',
            ddd: 44
        })
    }, 2000)
    })
}

function obterEndereco(idUsuario) {
   return new Promise(function(resolve, reject) {
       setTimeout(() => {
        return resolve ({
            rua: 'Fluminense',
            numero: 2699
        })
    }, 2000)
   })
}

main()
async function main() {
    try {
        console.time('Verifica Time')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEndereco(usuario.id)

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEndereco(usuario.id)
        ])

        const telefone = resultado[0]
        const endereco = resultado[1]

        console.table({
            Nome: usuario.nome,
            Telefone: `(${telefone.ddd}) ${telefone.telefone}`,
            Endereço: `${endereco.rua}, ${endereco.numero}`
        })
        console.timeEnd('Verifica Time')
    }
    catch (error) {
        console.error('Deu ruim!!!', error)
    }
}

// const usuarioPromise = obterUsuario()
    
// usuarioPromise
//     .then(function(resultado){
//         console.table({resultado})
//         // console.log('resultado', resultado)
//     })
//     .catch(function(error){
//         console.error('Deu ruim!', error)
//     })


