---
meta:
  title: Icon
  description: Icons are symbols that can be used to represent various options within an application.
layout: component
---

The design system ships with over 1,500 icons from the [Lucide](https://lucide.dev/) project. These icons are part of the `default` icon library. If you need more, you can register your own icons individually or as a [custom icon library](#icon-libraries).

:::tip
Depending on how you're loading the design system, you may need to copy icon assets and/or [set the base path](/getting-started/installation/#setting-the-base-path) so icons can be located. Otherwise, icons may not appear and you'll see 404 Not Found errors in the dev console.
:::

## Default Icons

All available icons in the `default` icon library are shown below. Click or tap on any icon to copy its name, then you can use it in your HTML like this.

```html
<sl-icon name="icon-name-here"></sl-icon>
```

<div class="icon-search">
  <div class="icon-search-controls">
    <sl-input placeholder="Search Icons" clearable>
      <sl-icon slot="prefix" name="search"></sl-icon>
    </sl-input>
  </div>
  <div class="icon-list"></div>
  <input type="text" class="icon-copy-input" aria-hidden="true" tabindex="-1">
</div>

## Examples

### Colors

Icons inherit their color from the current text color. Thus, you can set the `color` property on the `<sl-icon>` element or an ancestor to change the color.

```html:preview
<div style="color: #4a90e2;">
  <sl-icon name="triangle-alert"></sl-icon>
  <sl-icon name="archive"></sl-icon>
  <sl-icon name="battery-charging"></sl-icon>
  <sl-icon name="bell"></sl-icon>
</div>
<div style="color: #9013fe;">
  <sl-icon name="clock"></sl-icon>
  <sl-icon name="cloud"></sl-icon>
  <sl-icon name="download"></sl-icon>
  <sl-icon name="file"></sl-icon>
</div>
<div style="color: #417505;">
  <sl-icon name="flag"></sl-icon>
  <sl-icon name="heart"></sl-icon>
  <sl-icon name="image"></sl-icon>
  <sl-icon name="zap"></sl-icon>
</div>
<div style="color: #f5a623;">
  <sl-icon name="mic"></sl-icon>
  <sl-icon name="search"></sl-icon>
  <sl-icon name="star"></sl-icon>
  <sl-icon name="trash"></sl-icon>
</div>
```

{% raw %}

```jsx:react
import SlIcon from '@decked/decked-design-system/dist/react/icon';

const App = () => (
  <>
    <div style={{ color: '#4a90e2' }}>
      <SlIcon name="triangle-alert"></SlIcon>
      <SlIcon name="archive"></SlIcon>
      <SlIcon name="battery-charging"></SlIcon>
      <SlIcon name="bell"></SlIcon>
    </div>
    <div style={{ color: '#9013fe' }}>
      <SlIcon name="clock"></SlIcon>
      <SlIcon name="cloud"></SlIcon>
      <SlIcon name="download"></SlIcon>
      <SlIcon name="file"></SlIcon>
    </div>
    <div style={{ color: '#417505' }}>
      <SlIcon name="flag"></SlIcon>
      <SlIcon name="heart"></SlIcon>
      <SlIcon name="image"></SlIcon>
      <SlIcon name="zap"></SlIcon>
    </div>
    <div style={{ color: '#f5a623' }}>
      <SlIcon name="mic"></SlIcon>
      <SlIcon name="search"></SlIcon>
      <SlIcon name="star"></SlIcon>
      <SlIcon name="trash"></SlIcon>
    </div>
  </>
);
```

{% endraw %}

### Sizing

Icons are sized relative to the current font size. To change their size, set the `font-size` property on the icon itself or on a parent element as shown below.

```html:preview
<div style="font-size: 32px;">
  <sl-icon name="triangle-alert"></sl-icon>
  <sl-icon name="archive"></sl-icon>
  <sl-icon name="battery-charging"></sl-icon>
  <sl-icon name="bell"></sl-icon>
  <sl-icon name="clock"></sl-icon>
  <sl-icon name="cloud"></sl-icon>
  <sl-icon name="download"></sl-icon>
  <sl-icon name="file"></sl-icon>
  <sl-icon name="flag"></sl-icon>
  <sl-icon name="heart"></sl-icon>
  <sl-icon name="image"></sl-icon>
  <sl-icon name="zap"></sl-icon>
  <sl-icon name="mic"></sl-icon>
  <sl-icon name="search"></sl-icon>
  <sl-icon name="star"></sl-icon>
  <sl-icon name="trash"></sl-icon>
</div>
```

{% raw %}

```jsx:react
import SlIcon from '@decked/decked-design-system/dist/react/icon';

const App = () => (
  <div style={{ fontSize: '32px' }}>
    <SlIcon name="triangle-alert" />
    <SlIcon name="archive" />
    <SlIcon name="battery-charging" />
    <SlIcon name="bell" />
    <SlIcon name="clock" />
    <SlIcon name="cloud" />
    <SlIcon name="download" />
    <SlIcon name="file" />
    <SlIcon name="flag" />
    <SlIcon name="heart" />
    <SlIcon name="image" />
    <SlIcon name="zap" />
    <SlIcon name="mic" />
    <SlIcon name="search" />
    <SlIcon name="star" />
    <SlIcon name="trash" />
  </div>
);
```

{% endraw %}

### Labels

For non-decorative icons, use the `label` attribute to announce it to assistive devices.

```html:preview
<sl-icon name="star" label="Add to favorites"></sl-icon>
```

```jsx:react
import SlIcon from '@decked/decked-design-system/dist/react/icon';

const App = () => <SlIcon name="star" label="Add to favorites" />;
```

### Custom Icons

Custom icons can be loaded individually with the `src` attribute. Only SVGs on a local or CORS-enabled endpoint are supported. If you're using more than one custom icon, register a [custom icon library](#icon-libraries) instead.

```html:preview
<sl-icon src="/assets/images/shoe.svg" style="font-size: 8rem;"></sl-icon>
```

{% raw %}

```jsx:react
import SlIcon from '@decked/decked-design-system/dist/react/icon';

const App = () => <SlIcon src="/assets/images/shoe.svg" style={{ fontSize: '8rem' }}></SlIcon>;
```

{% endraw %}

## Icon Libraries

If you have a set of custom icons you want to use throughout your app, register them as an icon library. Icon files can be local or on a CORS-enabled endpoint. There is no limit to how many icon libraries you can register, and there is no cost to registering them — individual icons are only fetched when used.

Two libraries are built in:

- **`default`** — the Lucide icon set, served from your local assets directory.
- **`system`** — a small set of icons used internally by components. These are inlined as data URIs to guarantee availability.

To register an additional library, use `registerIconLibrary()` from `utilities/icon-library.js`. At minimum, provide a name and a `resolver` function that maps an icon name to a URL.

If needed, a `mutator` function can modify the SVG element before rendering — useful for ensuring `fill="currentColor"` or `stroke="currentColor"` so icons inherit text color.

Here's an example registering an icon library located in your `/assets/icons` directory:

```html
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('my-icons', {
    resolver: name => `/assets/icons/${name}.svg`,
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>
```

To display an icon from your library, set the `library` and `name` attributes on `<sl-icon>`:

```html
<!-- This will show the icon located at /assets/icons/smile.svg -->
<sl-icon library="my-icons" name="smile"></sl-icon>
```

If an icon is referenced before its library is registered, it will be empty initially and shown when registration occurs.

### Customizing the Default Library

The `default` library is what `<sl-icon>` resolves when you don't specify a `library` attribute. If you want to swap it for your own set of icons, register a library named `default`:

```html
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('default', {
    resolver: name => `/path/to/your/icons/${name}.svg`,
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>
```

#### Using SVG Sprites

To reduce the number of network requests, you can serve an SVG sprite sheet and reference individual icons via hash selectors. The browser loads the sprite once and reuses it.

Benchmark before adopting — over HTTP/2, many small requests can be more bandwidth-friendly than one large sprite.

:::danger
When using sprite sheets, the `sl-load` and `sl-error` events will not fire.
:::

:::danger
Browsers apply same-origin policy to `<use>` references in shadow DOM and may refuse to load cross-origin sprites. Self-host your sprite sheets.
:::

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('sprite', {
    resolver: name => `/assets/images/sprite.svg#${name}`,
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
    spriteSheet: true
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="sprite" name="clock"></sl-icon>
  <sl-icon library="sprite" name="zap"></sl-icon>
</div>
```

### Customizing the System Library

The `system` library contains the icons used internally by components. Unlike the default library, its icons are inlined as data URIs and don't depend on any physical assets.

If you want to replace these icons, register a library named `system` and provide all the icons components rely on. See [src/components/icon/library.system.ts](https://github.com/decked-style/decked-design-system/blob/main/src/components/icon/library.system.ts) for the complete list.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('system', {
    resolver: name => `/path/to/custom/icons/${name}.svg`
  });
</script>
```

<!-- Supporting scripts and styles for the search utility -->
<script>
  function wrapWithTooltip(item) {
    const tooltip = document.createElement('sl-tooltip');
    tooltip.content = item.getAttribute('data-name');

    // Close open tooltips
    document.querySelectorAll('.icon-list sl-tooltip[open]').forEach(tooltip => tooltip.hide());

    // Wrap it with a tooltip and trick it into showing up
    item.parentNode.insertBefore(tooltip, item);
    tooltip.appendChild(item);
    requestAnimationFrame(() => tooltip.dispatchEvent(new MouseEvent('mouseover')));
  }

  fetch('/dist/assets/icons/icons.json')
    .then(res => res.json())
    .then(icons => {
      const container = document.querySelector('.icon-search');
      const input = container.querySelector('sl-input');
      const copyInput = container.querySelector('.icon-copy-input');
      const list = container.querySelector('.icon-list');
      let inputTimeout;

      // Generate icons
      icons.map(i => {
        const item = document.createElement('div');
        item.classList.add('icon-list-item');
        item.setAttribute('data-name', i.name);
        item.setAttribute('data-terms', [i.name, i.title, ...(i.tags || []), ...(i.categories || [])].join(' '));
        item.innerHTML = `
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <use href="/assets/images/sprite.svg#${i.name}"></use>
          </svg>
        `;
        list.appendChild(item);

        // Wrap it with a tooltip the first time the mouse lands on it. We do this instead of baking them into the DOM
        // to improve this page's performance. See: https://github.com/shoelace-style/shoelace/issues/1122
        item.addEventListener('mouseover', () => wrapWithTooltip(item), { once: true });

        // Copy on click
        item.addEventListener('click', () => {
          const tooltip = item.closest('sl-tooltip');
          copyInput.value = i.name;
          copyInput.select();
          document.execCommand('copy');

          if (tooltip) {
            tooltip.content = 'Copied!';
            setTimeout(() => tooltip.content = i.name, 1000);
          }
        });
      });

      // Filter as the user types
      input.addEventListener('sl-input', () => {
        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(() => {
          [...list.querySelectorAll('.icon-list-item')].map(item => {
            const filter = input.value.toLowerCase();
            if (filter === '') {
              item.hidden = false;
            } else {
              const terms = item.getAttribute('data-terms').toLowerCase();
              item.hidden = terms.indexOf(filter) < 0;
            }
          });
        }, 250);
      });
    });
</script>

<style>
  .icon-search {
    border: solid 1px var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-medium);
  }

  .icon-search [hidden] {
    display: none;
  }

  .icon-search-controls {
    display: flex;
  }

  .icon-search-controls sl-input {
    flex: 1 1 auto;
  }

  .icon-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 30vh;
  }

  .icon-list {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    position: relative;
    margin-top: 1rem;
  }

  .icon-loader[hidden],
  .icon-list[hidden] {
    display: none;
  }

  .icon-list-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--sl-border-radius-medium);
    font-size: 24px;
    width: 2em;
    height: 2em;
    margin: 0 auto;
    cursor: copy;
    transition: var(--sl-transition-medium) all;
  }

  .icon-list-item:hover {
    background-color: var(--sl-color-primary-50);
    color: var(--sl-color-primary-600);
  }

  .icon-copy-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  @media screen and (max-width: 1000px) {
    .icon-list {
      grid-template-columns: repeat(8, 1fr);
    }

    .icon-list-item {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 500px) {
    .icon-list {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
