# DECKED Design System

A custom libary of components designed to work for the DECKED web platforms.

- Works with all frameworks 🧩
- Works with CDNs 🚛
- Fully customizable with CSS 🎨
- Includes an official dark theme 🌛
- Built with accessibility in mind ♿️
- Open source 😸

Built by Ryan Gallagher. Based on [Shoelace](https://shoelace.style) designed in New Hampshire by [Cory LaViska](https://twitter.com/cory_laviska).

---

Documentation: [DECKED Design System](https://deckedusa.github.io/decked-design-system/)

Source: [github.com/deckedusa/decked-design-system](https://decked-design-system.dev.decked.com)

---

## Shoemakers 🥾

Shoemakers, or "Shoelace developers," can use this documentation to learn how to build Shoelace from source. You will need Node >= 14.17 to build and run the project locally.

**You don't need to do any of this to use Shoelace!** This page is for people who want to contribute to the project, tinker with the source, or create a custom build of Shoelace.

If that's not what you're trying to do, the [documentation website](https://deckedusa.github.io/decked-design-system/) is where you want to be.

### What are you using to build DECKED Shoelace?

Components are built with [LitElement](https://lit-element.polymer-project.org/), a custom elements base class that provides an intuitive API and reactive data binding. The build is a custom script with bundling powered by [esbuild](https://esbuild.github.io/).

### Developing

Once you've cloned the repo, run the following command.

```bash
npm start
```

This will spin up the dev server. After the initial build, a browser will open automatically. There is currently no hot module reloading (HMR), as browser's don't provide a way to reregister custom elements, but most changes to the source will reload the browser automatically.

### Building

To generate a production build, run the following command.

```bash
npm run build
```

### Creating New Components

To scaffold a new component, run the following command, replacing `sl-tag-name` with the desired tag name.

```bash
npm run create sl-tag-name
```

This will generate a source file, a stylesheet, and a docs page for you. When you start the dev server, you'll find the new component in the "Components" section of the sidebar.
