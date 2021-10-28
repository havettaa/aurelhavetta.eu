import { formikMain } from "./formikMain.js";

export class formik extends HTMLElement
{
  constructor() {
    console.log(`formik: constructor`);

    super();
    
    this.main = new formikMain(this);

    const shadowRoot = this.attachShadow({ mode: "open" });

    const formikTemplate = document.createElement("template");
    formikTemplate.innerHTML = `
    <link rel="stylesheet" href="assets/css/tailwind.min.css">
    <link rel="stylesheet" href="assets/css/semantic.fonts.css">
    <link rel="stylesheet" href="assets/css/semantic.min.css">
    <script type="module" src="assets/js/formik/formikPlugin.js"></script>
    `;
    
    shadowRoot.appendChild(formikTemplate.content.cloneNode(true));
    // shadowRoot.appendChild(this.main.icon());
    shadowRoot.appendChild(this.main.createForm());
  }

  static get observedAttributes() {
    return ["uniqueid", "indata"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(`formik: attributeChangedCallback`);

    if (oldVal !== newVal) {
      if (name == `indata`)
        this.main.update(newVal);
      else
        console.log(`${name} changed to ${newVal}`);
    }
  }

  disconnectedCallback() {
    console.log(`formik: disconnectedCallback`);
  }

  connectedCallback() {
    console.log(`formik: connectedCallback`);
  }
}

if (!customElements.get('formik-js'))
  window.customElements.define("formik-js", formik);
else
  console.warn('formik-js customElement already defined')