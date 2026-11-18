# JGZUS

A personal portfolio for the handle JGZUS: one page about learning to build on the web and onchain. The live site is [https://jgzus.github.io](https://jgzus.github.io).

The page identifies its owner only as JGZUS. Do not add a real name, location, email, phone, or employer to the site, this file, or commit messages.

## How GitHub Pages serves this site

This repository is a GitHub Pages user site. The repository name `jgzus.github.io` is what makes GitHub publish it at `https://jgzus.github.io`.

Pages is set to deploy from the **main** branch, from the repository **root** (`/`). There is no build step and no framework. A browser request is served like this:

1. Someone opens `https://jgzus.github.io/`.
2. GitHub Pages returns `index.html` from the root of `main`.
3. The browser follows the links in that file and loads `styles.css` and `script.js` from the same site.
4. `script.js` reads the `projects` array and adds one card per entry to the Projects section.

A push to `main` starts a Pages rebuild. The public site updates after that build finishes. A pull request does not change the live site until it is merged.

The empty `.nojekyll` file tells GitHub Pages to skip Jekyll and serve these files as they are. Without it, Pages would run the Markdown-oriented Jekyll builder, which this plain HTML site does not need.

## File layout

| File | What it does |
| --- | --- |
| `index.html` | Page structure: header, hero, About, Skills / Currently learning, Projects, and the footer. |
| `styles.css` | Dark theme, layout, and the rules that adapt the page to a narrow screen. |
| `script.js` | The project list, and the code that turns each entry into a card. |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages. |
| `README.md` | This guide. |

Skills are written as HTML in `index.html`. Projects are not. They come from the array at the top of `script.js`, so adding a card does not mean copying markup.

## How to add a new project card

Open `script.js` and find the `projects` array. Each object is one card. The array order is the order on the page. Add an object:

```js
{
  title: "Short name",
  summary: "One or two sentences about the project.",
  tags: ["JavaScript", "Solidity"],
  url: "https://github.com/jgzus/some-repo",
  status: "live",
  linkLabel: "View project",
}
```

- `status: "coming-soon"` and `url: ""` show a Coming soon label and no link. Use this while the work does not exist yet.
- `status: "live"` plus an `http://` or `https://` url shows a Live label and a link. `linkLabel` is the link text, for example `View source` or `View project`.
- A coming-soon card ignores `url` until you change `status` to `"live"`.
- `title` is required. An entry without one is skipped, and the browser console explains why.
- Save, commit, and merge into `main`. Reload the site after Pages finishes building.

To turn a placeholder into a real project, edit that object in place: write the real title and summary, set `status` to `"live"`, and add the url.

## View it on your computer

No install is required. From this folder, start a static file server and open the address it prints:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

Opening `index.html` directly in a browser also works for reading the page. Serving it over HTTP is closer to the way GitHub Pages works.
