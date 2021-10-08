/**
 * 扫描项目文件，排除是否存在 rap 接口已删除，但是项目仍然在使用的接口
 */
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { Intf } from '../types';
import { resolve } from 'path';
import { getMd5 } from '../utils';

/**
 * 获取所有需要扫描的文件
 * @param parentPath
 */
export function getFiles(parentPath: string): string[] {
  let fileList: string[] = [];

  /* 不扫描无效路径 */
  if (parentPath.indexOf('/.') > -1 || parentPath.indexOf('node_modules') > -1) {
    return fileList;
  }
  let files = [];
  try {
    files = fs.readdirSync(parentPath);
  } catch (err) {
    throw new Error('文件夹不存在，请检查config配置');
  }

  files.forEach(item => {
    item = path.join(parentPath, item);

    if (item.indexOf('src') < 0) {
      return;
    }

    const stat = fs.statSync(item);
    try {
      if (stat.isDirectory()) {
        fileList = fileList.concat(getFiles(item));
      } else if (stat.isFile()) {
        fileList.push(item);
      }
    } catch (error) {
      console.log(chalk.red(`rapper: Rap 接口引用扫描失败, ${error}`));
    }
  });
  return fileList;
}

/** 校验文件 MD5，是否被改动 */
function isFileChange(contentArr: string[]): boolean {
  const matchMD5 = contentArr[0].match(/\/\*\smd5:\s(\S*)\s\*\//) || [];
  const oldMD5 = matchMD5[1];
  /** 老版本没有写入md5，所以这里需要兼容 */
  if (!oldMD5) {
    return false;
  }
  return oldMD5 !== getMd5(contentArr.slice(1).join('\n'));
}

type TScanResult = Array<{
  /** 被删除的接口 modelName */
  key: string;
  /** 被删除的接口所在文件 */
  filePath: string;
  /** 所在文件的行数 */
  line: number;
  /** 所在文件的列数 */
  start: number;
}>;
function scanAllfiles(interfaces: Array<Intf>, fileList: string[]): TScanResult {
  const strReg = /[\'\"]+(GET|POST|PUT|DELETE|OPTIONS|PATCH|HEAD)\/([^\'\"]*)[^(REQUEST)(SUCCESS)(FAILURE)]{1}[\'\"]+/g;

  const result: TScanResult = [];
  fileList.forEach(filePath => {
    /** 文件的扩展名 */
    const extName = path.extname(filePath);
    if (!['.ts', '.js', '.vue', '.es'].includes(extName)) {
      return;
    }
    /** 读取文件的内容 */
    const content = fs.readFileSync(filePath, 'utf-8') || '';
    /** 每一行比对 */
    content.split('\n').forEach((rowText, i) => {
      const regResult = rowText.match(strReg);
      if (regResult && regResult.length > 0) {
        regResult.forEach(item => {
          item = item.replace(/\'|\"/gi, '');
          /** 在 interfaces 里面找不到，说明无效Rap引用了 */
          const isExist = !!interfaces.find(({ modelName }) => modelName === item);
          if (!isExist) {
            result.push({
              key: item,
              filePath: resolve(process.cwd(), filePath),
              start: rowText.indexOf(item),
              line: i + 1,
            });
          }
        });
      }
    });
    return false;
  });

  return result;
}

/**
 * 扫描找出是否有被删除的接口
 * @param interfaces, Rap平台同步的接口
 * @param excludePath, 排除检测的文件 (已默认排除 node_modules，无需配置此项)
 */
export function findDeleteFiles(interfaces: Array<Intf>, excludePaths: string[]) {
  let fileList = getFiles('./');
  fileList = fileList.filter(file => {
    file = resolve(process.cwd(), file);
    return !excludePaths.find(exclude => file.indexOf(resolve(process.cwd(), exclude)) > -1);
  });
  return scanAllfiles(interfaces, fileList);
}

/**
 * 扫描找出生成的模板文件是否被手动修改过
 * @param rapperPath, 模板文件地址
 */
export function findChangeFiles(rapperPath: string): string[] {
  const fileList = getFiles(rapperPath);
  // console.log('fileList', fileList, rapperPath)
  const changeList: string[] = [];
  fileList.forEach(filePath => {
    /** 读取文件的内容 */
    const content = fs.readFileSync(filePath, 'utf-8') || '';
    /** 校验文件 MD5，是否被改动 */
    if (isFileChange(content.split(/\r|\n|\r\n/))) {
      changeList.push(resolve(process.cwd(), filePath));
    }
  });
  return changeList;
}

/**
 * 从模板文件的前6行中扫描找出生成模板文件的 rapper 版本
 */
export function findRapperVersion(rapperPath: string): string {
  let version = '';
  try {
    const content = fs.readFileSync(`${rapperPath}/index.ts`, 'utf-8') || '';
    const contentArr = content.split(/\r|\n|\r\n/);
    if (contentArr.length) {
      const matchMD5 =
        contentArr
          .slice(0, 6)
          .join('\n')
          .match(/\/\*\sRapper版本:\s(\S*)\s\*\//) || [];
      version = matchMD5[1];
    }
  } catch (err) {}
  return version;
}
