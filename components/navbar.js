class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <!-- Tu código del navbar -->
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);
