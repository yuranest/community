const rootPath = window.location.pathname.includes("/pages/")
  ? "../components/"
  : "components/";

function loadComponent(id, file) {
  fetch(rootPath + file)
    .then((response) =>
      response.ok ? response.text() : Promise.reject("File not found")
    )
    .then((data) => (document.getElementById(id).innerHTML = data))
    .catch((error) => console.error(`Error loading ${file}:`, error));
}

// Load header and footer on all pages
loadComponent("header", "header.html");
loadComponent("footer", "footer.html");

// Conditionally load sidebar only on settings-related pages
if (
  window.location.pathname.includes("settings") ||
  window.location.pathname.includes("graphics") ||
  window.location.pathname.includes("controls") ||
  window.location.pathname.includes("game") ||
  window.location.pathname.includes("camera")
) {
  loadComponent("sidebar", "sidebar.html");
}

// Dynamic navigation and popup functionality
document.addEventListener("DOMContentLoaded", () => {
  const contentArea = document.getElementById("page__content");
  const popup = document.getElementById("popup");
  const closeBtn = document.querySelector(".close-btn");

  // Header navigation
  if (document.querySelector(".navbar")) {
    document.querySelectorAll(".navbar a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href === "#") return; // Skip dropdown toggle
        fetch(href)
          .then((response) => response.text())
          .then((data) => {
            if (contentArea) contentArea.innerHTML = data;
          })
          .catch((error) => console.error("Error loading page:", error));
      });
    });
  }

  // Sidebar navigation
  if (document.querySelector(".sidebar")) {
    document.querySelectorAll(".sidebar a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        fetch(href)
          .then((response) => response.text())
          .then((data) => {
            if (contentArea) contentArea.innerHTML = data;
          })
          .catch((error) => console.error("Error loading page:", error));
      });
    });
  }

  // Popup functionality
  if (popup && closeBtn) {
    closeBtn.addEventListener("click", () => (popup.style.display = "none"));

    document.querySelectorAll("article").forEach((article) => {
      article.addEventListener("click", () => {
        document.getElementById("popup-title").textContent =
          article.querySelector("h3")?.textContent || "Details";
        document.getElementById("popup-text").textContent =
          article.querySelector("p").textContent;
        popup.style.display = "block";
      });
    });
  }
});
