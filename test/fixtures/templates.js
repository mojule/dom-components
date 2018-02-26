const doc = require( '@mojule/document' )
const H = require( '@mojule/h' )

const h = H( doc )

const { div } = h

const templates = {
  Box: ( model, ...childNodes ) => div(
    { class: 'box', name: model.name },
    ...childNodes
  )
}

module.exports = templates
