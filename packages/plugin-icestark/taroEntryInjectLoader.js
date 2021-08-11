/* eslint-disable @typescript-eslint/no-var-requires */
const loaderUtils = require('loader-utils')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const template = require('@babel/template').default
const t = require('@babel/types')

module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  const ast = parse(source, {
    sourceType: 'module',
  })
  const temp = template(`
    function render () {
      NORMAL_RENDER
    }
  `)

  // 对 ast 进行深度遍历
  traverse(ast, {
    Program(path) {
      const node = t.importDeclaration(
        [
          t.importDefaultSpecifier(
            t.identifier('{ isInIcestark, setLibraryName }'),
          ),
        ],
        t.stringLiteral('@ice/stark-app'),
      )
      const bodyNodes = [node]
      const renderFunc = []
      path.node.body.forEach((node) => {
        if (node.type === 'ImportDeclaration') {
          bodyNodes.push(node)
        } else {
          renderFunc.push(node)
        }
      })
      const funcAst = temp({ NORMAL_RENDER: renderFunc })
      bodyNodes.push(funcAst)
      path.node.body = bodyNodes
    },
  })
  const code = generator(ast).code
  return (
    code +
    `
  if (!isInIcestark()) {
    render()
  }
  
  setLibraryName('${options.libraryName}')
  
  export async function mount (props) {
    render()
  }
  
  export async function unmount (props) {
    const { container } = props
    ReactDOM.unmountComponentAtNode(container)
  }`
  )
}
