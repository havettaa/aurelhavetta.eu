import { getState, setState } from "//aurelhavetta.eu/mfe/store.js";

export class webComponent extends HTMLElement
{
  constructor() {
    console.log(`webComponent: constructor`);
    
    super();
    
    this._data = `Initial data`;

    const shadowRoot = this.attachShadow({ mode: "open" });


    const script = document.createElement('script');
    script.textContent = `function btnClick(){
      console.log("web-component setting state");
      import("//aurelhavetta.eu/mfe/store.js").then(store => store.setState("web-component state btnClick") );
      }`;
    shadowRoot.appendChild(script);


    this.container = document.createElement("div");
    this.container.innerHTML = this.render();
    // this.container.addEventListener("click", function() {
    //   setTimeout(function() {
    //     document.dispatchEvent(new CustomEvent("publishNewState", { detail: { storeName: "city", value: {x:1,y:2} } }));
    //   }, 1000);
    // });
    shadowRoot.appendChild(this.container);

    console.warn(getState());
    setState("web-component state constructor");
    console.warn(getState());
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(`webComponent: attributeChangedCallback oldVal=${oldVal} | newVal=${newVal}`);

    if (oldVal !== newVal) {
      if (name == `data`)
        this.setData(newVal);
      else
        console.log(`Unknown attribute ${name} changed to ${newVal}`);
    }
  }

  setData(newData) {
    console.log(`setData ${this._data} setting to ${newData}`);

    this._data = newData;

    this.container.innerHTML = this.render();
  }

  render() {
    return `
<sl-tab-group placement="right">

  <sl-tab slot="nav" panel="form">Form</sl-tab>
  <sl-tab slot="nav" panel="buttons">Buttons</sl-tab>
  <sl-tab slot="nav" panel="tooltip">Dropdown</sl-tab>
  <sl-tab slot="nav" panel="qrcode">QR code</sl-tab>


  <sl-tab-panel name="form">
    <sl-form class="formly">
      <sl-input name="name" label="Name" required></sl-input>
      <sl-input id="dataInput" name="data" label="Data" value="${this._data}"></sl-input>
      <sl-checkbox required>Check me before submitting</sl-checkbox>
      <sl-button type="primary" submit>Submit</sl-button>
    </sl-form>
  </sl-tab-panel>


  <sl-tab-panel name="buttons">
    <div onclick="btnClick()">
      <sl-tag type="primary">Primary</sl-tag>
      <sl-tag type="success">Success</sl-tag>
      <sl-tag type="info">Info</sl-tag>
      <sl-tag type="warning">Warning</sl-tag>
      <sl-tag type="danger">Danger</sl-tag>
      <hr />
      <sl-button type="primary" size="small" circle><sl-icon name="gear"></sl-icon></sl-button>
      <sl-button type="success" size="medium" circle><sl-icon name="gear"></sl-icon></sl-button>
      <sl-button type="danger" size="large" circle><sl-icon name="gear"></sl-icon></sl-button>
    </div>
  </sl-tab-panel>


  <sl-tab-panel name="tooltip">
    <sl-dropdown>
      <sl-button slot="trigger" caret>Dropdown</sl-button>
      <sl-menu>
        <sl-menu-item>Dropdown Item 1</sl-menu-item>
        <sl-menu-item>Dropdown Item 2</sl-menu-item>
        <sl-menu-item>Dropdown Item 3</sl-menu-item>
        <sl-menu-divider></sl-menu-divider>
        <sl-menu-item checked>Checked</sl-menu-item>
        <sl-menu-item disabled>Disabled</sl-menu-item>
        <sl-menu-divider></sl-menu-divider>
        <sl-menu-item>
          Prefix
          <sl-icon slot="prefix" name="gift"></sl-icon>
        </sl-menu-item>
        <sl-menu-item>
          Suffix Icon
          <sl-icon slot="suffix" name="heart"></sl-icon>
        </sl-menu-item>
      </sl-menu>   
    </sl-dropdown>

    <sl-alert open>
      <sl-icon slot="icon" name="info-circle"></sl-icon>
      This is a standard alert. You can customize its content and even the icon.
    </sl-alert>
  </sl-tab-panel>


  <sl-tab-panel name="qrcode">
    <sl-qr-code value="${this._data}" label="Scan this code to visit Shoelace on the web!"></sl-qr-code>
  </sl-tab-panel>

</sl-tab-group>
`;
  }
}


window.customElements.define("web-component", webComponent);
