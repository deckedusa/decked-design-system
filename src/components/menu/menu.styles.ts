import { css } from 'lit';

export default css`
  :host {
    display: block;
    position: relative;
    overflow: auto;
    overscroll-behavior: none;
  }

  .menu__panel {
    font-size: var(--sl-font-size-small);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    min-height: 100%;
    box-sizing: border-box;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`;
