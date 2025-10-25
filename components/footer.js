class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(10px);
          color: rgba(255, 255, 255, 0.7);
          padding: 2rem;
          text-align: center;
          margin-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .footer-links a:hover {
          color: #4ADE80;
        }
        .copyright {
          font-size: 0.875rem;
        }
        @media (max-width: 768px) {
          footer {
            padding: 1.5rem 1rem;
          }
          .footer-links {
            gap: 1rem;
          }
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="footer-links">
            <a href="#"><i data-feather="shield"></i> Privacy</a>
            <a href="#"><i data-feather="file-text"></i> Terms</a>
            <a href="#"><i data-feather="book"></i> Documentation</a>
            <a href="https://github.com" target="_blank"><i data-feather="github"></i> GitHub</a>
          </div>
          <div class="copyright">
            &copy; ${new Date().getFullYear()} Gemini AI Terminal. All rights reserved.
          </div>
        </div>
      </footer>
    `;
    
    // Reemplazar iconos después de que el componente se renderice
    setTimeout(() => {
      if (window.feather) {
        window.feather.replace();
      }
    }, 100);
  }
}

customElements.define('custom-footer', CustomFooter);
