import { getState, setState } from "https://aurelhavetta.eu/mfe/store.js";

export class litNotUsedComponent extends HTMLElement
{
  constructor() {
    console.log(`litNotUsedComponent: constructor`);
    super();
    this._statedata = `Constructor initial data`;

    const shadowRoot = this.attachShadow({ mode: "open" });

    const script = document.createElement('script');
    script.textContent = `
      function btnGetState(){
        import("https://aurelhavetta.eu/mfe/store.js").then(store => console.log(store.getState()) );
      }
      function btnSetState(){
        import("https://aurelhavetta.eu/mfe/store.js").then(store => store.setState("setState " + store.state) );
      }
      `;
    shadowRoot.appendChild(script);

    this.container = document.createElement("div");
    this.container.innerHTML = this.render();
    shadowRoot.appendChild(this.container);

    console.warn(getState());
    setState("litNotUsedComponent state constructor");
    console.warn(getState());
  }

  static get observedAttributes() {
    return ["statedata"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      if (name == `statedata`)
        this.setData(newVal);
      else
        console.log(`Unknown attribute ${name} changed to ${newVal}`);
    }
  }

  setData(newData) {
    console.log(`setData ${this._statedata} setting to ${newData}`);
    this._statedata = newData;
    this.container.innerHTML = this.render();
  }

  render() {
    return `
      <input name="statedata" label="statedata" value="${this._statedata}"></input>
      <button onclick="btnGetState()">Get statedata</button>
      <button onclick="btnSetState()">Set statedata</button>
    `;
  }
}

window.customElements.define("ui-litnotusedcomponent", litNotUsedComponent);
