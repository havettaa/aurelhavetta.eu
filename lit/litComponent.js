import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@latest/+esm';

import { store, getStateText, setStateText } from "/store.js";

export class LitComponent extends LitElement
{
  static get properties() {
    return {
      data: { type: String, reflect: true },
      closed: { type: Boolean, reflect: true },
      options: { type: Array }
    };
  }

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });

    this.data = '';
    this.options = ['German', 'English', 'France'];
    this.closed = true;
  }

  toggle() {
    this.closed = !this.closed;
    this.data = getStateText();
    this.options.push(`${store.obj.refState.myString} - ${getStateText()} , ${new Date().getMilliseconds()}`);
  }

  handleMenuOption(event, option) {
    this.value = option;

    setStateText(this.value);

    console.log(this.root.getElementById("ck1").checked);

    const customEvent = new CustomEvent('selectionChanged', {
      detail: {
        option: this.value
      }
    });
    this.dispatchEvent(customEvent);
  }

  render() {
    return html`
      <link href="https://unpkg.com/tailwindcss@1.0/dist/tailwind.min.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/daisyui@latest/dist/full.css" rel="stylesheet" type="text/css" />
      <div>Store: ${store.objState.myString} ref: ${store.obj.refState.myString}</div>
      <input name="data" label="data" value="${this.data}"></input>
      <button class='btn btn-primary' @click='${this.toggle}'>toggle</button>
      <div>Value: ${this.value} <label>${this.closed ? 'checked' : ''}</label></div>
      <input id="ck1" type="checkbox" class="toggle toggle-primary" ${this.closed ? 'checked' : ''}>
      <ul class="menu bg-base-200 w-56">${this.options.map(option => html`<li><a @click='${(e) => this.handleMenuOption(e, option)}'>${option}</a></li>`)}</ul>
      `;
  }
}

window.customElements.define('ui-litcomponent', LitComponent);