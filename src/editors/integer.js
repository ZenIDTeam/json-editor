import { NumberEditor } from './number.js'
import { isInteger } from '../utilities.js'
/* eslint-disable */
export class IntegerEditor extends NumberEditor {
  getNumColumns () {
    return 2
  }

  getValue () {
    if (!this.dependenciesFulfilled) {
      return undefined
    }
    const value = isInteger(this.value) ? parseInt(this.value) : this.value
    //Zenid update - start
    if (this.value === "") {
      if (!this.isRequired()) return null;           //We need null to be returned. Otherwise default value on server site is used (and not null which we want).
    }
    //Zenid update - end
    if (!this.jsoneditor.options.use_default_values && value === '') {
      return undefined
    }
    return value
  }
}
