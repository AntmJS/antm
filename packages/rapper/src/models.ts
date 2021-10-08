#!/usr/bin/env node

import { rapper, defineConfig, uploadType, typeUpload } from './index';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { searchRootPath } from './utils';
import chalk from 'chalk';
import * as program from 'commander';

(() => {
  program
    .option('--apiUrl <apiUrl>', '设置Rap平台后端地址')
    .option('--rapUrl <rapUrl>', '设置Rap平台前端地址')
    .option('--rapperPath <rapperPath>', '设置生成代码所在目录')
    .option('--c, --config <configPath>', 'config文件路径')
    .option('--m, --moduleId <moduleId>', '模块ID')
    .option('--u, --upload []', '上传类型')
    .option('--d, --download []', '下载类型')
    .option('--t, --token <tokenCookie>', '授权cookie');

  program.parse(process.argv);

  const isUpload: boolean = program.download ? false : true;
  const configName = 'antm';
  let config = defineConfig({ isUpload });
  const rootPath = searchRootPath();

  // 通过 命令行配置config
  if (program.config) {
    const configPath = resolve(rootPath, program.config);
    if (existsSync(configPath)) {
      console.log(chalk.yellow('config 文件路径不对，请检查'));
      process.exit(1);
    }
    config = require(configPath);
  } else {
    // 通过config.js配置config
    const configPath = resolve(rootPath, `${configName}.config.js`);
    const existsConfigPath = existsSync(configPath);
    if (existsConfigPath) {
      config = defineConfig(require(configPath)?.rapper || {});
    }
  }

  /** 通过 package.json 配置config */
  const packageConfig = require(resolve(rootPath, './package.json'));

  if (packageConfig?.[configName]) {
    config = defineConfig(packageConfig?.[configName]?.rapper || {});
  }

  // 都没有就用 defaultConfig

  if (program.moduleId) {
    config.download.moduleId = program.moduleId;
    config.upload.moduleId = program.moduleId;
  }

  if (program.apiUrl && program.rapUrl) {
    /** 通过 scripts 配置 */
    const rapperConfig = {
      apiUrl: program.apiUrl,
      rapUrl: program.rapUrl,
      rapperPath: program.rapperPath || config.rapper.rapperPath,
    };
    config.rapper = rapperConfig;
  }

  if (program.tokenCookie) {
    config.rapper = {
      ...(config.rapper || {}),
      tokenCookie: program.tokenCookie,
    };
  }

  const result = defineConfig(config);

  if (!result.isUpload) {
    rapper(result);
  } else {
    if (result.upload.mode === 'type') {
      typeUpload(result);
    } else {
      uploadType(result);
    }
  }
})();
