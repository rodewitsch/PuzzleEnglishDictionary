/**
 * Custom element for displaying a pronunciation button.
 * @element pronunciation-button
 */
class PronunciationButton extends HTMLElement {
  /**
   * Creates an instance of PronunciationButton.
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    /**
     * Renders the pronunciation button.
     * @returns {Promise<boolean>} A promise that resolves to true when the pronunciation button is rendered.
     */
    this.render = async () => {
      const TEMPLATE = document.createElement('template');

      const [STYLE, SVG] = await Promise.all([
        CorePuzzleEnglishDictionaryModule.getTextAsset(`/content/components/showTranslate/pronunciationButton/pronunciationButton.css`),
        CorePuzzleEnglishDictionaryModule.getTextAsset(`/assets/audio-button.svg`),
      ]);

      TEMPLATE.innerHTML = `
        <style>${STYLE}</style>
        ${SVG}
      `;

      this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
      return true;
    }
  }

  /**
   * Called when the element is added to the document.
   */
  connectedCallback() {
    /**
     * Changes the current speaker when the button is clicked.
     */
    this.addEventListener('click', () => {
      const speakers = ExtStore.translation.word_speakers.slice(0, 8);
      ExtStore.currentSpeaker = ExtStore.currentSpeaker === speakers.length - 1 ? 0 : ExtStore.currentSpeaker + 1;
    });
    if (!this.rendered) this.rendered = this.render();
  }
}

customElements.define('pronunciation-button', PronunciationButton);