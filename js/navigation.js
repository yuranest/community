function loadContent(page) {
  const pagePath = window.location.pathname.includes("/pages/")
    ? `../pages/${page}`
    : `pages/${page}`;

  fetch(pagePath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("page__content").innerHTML = data;
      window.history.pushState({}, "", page); // ✅ Updates the URL dynamically
    })
    .catch((error) => console.error("Ошибка загрузки страницы:", error));
}
