import { LitElement, html, css } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';
//import { LitElement, html, property, customElement } from 'lit-element';

export class MyComponent extends LitElement {

  static get properties() {
    return { 
      now: { type: String },
      name: { type: String },
      vonkajsia: { type: String },
    };
  }
  
  async connectedCallback() {
    super.connectedCallback();

    await fetch('benji.html').then((res) => this.someHTML = res.text());
    console.warn(this.someHTML);

    this.now = Date.now();
    this.interval = window.setInterval(() => {
      this.now = Date.now();
    }, 100);
  }
    
  render() {
    return html`<sl-spinner></sl-spinner> <b>${this.name}</b> <br>
      <i>outer value:</i> <code>${this.vonkajsia}</code> <br>
      <i>inner value:</i> <code>${this.now}</code> <br>`;
  }
}

customElements.define('my-component', MyComponent);