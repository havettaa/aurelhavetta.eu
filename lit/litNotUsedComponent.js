import { store, getStateText, setStateText } from "/store.js";

export class litNotUsedComponent extends HTMLElement
{
  constructor() {
    super();
    this._statedata = `InitialData`;

    const shadowRoot = this.attachShadow({ mode: "open" });

    const script = document.createElement('script');
    script.textContent = `
      function btnGetState(){
        import("/store.js").then(lib => console.log(lib.getStateText()) );
      }
      function btnSetState(){
        import("/store.js").then(lib => lib.setStateText("|" + lib.store.objState.myString) );
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
        this.localSetData(newVal);
      else
        console.log(`Unknown attribute ${name} changed to ${newVal}`);
    }
  }

  localSetData(newData) {
    console.log(`localSetData ${this._statedata} setting to ${newData}`);
    this._statedata = newData;
    this.container.innerHTML = this.render();
  }


  render() {
    return `
    <link href="https://unpkg.com/tailwindcss@1.0/dist/tailwind.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/daisyui@latest/dist/full.css" rel="stylesheet" type="text/css" />
    <section class="flex flex-row">
      <input name="statedata" label="statedata" value="${this._statedata}" class="input w-full max-w-xs"></input>
      <button class='btn btn-accent' onclick="btnGetState()">Get</button>
      <button class='btn btn-accent' onclick="btnSetState()">Set</button>
    </section>
    `;
  }
}

window.customElements.define("ui-litnotusedcomponent", litNotUsedComponent);