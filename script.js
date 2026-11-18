/*
  JGZUS portfolio — project cards.

  This file has two jobs:
  1. Hold the list of projects (the array below).
  2. Turn that list into HTML and put it in the empty <ul id="project-list">.

  The script is loaded with defer, so it runs after index.html has been read
  and the list element already exists.

  How to add a project
  --------------------
  Copy one of the objects, paste it where you want it in the list, and edit
  the fields. The page shows the objects in this order, top to bottom.

  Fields:
  - title       Short name. Required.
  - summary     One or two sentences.
  - tags        Short labels, usually the technologies used.
  - url         An http(s) link, or "" when there is nothing to open yet.
  - status      "live" or "coming-soon".
  - linkLabel   Words for the link, such as "View source". Only used when
                the card is live and has a url.

  A "coming-soon" card always shows the Coming soon label and never shows a
  link, even if a url is filled in. Change status to "live" when it is ready.
*/

const projects = [
  {
    title: "JGZUS portfolio",
    summary:
      "This website. A single page of plain HTML, CSS, and JavaScript, published with GitHub Pages.",
    tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    url: "https://github.com/jgzus/jgzus.github.io",
    status: "live",
    linkLabel: "View source",
  },
  {
    title: "First testnet contract",
    summary:
      "A small Solidity contract, deployed to a testnet, with notes on what it does. Not started yet.",
    tags: ["Solidity", "Testnet"],
    url: "",
    status: "coming-soon",
  },
  {
    title: "A small dApp",
    summary:
      "A page that reads a contract from the browser. Planned after the contract basics are in place.",
    tags: ["JavaScript", "Web3"],
    url: "",
    status: "coming-soon",
  },
];

const STATUS_LABELS = {
  live: "Live",
  "coming-soon": "Coming soon",
};

const projectList = document.querySelector("#project-list");

if (!projectList) {
  // The HTML changed and the list is missing. Say so in the console instead of failing quietly.
  console.warn("No #project-list element found, so project cards were not added.");
} else {
  renderProjects(projects, projectList);
}

/**
 * Replace the contents of the list with one card per project.
 * Cards are built with createElement and textContent, so the text is
 * inserted as text, not as HTML.
 */
function renderProjects(items, list) {
  list.replaceChildren();

  if (!Array.isArray(items) || items.length === 0) {
    const note = document.createElement("li");
    note.className = "empty-note";
    note.textContent = "No projects are listed yet. Add one to the projects array in script.js.";
    list.append(note);
    return;
  }

  items.forEach(function (project, index) {
    const card = createProjectCard(project, index);
    if (!card) {
      return;
    }

    const item = document.createElement("li");
    item.append(card);
    list.append(item);
  });
}

/**
 * Build one <article> for a project, or return null if the entry is not usable.
 * index is only used in the console warning so a bad entry is easy to find.
 */
function createProjectCard(project, index) {
  if (!project || typeof project.title !== "string" || project.title.trim() === "") {
    console.warn("Skipped project at index " + index + " because it has no title.");
    return null;
  }

  const status = project.status === "live" ? "live" : "coming-soon";
  if (project.status !== "live" && project.status !== "coming-soon") {
    console.warn(
      'Project "' + project.title + '" has an unknown status. Showing it as Coming soon.'
    );
  }

  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.status = status;

  const badge = document.createElement("p");
  badge.className = status === "live" ? "badge badge-live" : "badge";
  badge.textContent = STATUS_LABELS[status];
  card.append(badge);

  const heading = document.createElement("h3");
  heading.textContent = project.title.trim();
  card.append(heading);

  if (typeof project.summary === "string" && project.summary.trim() !== "") {
    const summary = document.createElement("p");
    summary.className = "project-summary";
    summary.textContent = project.summary.trim();
    card.append(summary);
  }

  const tags = Array.isArray(project.tags) ? project.tags : [];
  if (tags.length > 0) {
    const tagList = document.createElement("ul");
    tagList.className = "tag-list";

    tags.forEach(function (tag) {
      if (typeof tag !== "string" || tag.trim() === "") {
        return;
      }
      const tagItem = document.createElement("li");
      tagItem.textContent = tag.trim();
      tagList.append(tagItem);
    });

    if (tagList.childElementCount > 0) {
      card.append(tagList);
    }
  }

  // Only a live card with a real http(s) link gets an anchor. Placeholders stay unlinkable.
  if (status === "live" && isHttpUrl(project.url)) {
    const link = document.createElement("a");
    link.className = "project-link";
    link.href = project.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const label =
      typeof project.linkLabel === "string" && project.linkLabel.trim() !== ""
        ? project.linkLabel.trim()
        : "View project";
    link.append(document.createTextNode(label));

    const hint = document.createElement("span");
    hint.className = "visually-hidden";
    hint.textContent = " (opens in a new tab)";
    link.append(hint);

    card.append(link);
  } else if (status === "live") {
    console.warn('Project "' + project.title + '" is live but has no http(s) url, so no link was added.');
  }

  return card;
}

/** True for http:// and https:// links only. */
function isHttpUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value.trim());
}
