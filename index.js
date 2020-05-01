const sortJson = require('sort-json')

const sortAscendingKey      = 'sort-ascending'
const sortDepthKey          = 'sort-depth'
const ignoreCaseKey         = 'ignore-case'

const sortAscendingDefault  = true
const sortDepthDefault      = 5
const ignoreCaseDefault     = true

const setConfigValue = async (context, key, value) => {
    await context.store.setItem(key, value)
    console.warn(`Set sort-json ${key} to ${value}`)
}

const setUpDefaults = async (context) => {
    if(!await context.store.hasItem(sortAscendingKey)) {
        await setConfigValue(context, sortAscendingKey, sortAscendingDefault)
    }

    //for now, always set the sortDepth to default in case people want to change it easily
    await setConfigValue(context, sortDepthKey, sortDepthDefault)

    if(!await context.store.hasItem(ignoreCaseKey)) {
        setConfigValue(context, ignoreCaseKey, ignoreCaseDefault)
    }
}

const getConfigBoolean = async (context, key) => {
    return await context.store.getItem(key) == 'true'
}

const getConfigInt = async (context, key) => {
    return parseInt(await context.store.getItem(key))
}

module.exports.responseHooks = [
    async (context) => {

        //stopgap until insomnia can give us a load hook with context
        await setUpDefaults(context)

        const body = await context.response.getBody()
        let data = {}

        try {
            data = JSON.parse(Buffer.from(body).toString())
        } catch (e) {
            return await context.response.setBody(body) //if the JSON fails to parse, pass response body through anyway
        }

        //sort-ascending means reverse = false
        const options = {
            reverse: !await getConfigBoolean(context, sortAscendingKey),
            depth: await getConfigInt(context, sortDepthKey),
            ignoreCase: await getConfigBoolean(context, ignoreCaseKey)
        }

        const sortedData = Buffer.from(JSON.stringify(sortJson(data, options)))
        await context.response.setBody(sortedData)

    }
]


module.exports.workspaceActions = [
    {
        label: "sort-json ascending (default)",
        icon: "fa-chevron-up",
        action: async (context, _) => {
            await setConfigValue(context, sortAscendingKey, true)
        }
    },
    {
        label: "sort-json descending",
        icon:"fa-chevron-down",
        action: async(context, _) => {
            await setConfigValue(context, sortAscendingKey, false)
        }
    },
    // including below for when context.app.prompt is fixed for workspaceActions
    // {
    //     label: "sort-json depth",
    //     icon: "fa-chevron-right",
    //     action: async (context, data) => {
    //         const result = await context.app.prompt('Configure Sort Depth', {
    //           label: 'sort-json sort depth',
    //           defaultValue: '1',
    //           submitName: 'Set',
    //           cancelable: true
    //         })
    //       }
    // },
    {
        label: "sort-json ignore-case (default)",
        icon:"fa-font",
        action: async(context, _) => {
            await setConfigValue(context, ignoreCaseKey, true)
        }
    },
    {
        label: "sort-json NO-ignore-case",
        icon:"fa-font",
        action: async(context, _) => {
            await setConfigValue(context, ignoreCaseKey, false)
        }
    },
    {
        label: "sort-json reset to defaults",
        icon:"fa-cogs",
        action: async(context, _) => {
            await setConfigValue(context, sortAscendingKey, sortAscendingDefault)
            await setConfigValue(context, sortDepthKey, sortDepthDefault)
            await setConfigValue(context, ignoreCaseKey, ignoreCaseDefault)
        }
    },
]
