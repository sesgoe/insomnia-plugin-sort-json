const jsonabc = require('jsonabc')

module.exports.responseHooks = [
    context => {

        const body = context.response.getBody()
        let data = {}

        try {
            data = JSON.parse(Buffer.from(body).toString())
        } catch (e) {
            context.response.setBody(body) //if the JSON fails to parse, pass response body through anyway
            return
        }

        const sortedData = Buffer.from(JSON.stringify(jsonabc.sortObj(data)))
        context.response.setBody(sortedData)

    }
]
