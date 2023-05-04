#!/usr/bin/env ts-node --transpileOnly --transpiler ts-node/transpilers/swc
import Webpack from 'webpack'
import { WebpackConfiguration } from 'webpack-dev-server'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import getPro from '../config/base'
;(async function build() {
  process.env['NODE_ENV'] = 'development'
  const Con = await getPro()
  Con.plugins.push(new BundleAnalyzerPlugin())
  const compile = Webpack(Con as WebpackConfiguration)

  compile.run((stas) => {
    if (stas) console.dir(stas)
  })
})()
