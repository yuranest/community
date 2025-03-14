function loadContent(page) {
  fetch(`../pages/${page}`)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("page__content").innerHTML = data;
    })
    .catch((error) => console.error("Ошибка загрузки страницы:", error));
}
