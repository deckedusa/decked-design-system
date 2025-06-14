---
meta:
  title: 'DECKED Design System'
  description: Hand-crafted custom elements for any occasion.
toc: false
---

<!--
<div class="splash">
<div class="splash-start">
<img class="splash-logo" src="/assets/images/wordmark.svg" alt="Shoelace">

# <sl-visually-hidden>Shoelace:</sl-visually-hidden> A forward-thinking library of web components.

- Works with all frameworks 🧩
- Works with CDNs 🚛
- Fully customizable with CSS 🎨
- Includes a dark theme 🌛
- Built with accessibility in mind ♿️
- First-class [React support](/frameworks/react) ⚛️
- Built-in localization 💬
- Open source 😸
- [More awesome than ever](https://blog.fontawesome.com/shoelace-joins-font-awesome/) ![Awesome emoji](/assets/images/awesome.svg)

</div>
<div class="splash-end">
<img class="splash-image" src="/assets/images/undraw-content-team.svg" alt="Cartoon of people assembling components while standing on a giant laptop.">
</div>
</div>

<div class="badges">

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@decked/decked-design-system/badge)](https://www.jsdelivr.com/package/npm/@decked/decked-design-system)
[![npm](https://img.shields.io/npm/dw/@decked/decked-design-system?label=npm&style=flat-square)](https://www.npmjs.com/package/@decked/decked-design-system)
[![License](https://img.shields.io/badge/license-MIT-232323.svg?style=flat-square)](https://github.com/shoelace-style/shoelace/blob/next/LICENSE.md)<br>
[![Discord](https://img.shields.io/badge/Discord-Join%20the%20chat-5965f2.svg?style=flat-square&logo=discord&logoColor=white)](https://discord.gg/mg8f26C)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-00acee.svg?style=flat-square&logo=twitter&logoColor=white)](https://twitter.com/shoelace_style)
[![Sponsor](https://img.shields.io/badge/GitHub-Code-232323.svg?style=flat-square&logo=github&logoColor=white)](https://github.com/shoelace-style/shoelace)

</div> -->

## DECKED Design System

Welcome to the DECKED Design System. This is a customized set of components and guidelines to use on DECKED websites to maintain brand consistancy and high quality user experience across all of our platforms. This is a fork of the [Shoelace.](https://shoelace.style/)

:::tip
This is still a work in progress, we are in the process of restyling the defatul Shoelace components for DECKED use. If you see any issues, or need a component styled please email [rgallagher@decked.com.](mailto:rgallagher@decked.com)
:::

## Quick Start

Add the following code to your page.

<!-- prettier-ignore -->
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@decked/decked-design-system@%VERSION%/%CDNDIR%/themes/light.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@decked/decked-design-system@%VERSION%/%CDNDIR%/shoelace-autoloader.js"></script>
```

Now you have access to all of DECKED's components! Try adding a button:

```html:preview:expanded:no-codepen
<sl-button>Click me</sl-button>
```

:::tip
This will activate Shoelace's experimental autoloader, which registers components on the fly as you use them. To learn more about it, or for other ways to install Shoelace, refer to the [installation instructions](getting-started/installation).
:::

## New to Web Components?

**TL;DR** – we finally have a way to create [our own HTML elements](https://html.spec.whatwg.org/multipage/custom-elements.html) and use them in any framework we want!

Thanks to the popularity of frameworks such as Angular, Vue, and React, component-driven development has become a part of our every day lives. Components help us encapsulate styles and behaviors into reusable building blocks. They make a lot of sense in terms of design, development, and testing.

Unfortunately, _framework-specific_ components fail us in a number of ways:

- You can only use them in the framework they're designed for 🔒
- Their lifespan is limited to that of the framework's ⏳
- New frameworks/versions can lead to breaking changes, requiring substantial effort to update components 😭

Web components solve these problems. They're [supported by all modern browsers](https://caniuse.com/#feat=custom-elementsv1), they're framework-agnostic, and they're [part of the standard](https://developer.mozilla.org/en-US/docs/Web/Web_Components), so we know they'll be supported for many years to come.

This is the technology that Shoelace is built on.

## What Problem Does This Solve?

Shoelace provides a collection of professionally designed, highly customizable UI components built on a framework agnostic technology. Why spend hundreds of hours (or more) building a design system from scratch? Why make a component library that only works with one framework?

With Shoelace, you can:

- Start building things faster (no need to roll your own buttons)
- Build multiple apps with different frameworks that all share the same UI components
- Fully customize components to match your existing designs
- Incrementally adopt components as needed (no need to ditch your framework)
- Upgrade or switch frameworks without rebuilding foundational components

If your organization is looking to build a design system, [Shoelace will save you thousands of dollars](https://medium.com/eightshapes-llc/and-you-thought-buttons-were-easy-26eb5b5c1871). All the foundational components you need are right here, ready to be customized for your brand. And since it's built on web standards, browsers will continue to support it for many years to come.

Whether you use Shoelace as a starting point for your organization's design system or for a fun personal project, there's no limit to what you can do with it.

## Browser Support

Shoelace is tested in the latest two versions of the following browsers.

<img src="/assets/images/chrome.png" alt="Chrome" width="64" height="64">
<img src="/assets/images/edge.png" alt="Edge" width="64" height="64">
<img src="/assets/images/firefox.png" alt="Firefox" width="64" height="64">
<img src="/assets/images/opera.png" alt="Opera" width="64" height="64">
<img src="/assets/images/safari.png" alt="Safari" width="64" height="64">

Critical bug fixes in earlier versions will be addressed based on their severity and impact.

If you need to support IE11 or pre-Chromium Edge, this library isn't for you. Although web components can (to some degree) be polyfilled for legacy browsers, supporting them is outside the scope of this project. If you're using Shoelace in such a browser, you're gonna have a bad time. ⛷

## License

Shoelace was created in New Hampshire by [Cory LaViska](https://twitter.com/cory_laviska). It's available under the terms of the [MIT license](https://github.com/shoelace-style/shoelace/blob/next/LICENSE.md).

## Attribution

Special thanks to the following projects and individuals that help make Shoelace possible.

- Components are built with [Lit](https://lit.dev/)
- Component metadata is generated by the [Custom Elements Manifest Analyzer](https://github.com/open-wc/custom-elements-manifest)
- Documentation is powered by [11ty](https://www.11ty.dev/)
- CDN services are provided by [jsDelivr](https://www.jsdelivr.com/)
- Color primitives are inspired by [Tailwind](https://tailwindcss.com/)
- Icons are courtesy of [Bootstrap Icons](https://icons.getbootstrap.com/)
- The homepage illustration is courtesy of [unDraw](https://undraw.co/)
- Positioning of dropdowns, tooltips, et al is handled by [Floating UI](https://floating-ui.com/)
- Animations are courtesy of [animate.css](https://animate.style/)
- Search is powered by [Lunr](https://lunrjs.com/)
- The Shoelace logo was designed with a single shoelace by [Adam K Olson](https://twitter.com/adamkolson)
