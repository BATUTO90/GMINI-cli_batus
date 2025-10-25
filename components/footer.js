class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <!-- Tu código del footer -->
    `;
  }
}
customElements.define('custom-footer', CustomFooter);
