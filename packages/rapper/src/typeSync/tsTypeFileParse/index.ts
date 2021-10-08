import * as TJS from 'typescript-json-schema';
const settings = {
  required: true,
  comments: true,
  validationKeywords: ['value', 'rule', 'url', 'method', 'rapUrl'],
};
const compilerOptions = {
  strictNullChecks: true,
};

function getGeneric(definitions: any, genericName: string) {
  const element = genericName.replace(/^#\//, '').split('/');
  element.shift();

  return element.reduce((c, n) => {
    return c[n];
  }, definitions);
}

export function tsTypeParse(file: string) {
  const program = TJS.getProgramFromFiles([file], compilerOptions, './');
  return TJS.generateSchema(program, '*', settings);
}

let IDX = 1;
function generateRapJson(
  definitions: {
    [key: string]: any;
  },
  currentDefinitions: any,
  scope: 'request' | 'response',
  parentId: number | string,
  interfaceId: number,
) {
  const ifs = [];
  // in 什么都能循环
  const ref = currentDefinitions['$ref'] || currentDefinitions?.['items']?.['$ref'];
  const obj = ref ? getGeneric(definitions, ref) : currentDefinitions;
  const isObject = obj?.type === 'object';
  const properties = isObject ? obj.properties : obj.items.properties;
  const required = (isObject ? obj.required : obj.items.required) || [];

  // 上来就是ref
  for (const key in properties) {
    let element = properties[key];
    if (element['$ref']) {
      // 有泛型
      element = getGeneric(definitions, element['$ref']);
    }
    // 第一层肯定是一个obk
    const id = `$memory-${IDX}`;
    const type = element.enum ? typeof element.enum[0] : element.type;

    const ifItem = {
      scope,
      name: key,
      type: type.charAt(0).toUpperCase() + type.slice(1),
      value:
        typeof element.value === 'string'
          ? element.value.replace(/^(#|\\@|\/@)/, '@')
          : JSON.stringify(element.value) || '',
      description: element.description || '',
      parentId,
      interfaceId,
      id: id,
      pos: 2,
      required: required.includes(key),
      rule: element.rule || '',
      memory: true,
    };
    ifs.push(ifItem);
    IDX++;
    if (element.type === 'object' || element.type === 'array') {
      ifs.push(...generateRapJson(definitions, element, scope, id, interfaceId));
    }
  }
  return ifs;
}

function getProperties(data: Record<string, unknown>, namePath: string[] | string) {
  const _namePath = Array.isArray(namePath) ? namePath : [namePath];
  return _namePath.reduce((curr = {}, next) => {
    const result = curr.properties[next];
    return result;
  }, data);
}

export function generateUploadRapJson(
  schema: TJS.Definition,
  interfaceId: number,
  responseTypeName: string | string[],
  requestTypeName: string | string[],
) {
  const parentId = -1;
  IDX = 1;
  const rootProperties = { properties: schema.definitions };
  const reqProperties = getProperties(rootProperties, requestTypeName);
  const resProperties = getProperties(rootProperties, responseTypeName);
  // console.log(resProperties, '===\n===', reqProperties);
  // console.log(reqProperties, 'requestTypeName:', requestTypeName);
  // console.log(resProperties, 'responseTypeName:', responseTypeName);
  if (!resProperties || !reqProperties) {
    throw new Error(`[${requestTypeName}] 或 [${responseTypeName}]出现了一个错误，类型未找到`);
  }

  // fs.writeFileSync(`./${interfaceId}.json`, JSON.stringify(schema, null, 4));

  return generateRapJson(
    schema.definitions,
    reqProperties,
    'request',
    parentId,
    interfaceId,
  ).concat(generateRapJson(schema.definitions, resProperties, 'response', parentId, interfaceId));
}
