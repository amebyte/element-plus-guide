import { readFile } from 'fs/promises'
import { parse } from '@vue/compiler-sfc'
const content = await readFile('./script.vue', 'utf-8')
const { descriptor } = parse(content)
