class ClipboardCopy extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
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
          justify-items: center;
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

        #stateNormal,
        #stateCopied {
          display: inline-block;
          text-align: center;
          white-space: nowrap;
        }

        #stateNormal {
          position: absolute;
        }

        #stateCopied {
          visibility: hidden;
        }

        :host(.copied) #stateNormal {
          visibility: hidden;
        }
        :host(.copied) #stateCopied {
          visibility: visible;
        }
      </style>
      <div id="container">
        <button id="buttonCopy" title="Copy to clipboard">
          <div id="stateCopied">✓ Copied</div>
          <div id="stateNormal">📋 Copy</div>
        </button>
      </div>
      <slot></slot>
    `;

    this.buttonCopy = this.shadowRoot.getElementById("buttonCopy");

    this.buttonCopy.addEventListener("pointerdown", () => {
      const text = this.textContent.trim() + "\n";
      navigator.clipboard.writeText(text);
      this.classList.toggle("copied", true);
      setTimeout(() => {
        this.classList.toggle("copied", false);
      }, 2000);
    });

    // If clipboard isn't available (e.g., Safari via http), hide the button.
    if (!navigator.clipboard) {
      this.buttonCopy.style.display = "none";
    }
  }
}

customElements.define("clipboard-copy", ClipboardCopy);
