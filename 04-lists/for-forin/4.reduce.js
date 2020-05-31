const { obterPessoas } = require('./service')

Array.prototype.myReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== 'undefined' ? valorInicial : this[0]
    for (let index = 0; index <= this.length -1; index++) {
        valorFinal = callback(valorFinal, this[index], this)
    }
    return valorFinal
}

async function main() {
    try {
        const { results } = await obterPessoas('a')
        
        const pesos =  results.map(pessoa => parseInt(pessoa.height)) 

        console.table({ 'pesos' : pesos })
       

        const soma = pesos.reduce((prev, next) => {
             return prev + next
        })
  
        console.log('total', soma)
    }
    catch (error) {
        console.log('Deu ruim!', error)
    }
    
}

main()