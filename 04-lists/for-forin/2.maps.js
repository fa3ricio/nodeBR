const service = require('./service')

// função map personalizada
Array.prototype.myMap = function (callback) {
    const novoArrayMapeado = []
    for (let indice = 0; indice <= this.length -1; indice++) {
        const result = callback(this[indice], indice) 
            novoArrayMapeado.push(result)
    }
    return novoArrayMapeado;
}




async function main() {
    try {
        // const names = []
        const results = await service.obterPessoas('a')
        // results.results.forEach(function(item) {
        //     names.push(item.name)
        // })

        // const names = results.results.map(person => {
        //     return person.name
        // })
        
        // const names = results.results.map(person => person.name)

        // usando map personalizado
        const names = results.results.myMap(function (person, indice) {
            return `[${indice + 1}] : ${person.name}`
        })
        console.log('nomes', names)
    }
    catch (error) {
        console.log('Deu ruim!', error)
    }
}

main()