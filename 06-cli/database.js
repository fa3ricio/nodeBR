const { readFile, writeFile } = require('fs') //fileSystem
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor() {
        this.FILE_NAME = 'heroes.json'
    }
    async getFilesData() {
        // const dataJson = require('./heroes.json') // Outra forma de obter os dados do arquivo
        const file = await readFileAsync(this.FILE_NAME, 'utf8')
        return JSON.parse(file.toString())
    }
    async writeFileData(data) {
        await writeFileAsync(this.FILE_NAME, JSON.stringify(data))
        return true
    }
    async createFileData(hero) {
        const data = await this.getFilesData()
        const id = hero.id <= 2 ? hero.id : Date.now()
        const heroeId = {
            id,
            ...hero
        }
        const finalData = [
            ...data,
            heroeId
        ]
        const result = await this.writeFileData(finalData)
        return result
    }
    async list(id) {
        const data = await this.getFilesData()
        const filterData = data.filter(item => (id ? (item.id === id) : true))
        return filterData
    }

    async deleteFileData(id) {
        if (!id) { 
            return await this.writeFileData([]) 
        }
        const data = await this.getFilesData()
        const index = data.findIndex(item => item.id === parseInt(id))
        if (index === -1) { 
            throw Error(`This Heroe don't exist. Try again!`) 
        }
        data.splice(index, 1)
        return await this.writeFileData(data)
    }

    async updateFileData(id, hero) {
        const data = await this.getFilesData()
        const index = data.findIndex(item => item.id === id)
        if (index === -1) {
            throw Error('This hero do not exist. Try again!')
        }
        const actual = data[index]
        const objectUpdate = {
            ...actual,
            ...hero
        }
        data.splice(index, 1)
        return this.writeFileData([
            ...data,
            objectUpdate
        ])

    }
}

module.exports = new Database()