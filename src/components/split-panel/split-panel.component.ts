import { clamp } from '../../internal/math.js';
import { drag } from '../../internal/drag.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LocalizeController } from '../../utilities/localize.js';
import { property, query } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './split-panel.styles.js';
import type { CSSResultGroup } from 'lit';

export interface SnapFunctionParams {
  /** The position the divider has been dragged to, in pixels. */
  pos: number;
  /** The size of the split-panel across its primary axis, in pixels. */
  size: number;
  /** The snap-threshold passed to the split-panel, in pixels. May be infinity. */
  snapThreshold: number;
  /** Whether or not the user-agent is RTL. */
  isRtl: boolean;
  /** Whether or not the split panel is vertical. */
  vertical: boolean;
}

/** Used by sl-split-panel to convert an input position into a snapped position. */
export type SnapFunction = (opt: SnapFunctionParams) => number | null;

/** A SnapFunction which performs no snapping. */
export const SNAP_NONE = () => null;

/**
 * @summary Split panels display two adjacent panels, allowing the user to reposition them.
 * @documentation https://shoelace.style/components/split-panel
 * @status unstyled
 * @since 2.0
 *
 * @event sl-reposition - Emitted when the divider's position changes.
 *
 * @slot start - Content to place in the start panel.
 * @slot end - Content to place in the end panel.
 * @slot divider - The divider. Useful for slotting in a custom icon that renders as a handle.
 *
 * @csspart start - The start panel.
 * @csspart end - The end panel.
 * @csspart panel - Targets both the start and end panels.
 * @csspart divider - The divider that separates the start and end panels.
 *
 * @cssproperty [--divider-width=4px] - The width of the visible divider.
 * @cssproperty [--divider-hit-area=12px] - The invisible region around the divider where dragging can occur. This is
 *  usually wider than the divider to facilitate easier dragging.
 * @cssproperty [--min=0] - The minimum allowed size of the primary panel.
 * @cssproperty [--max=100%] - The maximum allowed size of the primary panel.
 */
export default class SlSplitPanel extends ShoelaceElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  private cachedPositionInPixels: number;
  private isCollapsed = false;
  private readonly localize = new LocalizeController(this);
  private positionBeforeCollapsing = 0;
  private resizeObserver: ResizeObserver;
  private size: number;

  @query('.divider') divider: HTMLElement;

  /**
   * The current position of the divider from the primary panel's edge as a percentage 0-100. Defaults to 50% of the
   * container's initial size.
   */
  @property({ type: Number, reflect: true }) position = 50;

  /** The current position of the divider from the primary panel's edge in pixels. */
  @property({ attribute: 'position-in-pixels', type: Number }) positionInPixels: number;

  /** Draws the split panel in a vertical orientation with the start and end panels stacked. */
  @property({ type: Boolean, reflect: true }) vertical = false;

  /** Disables resizing. Note that the position may still change as a result of resizing the host element. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * If no primary panel is designated, both panels will resize proportionally when the host element is resized. If a
   * primary panel is designated, it will maintain its size and the other panel will grow or shrink as needed when the
   * host element is resized.
   */
  @property() primary?: 'start' | 'end';

  // Returned when the property is queried, so that string 'snap's are preserved.
  private snapValue: string | SnapFunction = '';
  // Actually used for computing snap points. All string snaps are converted via `toSnapFunction`.
  private snapFunction: SnapFunction = SNAP_NONE;

  /**
   * Converts a string containing either a series of fixed/repeated snap points (e.g. "repeat(20%)", "100px 200px 800px", or "10% 50% repeat(10px)") into a SnapFunction. `SnapFunction`s take in a `SnapFunctionOpts` and return the position that the split panel should snap to.
   *
   * @param snap - The snap string.
   * @returns a `SnapFunction` representing the snap string's logic.
   */
  private toSnapFunction(snap: string): SnapFunction {
    const snapPoints = snap.split(' ');

    return ({ pos, size, snapThreshold, isRtl, vertical }) => {
      let newPos = pos;
      let minDistance = Number.POSITIVE_INFINITY;

      snapPoints.forEach(value => {
        let snapPoint: number;

        if (value.startsWith('repeat(')) {
          const repeatVal = snap.substring('repeat('.length, snap.length - 1);
          const isPercent = repeatVal.endsWith('%');
          const repeatNum = Number.parseFloat(repeatVal);
          const snapIntervalPx = isPercent ? size * (repeatNum / 100) : repeatNum;
          snapPoint = Math.round((isRtl && !vertical ? size - pos : pos) / snapIntervalPx) * snapIntervalPx;
        } else if (value.endsWith('%')) {
          snapPoint = size * (Number.parseFloat(value) / 100);
        } else {
          snapPoint = Number.parseFloat(value);
        }

        if (isRtl && !vertical) {
          snapPoint = size - snapPoint;
        }

        const distance = Math.abs(pos - snapPoint);

        if (distance <= snapThreshold && distance < minDistance) {
          newPos = snapPoint;
          minDistance = distance;
        }
      });

      return newPos;
    };
  }

  /**
   * Either one or more space-separated values at which the divider should snap, in pixels, percentages, or repeat expressions e.g. `'100px 50% 500px' or `repeat(50%) 10px`,
   * or a function which takes in a `SnapFunctionParams`, and returns a position to snap to, e.g. `({ pos }) => Math.round(pos / 8) * 8`.
   */
  @property({ reflect: true })
  set snap(snap: string | SnapFunction | null | undefined) {
    this.snapValue = snap ?? '';
    if (snap) {
      this.snapFunction = typeof snap === 'string' ? this.toSnapFunction(snap) : snap;
    } else {
      this.snapFunction = SNAP_NONE;
    }
  }

  get snap(): string | SnapFunction {
    return this.snapValue;
  }

  /** How close the divider must be to a snap point until snapping occurs. */
  @property({ type: Number, attribute: 'snap-threshold' }) snapThreshold = 12;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(entries => this.handleResize(entries));
    this.updateComplete.then(() => this.resizeObserver.observe(this));

    this.detectSize();
    this.cachedPositionInPixels = this.percentageToPixels(this.position);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.unobserve(this);
  }

  private detectSize() {
    const { width, height } = this.getBoundingClientRect();
    this.size = this.vertical ? height : width;
  }

  private percentageToPixels(value: number) {
    return this.size * (value / 100);
  }

  private pixelsToPercentage(value: number) {
    return (value / this.size) * 100;
  }

  private handleDrag(event: PointerEvent) {
    const isRtl = this.localize.dir() === 'rtl';

    if (this.disabled) {
      return;
    }

    // Prevent text selection when dragging
    if (event.cancelable) {
      event.preventDefault();
    }

    drag(this, {
      onMove: (x, y) => {
        let newPositionInPixels = this.vertical ? y : x;

        // Flip for end panels
        if (this.primary === 'end') {
          newPositionInPixels = this.size - newPositionInPixels;
        }

        // Check snap points
        newPositionInPixels =
          this.snapFunction({
            pos: newPositionInPixels,
            size: this.size,
            snapThreshold: this.snapThreshold,
            isRtl: isRtl,
            vertical: this.vertical
          }) ?? newPositionInPixels;

        this.position = clamp(this.pixelsToPercentage(newPositionInPixels), 0, 100);
      },
      initialEvent: event
    });
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter'].includes(event.key)) {
      let newPosition = this.position;
      const incr = (event.shiftKey ? 10 : 1) * (this.primary === 'end' ? -1 : 1);

      event.preventDefault();

      if ((event.key === 'ArrowLeft' && !this.vertical) || (event.key === 'ArrowUp' && this.vertical)) {
        newPosition -= incr;
      }

      if ((event.key === 'ArrowRight' && !this.vertical) || (event.key === 'ArrowDown' && this.vertical)) {
        newPosition += incr;
      }

      if (event.key === 'Home') {
        newPosition = this.primary === 'end' ? 100 : 0;
      }

      if (event.key === 'End') {
        newPosition = this.primary === 'end' ? 0 : 100;
      }

      // Collapse/expand the primary panel when enter is pressed
      if (event.key === 'Enter') {
        if (this.isCollapsed) {
          newPosition = this.positionBeforeCollapsing;
          this.isCollapsed = false;
        } else {
          const positionBeforeCollapsing = this.position;

          newPosition = 0;

          // Wait for position to update before setting the collapsed state
          requestAnimationFrame(() => {
            this.isCollapsed = true;
            this.positionBeforeCollapsing = positionBeforeCollapsing;
          });
        }
      }

      this.position = clamp(newPosition, 0, 100);
    }
  }

  private handleResize(entries: ResizeObserverEntry[]) {
    const { width, height } = entries[0].contentRect;
    this.size = this.vertical ? height : width;

    // There's some weird logic that gets `this.cachedPositionInPixels = NaN` or `this.position === Infinity` when
    // a split-panel goes from `display: none;` to showing.
    if (isNaN(this.cachedPositionInPixels) || this.position === Infinity) {
      this.cachedPositionInPixels = Number(this.getAttribute('position-in-pixels'));
      this.positionInPixels = Number(this.getAttribute('position-in-pixels'));
      this.position = this.pixelsToPercentage(this.positionInPixels);
    }

    // Resize when a primary panel is set
    if (this.primary) {
      this.position = this.pixelsToPercentage(this.cachedPositionInPixels);
    }
  }

  @watch('position')
  handlePositionChange() {
    this.cachedPositionInPixels = this.percentageToPixels(this.position);
    this.isCollapsed = false;
    this.positionBeforeCollapsing = 0;
    this.positionInPixels = this.percentageToPixels(this.position);
    this.emit('sl-reposition');
  }

  @watch('positionInPixels')
  handlePositionInPixelsChange() {
    this.position = this.pixelsToPercentage(this.positionInPixels);
  }

  @watch('vertical')
  handleVerticalChange() {
    this.detectSize();
  }

  render() {
    const gridTemplate = this.vertical ? 'gridTemplateRows' : 'gridTemplateColumns';
    const gridTemplateAlt = this.vertical ? 'gridTemplateColumns' : 'gridTemplateRows';
    const isRtl = this.localize.dir() === 'rtl';
    const primary = `
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `;
    const secondary = 'auto';

    if (this.primary === 'end') {
      if (isRtl && !this.vertical) {
        this.style[gridTemplate] = `${primary} var(--divider-width) ${secondary}`;
      } else {
        this.style[gridTemplate] = `${secondary} var(--divider-width) ${primary}`;
      }
    } else {
      if (isRtl && !this.vertical) {
        this.style[gridTemplate] = `${secondary} var(--divider-width) ${primary}`;
      } else {
        this.style[gridTemplate] = `${primary} var(--divider-width) ${secondary}`;
      }
    }

    // Unset the alt grid template property
    this.style[gridTemplateAlt] = '';

    return html`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${ifDefined(this.disabled ? undefined : '0')}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term('resize')}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-split-panel': SlSplitPanel;
  }
}
