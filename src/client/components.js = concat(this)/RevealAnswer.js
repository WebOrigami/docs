class RevealAnswer extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: var(--color-canvas-subtle);
          border-radius: 6px;
          position: relative;
        }

        #buttonContainer {
          align-items: center;
          display: grid;
          height: 100%;
          justify-items: center;
          position: absolute;
          width: 100%;
          z-index: 1;
        }

        #buttonReveal {
          background: var(--color-canvas-subtle);
          border-radius: 0.25em;
          border: 1px solid rgba(0, 0, 0, 0.2);
          color: #333;
          cursor: pointer;
          font-family: inherit;
          font-size: smaller;
          font-weight: inherit;
          padding: 0.3em 0.5em;
          user-select: none;
        }

        #buttonReveal:hover {
          background: rgba(255, 255, 255, 0.5);
          border-color: rgba(0, 0, 0, 0.1);
          color: inherit;
          filter: initial;
        }

        :host(:not(.show)) #answer {
          filter: blur(10px);
        }

        :host(.show) #buttonContainer {
          display: none;
        }
      </style>
      <div id="buttonContainer">
        <button id="buttonReveal">Show solution</button>
      </div>
      <clipboard-copy id="answer">
        <slot></slot>
      </clipboard-copy>
    `;

    this.buttonReveal = this.shadowRoot.getElementById("buttonReveal");
    this.answer = this.shadowRoot.getElementById("answer");

    this.buttonReveal.addEventListener("pointerdown", () => {
      this.classList.add("show");
    });
  }
}

customElements.define("reveal-answer", RevealAnswer);
