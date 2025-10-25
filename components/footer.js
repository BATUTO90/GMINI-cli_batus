class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm text-white text-center p-4">
                <p>&copy; 2024 Gemini AI. All rights reserved. | Created by <a href="https://github.com/BATUTO90" target="_blank" class="text-blue-400 hover:underline">BATUTO90</a></p>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);
