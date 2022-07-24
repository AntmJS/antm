import * as TJS from 'typescript-json-schema'

export default function tsTypeParse(file: string) {
  const program = TJS.getProgramFromFiles(
    [file],
    {
      strictNullChecks: true,
    },
    './',
  )
  return TJS.generateSchema(program, '*', {
    required: true,
    validationKeywords: ['value', 'rule', 'url', 'method', 'introduce'],
    excludePrivate: true,
    ignoreErrors: true,
  })
}
