/* eslint-disable */
import { AbstractTheme } from '../theme.js'
import rules from './html.css.js'
/* eslint-disable */
export class zenidTheme extends AbstractTheme {
  /**
   * Applies grid size to specified element.
   *
   * @param {HTMLElement} el The DOM element to have specified size applied.
   * @param {Integer} size The grid column size.
   * @see http://materializecss.com/grid.html
   */
    setGridColumnSize (el, size) {
    el.classList.add('col')
    el.classList.add(`s${size}`)
  }

  getFormInputLabel (text, req) {
    const el = super.getFormInputLabel(text, req)
    el.classList.add('je-form-input-label')
    el.style.fontSize = '1rem'
    el.style.color = 'black'
    return el
  }

  getFormInputDescription (text) {
    const el = super.getFormInputDescription(text)
    el.style.marginLeft = '10px';
    el.style.display = 'inline-block';
    return el
  }

  getIndentedPanel () {
    const el = super.getIndentedPanel()
    el.classList.add('je-indented-panel')
    el.style.padding = '1em 1.4em';
    el.style.marginBottom = '20px';
    return el
  }

  getTopIndentedPanel () {
    return this.getIndentedPanel()
  }

  getChildEditorHolder () {
    const el = super.getChildEditorHolder()
    el.classList.add('je-child-editor-holder')
    return el
  }

  getButton (text, icon, title) {
    const el = document.createElement('button')
    el.type = 'button'
    el.className = 'btn'
    el.style.marginRight = '2px'
    this.setButtonText(el, text, icon, title, true)
    return el
  }

  afterInputReady (input) {
    let label = input.previousSibling

    if (input.type && input.type === 'range') {
      label = input.parentElement.previousSibling
    }

    if (input.value || (input.dataset && input.dataset.containerFor && input.dataset.containerFor === 'radio')) {
      if (label && label.localName === 'label') {
        label.classList.add('active')
      }
    }
  }

  getHeaderButtonHolder () {
    const el = this.getButtonHolder()
    el.style.marginLeft = '10px';
    el.style.fontSize = '.6em';
    el.style.display = 'inline-block';
    return el
  }

    /**
   * Gets a form control object consisiting of several sub objects.
   *
   * @param {HTMLElement} label The label element.
   * @param {HTMLElement} input The input element.
   * @param {string} description The element description.
   * @param {string} infoText The element information text.
   * @returns {HTMLElement} The assembled DOM element.
   * @see http://materializecss.com/forms.html
   */

    /*getFormControl: function (label, input, description) {
            var el = this._super(label, input, description);
            if (input.type === 'checkbox') {                
                el.style.lineHeight = '25px';
                el.style.padding = '3px 0';
            }
            else {
                el.style.padding = '4px 0 8px 0';
            }
            return el;
        },*/
     getFormControl (label, input, description, infoText) {
      let ctrl
      const { type } = input
  
      /* Checkboxes get wrapped in p elements. */
      if (type && (type === 'checkbox' || type === 'radio')) {
        ctrl = document.createElement('p')
        if (label) {
          const span = document.createElement('span')
          span.innerHTML = label.innerHTML
          label.innerHTML = ''
          label.setAttribute('for', input.id)
          ctrl.appendChild(label)
          label.appendChild(input)
          label.appendChild(span)
        } else {
          ctrl.appendChild(input)
          ctrl.style.padding = '4px 0 8px 0';
        }
  
        return ctrl
      }
  
      /* Anything else gets wrapped in divs. */
      ctrl = super.getFormControl(label, input, description, infoText)
  
      /* Color needs special attention. */
      if (type && type === 'color') {
        input.style.height = '3rem'
        input.style.width = '100%'
        input.style.margin = '5px 0 20px 0'
        input.style.padding = '3px'
  
        if (label) {
          label.style.transform = 'translateY(-14px) scale(0.8)'
          label.style['-webkit-transform'] = 'translateY(-14px) scale(0.8)'
          label.style['-webkit-transform-origin'] = '0 0'
          label.style['transform-origin'] = '0 0'
        }
      }
  
      return ctrl
    }

    getDescription (text) {
      const el = document.createElement('div')
      el.classList.add('grey-text')
      el.style.fontSize = '.9em'; 
      /* el.style.marginTop = '-15px' */
      if (window.DOMPurify) {
        el.innerHTML = window.DOMPurify.sanitize(text)}      
      else {
        el.textContent = this.cleanText(text)}
        
      return el
    }

  /**
  * Gets a wrapped button element.
  *
  * @returns {HTMLElement} The wrapped button element.
  */
  getButtonHolder () {
    return document.createElement('span')
  }

  getFormInputField (type) {
    const el = super.getFormInputField(type)
    el.style.setProperty('margin-bottom', '5px', 'important'); 
    return el;
  }

  getCheckbox () {
    const el = this.getFormInputField('checkbox')
    el.style.display = 'inline-block'
    el.style.width = 'auto'
    el.className = 'filled-in'
    return el
  }

/*  getCheckboxLabel (text, req) {
    const el = document.createElement('label')
    el.appendChild(document.createTextNode(`\u00A0${text}`))
    if (req) el.classList.add('required')
    return el
  }*/

  getCheckboxLabel (text, req) {
    var el = this.getFormInputLabel('')
    el.style = ''
    el.className = 'checkbox'
    el.style.fontWeight = 'normal'
    el.style.color = 'black'
    el.style.display = 'block'
    el.style.setProperty('font-size', 'inherit', 'important')
    el.style.cursor = 'pointer'
    var spanEl = document.createElement('span')
    el.appendChild(spanEl)
    var labelDescription = document.createElement('span')
    labelDescription.className = 'ch'
    labelDescription.textContent = text
    labelDescription.style.verticalAlign = '10px'
    el.appendChild(labelDescription)

    if (req) el.classList.add('required')
    return el
  }

  getTable () {
    const el = super.getTable()
    el.classList.add('je-table')
    return el
  }

  /**
   * Adds an error message to the specified input element.
   *
   * @param {HTMLElement} input The input element that caused the error.
   * @param {string} text The error message.
   */
   addInputError (input, text) {
    /* Get the parent element. Should most likely be a <div class="input-field" ... />. */
    const parent = input.parentNode

    if (!parent) {
      return}      

    /* Remove any previous error. */
    this.removeInputError(input)

    /* Append an error message div. */
    const el = document.createElement('div')
    el.classList.add('error-text', 'red-text')
    el.textContent = text
    parent.appendChild(el)
  }

  /**
   * Removes any error message from the specified input element.
   *
   * @param {HTMLElement} input The input element that previously caused the error.
   */
   removeInputError (input) {
    /* Get the parent element. Should most likely be a <div class="input-field" ... />. */
    const parent = input.parentElement

    if (!parent) {
      return
    }

    /* Remove all elements having class .error-text. */
    const els = parent.getElementsByClassName('error-text')
    for (let i = 0; i < els.length; i++) { parent.removeChild(els[i]) }
  }

  ///////////////////////////////////////////////////////////

  
  /**
   * Gets the tab holder element.
   *
   * @returns {HTMLElement} The tab holder component.
   * @see https://github.com/Dogfalo/materialize/issues/2542#issuecomment-233458602
   */
   getTabHolder () {
    const html = [
      '<div class="col s2">',
      '   <ul class="tabs" style="height: auto; margin-top: 0.82rem; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; display: -webkit-flex; display: flex;">',
      '   </ul>',
      '</div>',
      '<div class="col s10">',
      '<div>'
    ].join('\n')

    const el = document.createElement('div')
    el.classList.add('row', 'card-panel')
    el.innerHTML = html
    return el
  }

  /**
 * Add specified tab to specified holder element.
 *
 * @param {HTMLElement} holder The tab holder element.
 * @param {HTMLElement} tab The tab to add.
 */
  addTab (holder, tab) {
    holder.children[0].children[0].appendChild(tab)
  }

  /**
   * Gets a single tab element.
   *
   * @param {HTMLElement} span The tab's content.
   * @returns {HTMLElement} The tab element.
   * @see https://github.com/Dogfalo/materialize/issues/2542#issuecomment-233458602
   */
  getTab (span) {
    const el = document.createElement('li')
    el.classList.add('tab')
    el.style = el.style || {}
    this.applyStyles(el,
      {
        width: '100%',
        textAlign: 'left',
        lineHeight: '24px',
        height: '24px',
        fontSize: '14px',
        cursor: 'pointer'
      }
    )
    el.appendChild(span)
    return el
  }

  /**
   * Marks specified tab as active.
   *
   * @returns {HTMLElement} The tab element.
   * @see https://github.com/Dogfalo/materialize/issues/2542#issuecomment-233458602
   */
  markTabActive (tab) {
    tab.style = tab.style || {}
    this.applyStyles(tab,
      {
        width: '100%',
        textAlign: 'left',
        lineHeight: '24px',
        height: '24px',
        fontSize: '14px',
        cursor: 'pointer',
        color: 'rgba(238,110,115,1)',
        transition: 'border-color .5s ease',
        borderRight: '3px solid #424242'
      }
    )
  }

  /**
   * Marks specified tab as inactive.
   *
   * @returns {HTMLElement} The tab element.
   * @see https://github.com/Dogfalo/materialize/issues/2542#issuecomment-233458602
   */
  markTabInactive (tab) {
    tab.style = tab.style || {}
    this.applyStyles(tab,
      {
        width: '100%',
        textAlign: 'left',
        lineHeight: '24px',
        height: '24px',
        fontSize: '14px',
        cursor: 'pointer',
        color: 'rgba(238,110,115,0.7)'
      }
    )
  }

  /**
   * Returns the element that holds the tab contents.
   *
   * @param {HTMLElement} tabHolder The full tab holder element.
   * @returns {HTMLElement} The content element inside specified tab holder.
   */
  getTabContentHolder (tabHolder) {
    return tabHolder.children[1]
  }

  /**
   * Creates and returns a tab content element.
   *
   * @returns {HTMLElement} The new tab content element.
   */
  getTabContent () {
    return document.createElement('div')
  }
}

/* Custom stylesheet rules. format: "selector" : "CSS rules" */
zenidTheme.rules = rules
