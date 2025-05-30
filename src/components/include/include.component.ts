import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { requestInclude } from './request.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './include.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Includes give you the power to embed external HTML files into the page.
 * @documentation https://shoelace.style/components/include
 * @status unstyled
 * @since 2.0
 *
 * @event sl-load - Emitted when the included file is loaded.
 * @event {{ status: number }} sl-error - Emitted when the included file fails to load due to an error.
 */
export default class SlInclude extends ShoelaceElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  /**
   * The location of the HTML file to include. Be sure you trust the content you are including as it will be executed as
   * code and can result in XSS attacks.
   */
  @property() src: string;

  /** The fetch mode to use. */
  @property() mode: 'cors' | 'no-cors' | 'same-origin' = 'cors';

  /**
   * Allows included scripts to be executed. Be sure you trust the content you are including as it will be executed as
   * code and can result in XSS attacks.
   */
  @property({ attribute: 'allow-scripts', type: Boolean }) allowScripts = false;

  private executeScript(script: HTMLScriptElement) {
    // Create a copy of the script and swap it out so the browser executes it
    const newScript = document.createElement('script');
    [...script.attributes].forEach(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.textContent = script.textContent;
    script.parentNode!.replaceChild(newScript, script);
  }

  @watch('src')
  async handleSrcChange() {
    try {
      const src = this.src;
      const file = await requestInclude(src, this.mode);

      // If the src changed since the request started do nothing, otherwise we risk overwriting a subsequent response
      if (src !== this.src) {
        return;
      }

      if (!file.ok) {
        this.emit('sl-error', { detail: { status: file.status } });
        return;
      }

      this.innerHTML = file.html;

      if (this.allowScripts) {
        [...this.querySelectorAll('script')].forEach(script => this.executeScript(script));
      }

      this.emit('sl-load');
    } catch {
      this.emit('sl-error', { detail: { status: -1 } });
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}
