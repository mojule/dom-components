# dom-components

`npm install @mojule/dom-components`

A way to turn nested components backed by your own templates into DOM nodes

## HTML syntax

```html
<!-- model as attributes -->
<m-box name="foo">
  <m-box>
    <!-- model as embedded JSON -->
    <m-model>{ "name": "bar" }</m-model>
    <p class="baz">Hello world</p>
  </m-box>
</m-box>
```

## JSON syntax

```json
[ "Box", { "name": "foo" },
  [ "Box", { "name": "bar" },
    [ "p", { "class": "baz" },
      "Hello world"
    ]
  ]
]
```

The custom elements will be mapped via supplied template functions with a model
and any child nodes

Custom elements start with `m-` - the `m-` will be stripped and the remainder of
the name will be converted to PascalCase, eg `m-foo-bar` refers to a template
called `FooBar`

Attributes on `m-` elements will become properties on a model passed to the
template function and have their names converted from kebab-case to camelCase,
eg `<m-foo bar-baz="qux">` will call provided template `Foo` with the model
`{ "barBaz": "qux" }`

For complex models, embed the JSON for the model directly inside an immediate
child node with the tag `<m-model>`, eg
`<m-foo><m-model>{ "bar": "baz" }</m-model></m-foo>`

The JSON syntax is `[ name[, model ], ...children ]`, where name is a template
or tag name, model is the template model or attribute map for the DOM element,
and children is 0 or more nodes in the same format

Text nodes are just strings

Some special JSON nodes are also supported:

```javascript
[ "documentFragment",
  [ "comment", "foo" ],
  "text node is just a string"
]
```

```javascript
const DomComponents = require( '@mojule/dom-components' )

const templates = {
  Box: ( model, ...childNodes ) => {
    const box = document.createElement( 'div' )
    box.classList.add( 'box' )
    box.setAttribute( name, model.name )

    childNodes.forEach( child => box.appendChild( child ) )

    return box
  }
}

// document can be window.document, a JSDOM document etc
const toDom = DomComponents( document, templates )

// call toDom with either a DOM node following the convention above or JSON
document.body.appendChild( toDom( componentNode ) )
document.body.appendChild( toDom( json ) )
```
