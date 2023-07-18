import { store, getState, setState } from "./store.js";

export class litNotUsedComponent extends HTMLElement
{
  constructor() {
    super();
    this._statedata = `Constructor set _statedata`;

    const shadowRoot = this.attachShadow({ mode: "open" });

    const script = document.createElement('script');
    script.textContent = `
      function btnGetState(){
        import("./store.js").then(lib => console.log(lib.getState()) );
      }
      function btnSetState(){
        import("./store.js").then(lib => lib.setState("setState " + lib.store.objState) );
      }
      `;
    shadowRoot.appendChild(script);

    this.container = document.createElement("div");
    this.container.innerHTML = this.render();
    shadowRoot.appendChild(this.container);
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
    <link href="https://unpkg.com/tailwindcss@1.0/dist/tailwind.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/daisyui@latest/dist/full.css" rel="stylesheet" type="text/css" />
    <div>Statedata = ${this._statedata}</div>
    <input name="statedata" label="statedata" value="${this._statedata}"></input>
    <button class='btn btn-accent' onclick="btnGetState()">Get</button>
    <button class='btn btn-accent' onclick="btnSetState()">Set</button>
    `;
  }
}

window.customElements.define("ui-litnotusedcomponent", litNotUsedComponent);
