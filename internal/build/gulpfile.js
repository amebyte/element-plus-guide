import { parallel, series } from 'gulp'
import { buildFullEntry } from './full-bundle.js'
import { buildModules } from './modules.js'
import { generateTypesDefinitions } from './types-definitions.js'
import { copyTypesDefinitions } from './copyTypesDefinitions.js'

export default series(
  parallel(buildFullEntry, buildModules, generateTypesDefinitions),
  copyTypesDefinitions
)
