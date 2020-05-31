const Commander = require('commander')
const Database = require('./database')
const Hero = require('./hero')
async function main() {
    Commander
        .version('v1')
        .option('-n, --name [value]', "Name of the hero.")
        .option('-p, --power [value]', "Power of the hero.")
        .option('-i, --id [value]', "Id of the hero.")
        .option('-r, --register', "Register a hero.")
        .option('-l, --list', "List a hero.")
        .option('-d, --delete', "Delete a hero by id.")
        .option('-u, --update [value]', "Update a hero by id.")
        .parse(process.argv)

    const hero = new Hero(Commander)

    try {
        if (Commander.register) {
            delete hero.id
            const result = await Database.createFileData(hero)
            if (!result) {
                console.log('The hero was not registered!')
                return
            }
            console.log('The hero was registered with success!')
        }
        if (Commander.list) {
            const result = await Database.list()
            console.table(result)
            return
        }
        if (Commander.delete) {
            const result = await Database.deleteFileData(hero.id)
            if (!result) {
                console.log('The hero was not registered!')
                return
            }
            console.log('The hero was deleted!')
        }
        if (Commander.update) {
            const data = JSON.stringify(hero)
            const heroUpdate = JSON.parse(data)
            const idUpdate = Commander.update
            const result = await Database.updateFileData(parseInt(idUpdate), heroUpdate)
            if (!result) {
                console.log('The hero was not updated!')
                return
            }
            console.log('Hero updated with success!')
        }
    }
    catch(error) {
        console.error('It was bad, man!')
    }

}

main()