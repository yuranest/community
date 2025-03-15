// Detect if running on GitHub Pages or locally
const isGitHubPages = window.location.hostname.includes("github.io");
const basePath = isGitHubPages ? "/your-repository-name/" : "/";

// Function to fix links dynamically
function resolvePath(path) {
  return basePath + path.replace("./", ""); // Ensure paths are formatted correctly
}

// Fix all `<a>` tag links
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach((link) => {
    let href = link.getAttribute("href");
    if (href && (href.startsWith("./pages/") || href.startsWith("/pages/"))) {
      link.setAttribute("href", resolvePath(href));
    }
  });

  // Fix all image paths
  document.querySelectorAll("img").forEach((img) => {
    let src = img.getAttribute("src");
    if (src && (src.startsWith("./images/") || src.startsWith("/images/"))) {
      img.setAttribute("src", resolvePath(src));
    }
  });

  // Fix stylesheets & scripts paths (optional)
  document
    .querySelectorAll('link[rel="stylesheet"], script')
    .forEach((elem) => {
      let attr = elem.tagName === "LINK" ? "href" : "src";
      let path = elem.getAttribute(attr);
      if (
        path &&
        (path.startsWith("./styles/") || path.startsWith("/styles/"))
      ) {
        elem.setAttribute(attr, resolvePath(path));
      }
    });
});
