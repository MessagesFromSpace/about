# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static GitHub Pages site for *Messages from Space*, an immersive art installation. The entire site is a single file: `index.html`, with no build tools, dependencies, or framework.

## Development

Open `index.html` directly in a browser — no build step or server required. To preview with live reload you can use any static file server, e.g.:

```bash
python3 -m http.server 8000
```

## Architecture

Everything lives in `index.html`:

- **CSS** (`:root` custom properties, layout, animations) — inline in `<style>`
- **Canvas starfield** — drawn via `requestAnimationFrame` loop on a fixed `<canvas>`
- **Cosmic ray flash** — randomized radial-gradient overlay triggered on a Poisson-like timer (`scheduleRay`) every 3–15 seconds; increments the footer counter
- **Scroll animations** — `IntersectionObserver` adds `.visible` to `.fade-in-up` and `.timeline-item` elements as they enter the viewport

## Design tokens

Colors are defined as CSS custom properties in `:root`: `--cosmic` (#b8a0ff), `--pulse` (#ff9060), `--signal` (#60d4ff) are the primary accent colors. Typography uses *Cormorant Garamond* (serif headings) and *DM Mono* (body/labels), both loaded from Google Fonts.

## Deployment

Pushing to `main` deploys automatically via GitHub Pages.
