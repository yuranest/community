// Determine the correct path for loading components
const rootPath = window.location.pathname.includes("/pages/")
  ? "../components/"
  : "./components/";

function loadComponent(id, file) {
  fetch(rootPath + file)
    .then((response) =>
      response.ok ? response.text() : Promise.reject(`File not found: ${file}`)
    )
    .then((data) => {
      const element = document.getElementById(id);
      if (element) element.innerHTML = data;
    })
    .catch((error) => console.error(`Error loading ${file}:`, error));
}

// ✅ Load header, footer, and sidebar on all pages
loadComponent("header", "header.html");
loadComponent("footer", "footer.html");

// ✅ Ensure sidebar loads correctly on settings and game-related pages
if (
  window.location.pathname.includes("settings") ||
  window.location.pathname.includes("graphics") ||
  window.location.pathname.includes("controls") ||
  window.location.pathname.includes("game") ||
  window.location.pathname.includes("camera")
) {
  loadComponent("sidebar", "sidebar.html");
}

// ✅ Dynamic Page Navigation
document.addEventListener("DOMContentLoaded", () => {
  const contentArea = document.getElementById("page__content");

  function loadContent(page) {
    const pagePath = window.location.pathname.includes("/pages/")
      ? `../pages/${page}`
      : `pages/${page}`;

    fetch(pagePath)
      .then((response) => response.text())
      .then((data) => {
        if (contentArea) {
          contentArea.innerHTML = data;
          window.history.pushState({}, "", page); // ✅ Updates the URL dynamically
        }
      })
      .catch((error) => console.error("Ошибка загрузки страницы:", error));
  }

  // ✅ Handle Navbar Clicks
  document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href !== "#") loadContent(href);
    });
  });

  // ✅ Handle Sidebar Clicks
  document.querySelectorAll(".sidebar a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      loadContent(link.getAttribute("href"));
    });
  });

  // ✅ Handle Clicking on "LEGION IX" to Load Main Page
  const titleLink = document.querySelector(".header__title");
  if (titleLink) {
    titleLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/index.html"; // ✅ Ensures main page is loaded correctly
    });
  }

  // ✅ Handle Browser Back/Forward Buttons
  window.addEventListener("popstate", () => {
    fetch(window.location.pathname)
      .then((response) => response.text())
      .then((data) => {
        if (contentArea) contentArea.innerHTML = data;
      });
  });

  // ✅ Popup Functionality
  const popup = document.getElementById("popup");
  const closeBtn = document.querySelector(".close-btn");

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
