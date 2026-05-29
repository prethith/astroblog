# Authoring guide

How to write posts and use the custom components on this blog. Posts are MDX
files in `src/content/posts/`. Because they're MDX, you can mix Markdown with raw
HTML/JSX whenever you need a component.

## New post

Create `src/content/posts/my-post.mdx`. The filename becomes the URL slug
(`/writing/my-post`). Every post needs this frontmatter:

```mdx
---
title: "Your title"
description: "One-sentence summary (shown in lists and used for SEO/RSS)."
pubDate: 2025-03-01
tag: programming
---

Your first paragraph...
```

`tag` must be one of the values in the enum in `src/content.config.ts`
(`programming`, `politics`, `history`, `data`). Adding a new tag is described
under [Tags](#tags) below.

## Footnotes

Standard Markdown footnote syntax (auto-numbered by `remark-gfm`, like Hugo).
Put a marker inline and the definition anywhere in the file:

```mdx
The network covered ~85,000 km.[^length]

[^length]: This counts only the major state-built trunk roads.
```

The label (`length`) is just an internal id — never shown. Markers render as
`[1]`, `[2]`… in reading order, and a footnotes list is appended to the post.

Behaviour is wired up in `src/layouts/MarkdownLayout.astro`:

- **Desktop** — hovering (or focusing) a marker shows a tooltip with the note;
  clicking jumps to the footnotes list.
- **Mobile** — tapping a marker opens a bottom drawer (with a close button).

You don't need to do anything to get this — it applies to every post with
footnotes automatically.

## Images & figures

Drop the image in `public/images/` and reference it with a leading slash. Use a
`<figure>` so you get a styled caption:

```mdx
<figure>
    <img src="/images/my-photo.jpg" alt="Describe the image." loading="lazy" decoding="async" width="1280" height="851" />
    <figcaption>Caption text. <span class="figure-credit">Photo: Name, License</span></figcaption>
</figure>
```

- Always set `alt`, and `width`/`height` (prevents layout shift).
- `<span class="figure-credit">` is dimmed and flows inline after the caption.

### Full-bleed images

Add `class="full-bleed"` to the `<figure>` to let it break out past the text
column to the wider grid:

```mdx
<figure class="full-bleed">
    <img src="/images/wide.jpg" alt="..." loading="lazy" width="1600" height="900" />
    <figcaption>Caption spans the full image width.</figcaption>
</figure>
```

Keep source images reasonable (≈1280–1600px wide, prefer `.webp`/`.jpg` over
large `.png`). See `roman-roads.mdx` for a working example.

## Tags

The tag → colour mapping lives in **one place**, `src/styles/layout-style.css`,
under "Canonical tag → colour mapping". To add a topic:

1. Add it to the `tag` enum in `src/content.config.ts`.
2. Add one line to the mapping, pointing at an accent pair:

   ```css
   [data-tag="science"] { --tag-bg: var(--accent-5); --tag-bg-hover: var(--accent-5-hover); }
   ```

Both the post-meta chip and the list chips read `--tag-bg`, so that single line
colours the tag everywhere. (Optionally add the tag to the filter buttons in
`src/components/PostList.astro`.)

## Link / photo of the week

The box above the post list on the homepage is `src/components/Featured.astro`.
Edit its props in `src/pages/index.astro`:

```astro
<Featured
    title="Article or photo title"
    url="https://example.com/essay"
    source="example.com"
/>
```

Optional props: `label` (defaults to "link of the week") and `image` (a
thumbnail URL — handy for a *photo* of the week).

## Reading list

The `/reading` page is driven by a plain list in `src/data/books.ts`. Add a book
with its ISBN; the cover is pulled from Open Library automatically — no API key:

```ts
{ title: 'Book Title', author: 'Author', isbn: '9780000000000', status: 'reading' },
```

`status` is `'reading'` or `'read'` (controls which section it appears in). If
Open Library has no cover for an ISBN, set an explicit `cover: '...'` URL.

## Local development

```bash
pnpm dev      # local server with hot reload
pnpm build    # production build into dist/
pnpm preview  # serve the built site
```

Before deploying, set your real domain in `astro.config.mjs` (`site:`) so RSS and
canonical URLs are correct.
