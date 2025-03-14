document.addEventListener("DOMContentLoaded", function () {
  const rootPath = window.location.pathname.includes("/pages/")
    ? "../components/"
    : "./components/";

  // Load Header
  fetch(rootPath + "header.html")
    .then((response) => response.text())
    .then((data) => {
      const headerElement = document.getElementById("header");
      if (headerElement) headerElement.innerHTML = data;
    });

  // Load Sidebar (Only if the element exists)
  fetch(rootPath + "sidebar.html")
    .then((response) => response.text())
    .then((data) => {
      const sidebarElement = document.getElementById("sidebar");
      if (sidebarElement) sidebarElement.innerHTML = data;
    });

  // Load Footer
  fetch(rootPath + "footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footerElement = document.getElementById("footer");
      if (footerElement) footerElement.innerHTML = data;
    });
});
