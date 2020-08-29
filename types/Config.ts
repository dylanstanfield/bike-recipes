import { Component } from './Component'
import { Theme } from './Theme'
import { FileType } from './FileType'

export interface Config {
  fileType: FileType
  theme: Theme
  components: Component[]
}
