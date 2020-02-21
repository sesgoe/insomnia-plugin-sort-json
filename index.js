const jsonabc = require('jsonabc')

module.exports.responseHooks = [
    context => {

        const body = context.response.getBody()
        const data = JSON.parse(Buffer.from(body).toString())
        const sortedData = Buffer.from(JSON.stringify(jsonabc.sortObj(data.response)))

        context.response.setBody(sortedData)

    }
]
