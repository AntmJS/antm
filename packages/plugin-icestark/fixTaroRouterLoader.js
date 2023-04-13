/* eslint-disable @typescript-eslint/no-var-requires */
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const template = require('@babel/template').default

module.exports = function (source) {
  const ast = parse(source, {
    sourceType: 'module',
  })

  // 对 ast 进行深度遍历
  traverse(ast, {
    FunctionDeclaration(path) {
      const id = path.get('id')
      if (id && id.node && id.node.name === 'init') {
        let index = -1
        let containerIndex = -1
        let appNode, containerNode
        path.node.body.body.forEach((node, i) => {
          if (
            node.type === 'ExpressionStatement' &&
            node.expression &&
            node.expression.type === 'ConditionalExpression' &&
            node.expression.alternate &&
            node.expression.alternate.type === 'CallExpression' &&
            node.expression.alternate.callee &&
            node.expression.alternate.callee.type === 'MemberExpression' &&
            node.expression.alternate.callee.property &&
            node.expression.alternate.callee.property.type === 'Identifier' &&
            node.expression.alternate.callee.property.name === 'remove'
          ) {
            appNode = node.expression.test.left.left
            index = i
          }
          if (
            node.type === 'ExpressionStatement' &&
            node.expression &&
            node.expression.type === 'CallExpression' &&
            node.expression.callee &&
            node.expression.callee.type === 'MemberExpression' &&
            node.expression.callee &&
            node.expression.callee.type === 'MemberExpression' &&
            node.expression.callee.object &&
            node.expression.callee.object.type === 'MemberExpression' &&
            node.expression.callee.object.object &&
            node.expression.callee.object.object.name === 'document' &&
            node.expression.callee.object.property &&
            node.expression.callee.object.property.name === 'body'
          ) {
            containerNode = node.expression.arguments[0].name
            containerIndex = i
          }
        })
        if (index !== -1) {
          path.node.body.body.splice(index, 1, appNode)
        }
        if (containerIndex !== -1) {
          const temp = template(
            `${appNode.left.name}.replaceWith(${containerNode})`,
          )
          path.node.body.body.splice(containerIndex, 1, temp())
        }
      }
    },
  })
  return generator(ast).code
}
