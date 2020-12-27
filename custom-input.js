import { LitElement, html, css } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';

class CustomInput extends LitElement {
  render() {
    return html`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
          box-sizing: border-box;
        }

        input {
          background: #ffffff;
          border-radius: 20px;
          border-style: none;
          font-size: 15px;
          font-family: Roboto;
          font-style: normal;
          font-weight: bold;
          line-height: normal;
          width: ${this.width};
          border: 1px solid lightgrey;
          padding: 5px;
          padding-left: 10px;
          box-sizing: inherit;
        }

        input:focus {
          outline: none;
          box-shadow: 0 0 0 1px blue;
        }
      </style>
      <input
        id="${this.inputId}"
        type="text"
        .value="${this.cityProp}"
        @input="${this.handleInput}"
      />
    `;
  }

  static get properties() {
    return {
      cityProp: {
        name: "cityProp",
        type: "String",
        value: " ",
        reflect: true,
        attribute: true,
        observer: false
      },
      inputId: {
        name: "inputId",
        type: "String",
        value: " ",
        reflectToAttribute: false,
        observer: false
      },
      width: {
        name: "width",
        type: "String",
        value: " ",
        reflectToAttribute: false,
        observer: false
      }
    };
  }

  constructor() {
    super();
    this.cityProp = "";
    this.inputId = "";
    this.width = "100%";
  }

  handleInput(e) {
    this.cityProp = e.target.value;
  }

}

customElements.define("custom-input", CustomInput);
export { CustomInput };