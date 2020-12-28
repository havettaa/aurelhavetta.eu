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
  
  connectedCallback() {
    super.connectedCallback();

    this.now = Date.now();
    this.interval = window.setInterval(() => {
      this.now = Date.now();
    }, 100);
  }
    
  render() {
    return html`<b>${this.name}</b> <br>
     <i>vonkajsia hodnota:</i> <code>${this.vonkajsia}</code> <br>
     <i>z vnutra nastavene:</i> <code>${this.now}</code> <br>`;
  }
}

customElements.define('my-component', MyComponent);