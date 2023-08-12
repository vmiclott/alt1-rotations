const fs = require('fs')
const abilitiesDir = 'src/assets/abilities/'
const abilitiesTsFile = 'src/abilities.ts'

let content = ''

const abilityNames = fs
  .readdirSync(abilitiesDir)
  .map((fileName: string) => fileName.split('.')[0])

const formatImport = (abilityName: string) =>
  `import ${abilityName} from './assets/abilities/${abilityName}.png'\n`

const toCamelCase = (abilityName: string) =>
  abilityName
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', '')
    )

const formatAbilitiesMapItem = (abilityName: string) =>
  `${toCamelCase(abilityName)}:${abilityName}`

const imports = (abilityNames: string[]) =>
  abilityNames.map(formatImport).join('')

const abilitiesMap = (abilityNames: string[]) => `
export const abilitiesMap = {
${abilityNames.map(formatAbilitiesMapItem)}
} as const
`
const types = () => `
export type AbilityName = keyof typeof abilitiesMap
export type Ability = {
  name: AbilityName
  tick: number
  keybind: string
}
`

content += imports(abilityNames)
content += abilitiesMap(abilityNames)
content += types()

fs.writeFileSync(abilitiesTsFile, content)
