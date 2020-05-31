const { deepEqual, ok } = require('assert')
const database = require('./database')

const DEFAULT_ITEM_REGISTER = {
    name: 'Flash',
    power: 'Speed',
    id: 1
}

const DEFAULT_ITEM_UPDATE = {
    name: 'Lanterna Verde',
    power: 'Ring energy',
    id: 2
}

describe('Plataform of manipulation of Heroes', () => {
    before(async () => {
        await database.createFileData(DEFAULT_ITEM_REGISTER)
        await database.createFileData(DEFAULT_ITEM_UPDATE)
    })
    it('Must to LIST a hero, using files', async () => {
        const expected = DEFAULT_ITEM_REGISTER
        const [result] = await database.list(expected.id)
        deepEqual(result, expected)

    })

    it('Must to REGISTER a hero, using files', async () => {
        const expected = DEFAULT_ITEM_REGISTER
        const result = await database.createFileData(DEFAULT_ITEM_REGISTER)
        const [actual] = await database.list(DEFAULT_ITEM_REGISTER.id)
        deepEqual(actual, expected)
    })

    it('Must to DELETE a hero by id', async () => {
        const expected = true
        const result = await database.deleteFileData(DEFAULT_ITEM_REGISTER.id)
        deepEqual(result, expected)
    })

    it('Must to UPDATE a hero by id', async () =>{
        const expected = {
            ...DEFAULT_ITEM_UPDATE,
            name: 'Batman',
            power: 'Money'
        }
        const newHero = {
            name: 'Batman',
            power: 'Money'
        }
        await database.updateFileData(DEFAULT_ITEM_UPDATE.id, newHero)
        const [result] = await database.list(DEFAULT_ITEM_UPDATE.id)
        deepEqual(result, expected)
    })

})