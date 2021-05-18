/* eslint-disable */
import { AbstractIconLib } from '../iconlib.js'

const iconPrefix = 'fi-'
const mapping = {
  collapse: 'minus',
  expand: 'plus',
  delete: 'trash',
  //Zenid update - start
  deleteall: 'trash',
  //Zenid update - end
  edit: 'pencil',
  add: 'plus',
  subtract: 'minus',
  cancel: 'x-circle',
  save: 'save',
  moveup: 'arrow-up',
  moveright: 'arrow-right',
  movedown: 'arrow-down',
  moveleft: 'arrow-left',
  copy: 'page-copy',
  clear: 'x-circle',
  time: 'clock',
  calendar: 'calendar',
  edit_properties: 'list'
}

export class foundation3Iconlib extends AbstractIconLib {
  constructor () {
    super(iconPrefix, mapping)
  }
}
