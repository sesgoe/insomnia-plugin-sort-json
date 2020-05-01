# Insomnia - Sort JSON Responses
This plugin sorts the properties of JSON responses using `sort-json`.

`sort-json` can be found at https://www.npmjs.com/package/sort-json

## ✅ Install
1. Go to `Insomnia/Preferences` and choose the *Plugins* tab
2. Enter `insomnia-plugin-sort-json` and click on `Install Plugin`
3. That's it, enjoy!

## ⏬ Update Plugin Version
1. Follow the same instructions for Installing!


##  🛠 Configuration
1. Use the large "Insomnia" button in the top left
2. Under Plugins near the bottom, you'll see a few options:

- 🔼 **sort-json ascending**
  - Sorts the resulting JSON response in alphabetical ascending order
- 🔽 **sort-json descending**
  - Sorts the resulting JSON response in alphabetical descending order
- 🅰️ **sort-json ignore case**
  - Ignores uppercases in JSON property names when sorting
- 🅰️ **sort-json no-ignore-case**
  - Does *not* ignore uppercases in JSON property names when sorting
- ⚙️ **sort-json reset to defaults**
  - Resets all settings for sort-json to their defaults
    - `sort-ascending`: true
    - `sort-depth`: 5
    - `ignore-case`: true

### ⚠️ Special Configuration Note
`sort-depth` is currently not configurable through a nice UI in Insomnia. You can open the plugins folder directly and change the value of `sortDepthDefault` inside `index.js` if you'd like to change the value. The `setUpDefaults` will just always set the value of `sort-depth` to whatever you configure the default to be. This is a stop-gap until Insomia updates their `context.app` api to include prompt windows from `workspaceAction` selections.

`sort-depth` default value is 5, which means it will sort up to 5 levels deep inside a returned JSON object.
