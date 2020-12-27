import { LitElement, html, css } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';

class componentik extends LitElement {
  static get properties() {
    return { 
      now: { type: String }
    };
  }
  
  connectedCallback() {
    // be sure to call the super
    super.connectedCallback();
    this.now = Date.now();
    this.interval = window.setInterval(() => {
      this.now = Date.now();
    }, 50);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.interval);
  }

  render() {
    return html`
<sl-tab-group placement="right">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="tooltip">Dropdown</sl-tab>
  <sl-tab slot="nav" panel="card">Card</sl-tab>


  <sl-tab-panel name="general">
    <sl-form class="formly">
      <sl-input name="name" label="Name" required>${this.now}</sl-input>
      <sl-select label="Favorite Animal" clearable required>
        <sl-menu-item value="birds">Birds</sl-menu-item>
        <sl-menu-item value="cats">Cats</sl-menu-item>
        <sl-menu-item value="dogs">Dogs</sl-menu-item>
        <sl-menu-item value="other">Other</sl-menu-item>
      </sl-select>
      <sl-checkbox required>Check me before submitting</sl-checkbox>
      <sl-button type="primary" submit>Submit</sl-button>
    </sl-form>
  </sl-tab-panel>


  <sl-tab-panel name="custom">
    <sl-tag type="primary">Primary</sl-tag>
    <sl-tag type="success">Success</sl-tag>
    <sl-tag type="info">Info</sl-tag>
    <sl-tag type="warning">Warning</sl-tag>
    <sl-tag type="danger">Danger</sl-tag>
    <div class="skeleton-effects">
      <sl-skeleton effect="sheen"></sl-skeleton>
      Sheen

      <sl-skeleton effect="pulse"></sl-skeleton>
      Pulse

      <sl-skeleton effect="none"></sl-skeleton>
      None
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


  <sl-tab-panel name="card">
    <custom-input width="50%" inputId="my-input"></custom-input>
    <custom-dropdown></custom-dropdown>
  </sl-tab-panel>
  


</sl-tab-group>
`;
  }
}

customElements.define('custom-componentik', componentik);