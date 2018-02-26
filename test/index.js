const assert = require( 'assert' )
const fs = require( 'fs' )
const doc = require( '@mojule/document' )
const H = require( '@mojule/h' )
const templates = require( './fixtures/templates' )
const componentJson = require( './fixtures/components.json' )
const DomComponents = require( '..' )
const HtmlString = require( '@mojule/dom-node-to-html-string' )

const h = H( doc )

const { template } = h

const toDom = DomComponents( doc, templates )

const parse = htmlStr => {
  const t = template()

  t.innerHTML = htmlStr

  if( t.content.childNodes.length === 1 ) return t.content.childNodes[ 0 ]

  return t.content
}

const componentHtml = fs.readFileSync( './test/fixtures/components.html', 'utf8' )
const componentDom = parse( componentHtml )

const expect = `<!--hello--><div class="box" name="foo"><div class="box" name="bar"><p class="baz">Hello World</p></div></div><custom-el>Hello World</custom-el>`

describe( 'dom-components', () => {
  it( 'from HTML', () => {
    const result = toDom( componentDom )
    const resultHtml = HtmlString( result )

    assert.strictEqual( resultHtml, expect )
  })
  it( 'from JSON', () => {
    const result = toDom( componentJson )
    const resultHtml = HtmlString( result )

    assert.strictEqual( resultHtml, expect )
  })
  it( 'bad argument', () => {
    assert.throws( () => toDom() )
  })
})
