const axios = require('axios') // usando o get importa apenas o necessário

const URL = 'https://swapi.dev/api/people/'

async function obterPessoas(nome) {
    const url = `${URL}?search=${nome}&format=json`
    const result = await axios.get(url)
    // return result.data
    return result.data.results.map(mapearPessoas)
}

function mapearPessoas(item) {
    return {
        nome: item.name,
        peso: item.height
    }
}

module.exports = {
    obterPessoas
}