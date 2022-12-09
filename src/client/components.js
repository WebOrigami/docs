class ClipboardCopy extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
          --icon-size: 1.2em;
        }

        #buttonCopy {
          align-items: center;
          background: transparent;
          border: 1px solid transparent;
          color: #666;
          display: grid;
          filter: grayscale(100%);
          font-family: inherit;
          font-size: smaller;
          font-weight: inherit;
          gap: 0.2em;
          grid-template-columns: var(--icon-size) auto;
          grid-template-rows: var(--icon-size);
          padding: 0.3em 0.5em;
          position: absolute;
          right: 0;
        }

        #buttonCopy:hover {
          background: rgba(255, 255, 255, 0.5);
          border-color: rgba(0, 0, 0, 0.1);
          color: inherit;
          filter: initial;
        }

        #clipboard,
        #checkmark {
          display: inline-block;
          text-align: center;
        }

        #checkmark {
          display: none;
        }
      </style>
      <div id="container">
        <button id="buttonCopy" title="Copy to clipboard">
          <div id="icon">
            <span id="checkmark">✓</span>
            <span id="clipboard">📋</span>
          </div>
          <span>Copy</span>
        </button>
      </div>
      <slot></slot>
    `;

    this.buttonCopy = this.shadowRoot.getElementById("buttonCopy");
    this.clipboard = this.shadowRoot.getElementById("clipboard");
    this.checkmark = this.shadowRoot.getElementById("checkmark");

    this.buttonCopy.addEventListener("pointerdown", () => {
      const text = this.textContent.trim() + "\n";
      navigator.clipboard.writeText(text);
      this.clipboard.style.display = "none";
      this.checkmark.style.display = "inline-block";
      setTimeout(() => {
        this.clipboard.style.display = "inline-block";
        this.checkmark.style.display = "none";
      }, 2000);
    });

    // If clipboard isn't available (e.g., Safari via http), hide the button.
    if (!navigator.clipboard) {
      this.buttonCopy.style.display = "none";
    }
  }
}

customElements.define("clipboard-copy", ClipboardCopy);
