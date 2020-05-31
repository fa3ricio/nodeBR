const { obterPessoas } = require('./service')

Array.prototype.myFilter = function (callback) {
    const lista = []
    for (index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        if (!result) continue;
        lista.push(item)
    }
    return lista
}

async function main() {
    try {
        const { results } = await obterPessoas('a')

        // const familiaLars = results.filter(familia => {
        //     const result = familia.name.toLowerCase().indexOf('lars') === -1
        //     return result
        // })

        const familiaLars = results.myFilter((item, index, lista) => {
            console.log(`Index: ${index} -- Length: ${lista.length}`)
            return item.name.toLowerCase().indexOf('skywalker') !== -1
        })

        const names = familiaLars.map(pessoa => pessoa.name)
        console.log(names)
    }
    catch (error){
        console.error('Deu ruim!!', error)
    }
}

main()