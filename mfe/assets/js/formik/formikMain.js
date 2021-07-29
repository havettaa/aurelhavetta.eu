export class formikMain {
  constructor(instance) {
    this.instance = instance;
    this.container = document.createElement("div");
    this.fields = document.createElement("div");
  }

  init() {
    console.log(`formikMain: init`);
  }

  icon() {
    console.log(`formikMain: icon`);

    let wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");
    let icon = document.createElement("span");
    icon.setAttribute("class", "icon");
    icon.setAttribute("tabindex", 0);
    let info = document.createElement("span");
    info.setAttribute("class", "info");

    // Take attribute content and put it inside the info span
    info.textContent =
      "Pop up description help. Take attribute content and put it inside the info span.";

    // Insert icon
    let img = document.createElement("img");
    img.src = "assets/images/logo.svg";
    icon.appendChild(img);

    let style = document.createElement("style");
    style.textContent = `
        .wrapper {
          position: relative;
        }
        
        .info {
          font-size: 0.8rem;
          width: 200px;
          display: inline-block;
          border: 1px solid black;
          padding: 10px;
          background: white;
          border-radius: 10px;
          opacity: 0;
          transition: 0.6s all;
          position: absolute;
          bottom: 20px;
          left: 10px;
          z-index: 3;
        }
        
        img {
          width: 1.2rem;
        }
        
        .icon:hover + .info, .icon:focus + .info {
          opacity: 1;
        }`;

    // attach the created elements to the shadow dom
    wrapper.appendChild(style);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);

    return wrapper;
  }

  createForm() {
    console.log(`formikMain: form`);

    // Container div

    // Form Header
    const header = document.createElement("div");
    header.setAttribute("class", "ui attached message");
    const title = document.createElement("div");
    title.setAttribute("class", "header");
    title.textContent = "Title";
    const desc = document.createElement("p");
    desc.textContent = "Form Description";
    header.appendChild(title);
    header.appendChild(desc);
    this.container.appendChild(header);

    // Form content
    const form = document.createElement("form");
    form.setAttribute("class", "ui form attached fluid segment");
    form.setAttribute("method", "post");
    form.setAttribute("action", "submit.php");
    this.container.appendChild(form);

    // Fields
    form.appendChild(this.fields);

    // Submit Button
    const submit = document.createElement("div");
    submit.setAttribute("class", "m-4 ui blue submit button content");
    submit.textContent = `Submit`;
    form.appendChild(submit);

    // Bottom Message
    const bottom = document.createElement("div");
    bottom.setAttribute("class", "ui bottom attached warning message");
    const icon = document.createElement("i");
    icon.setAttribute("class", "icon warning");
    const icontxt = document.createElement("b");
    bottom.innerHTML = `<i class="icon warning"></i>Validation errors: <i>Red fields</i> are empty.`;
    this.container.appendChild(bottom);

    this.update(``);

    return this.container;
  }

  
  update(data) {
    console.log(`formikMain: update`);

    this.fields.innerHTML = ``;

    if (!data) return;

    data = JSON.parse(data);
    console.table(data.value[0]);

    for (let i in data.value[0])
    {
      const div = document.createElement("div");
      div.setAttribute("class", "field");
      this.fields.appendChild(div);

      const label = document.createElement("label");
      label.textContent = i;
      div.appendChild(label);

      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("name", i);
      input.setAttribute("placeholder", i);
      input.setAttribute("value", data.value[0][i]);
      div.appendChild(input);
    }
  }
}
