import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
  }

  .badge {
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-bold);
    letter-spacing: var(--sl-letter-spacing-losser);
    line-height: 1;
    border-radius: var(--sl-border-radius-medium);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: var(--sl-spacing-x-small) var(--sl-spacing-small);
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--dds-color-primary);
    color: var(--dds-color-primary-inverse);
  }

  .badge--secondary {
    background-color: var(--dds-fender-dirt);
    color: var(--dds-white);
  }

  .badge--neutral {
    background-color: var(--dds-color-foreground);
    color: var(--dds-color-background);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-400);
    color: var(--dds-white);
  }

  .badge--danger {
    background-color: var(--dds-red);
    color: var(--dds-white);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;
