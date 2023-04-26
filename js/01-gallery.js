import { galleryItems } from "./gallery-items.js";
// Change code below this line

//

const gallery = document.querySelector(".gallery");

const createGallery = galleryItems
  .map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
      </a>
    </li>
  `;
  })
  .join("");

gallery.insertAdjacentHTML("beforeend", createGallery);

function onGalleryClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") return;

  const instance = basicLightbox.create(`
      <img src="${e.target.dataset.source}">
    `);
  instance.show();

  function onCloseModal(e) {
    console.log(e.code);
    if (e.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", onCloseModal);
    }
  }
  document.addEventListener("keydown", onCloseModal);
}

gallery.addEventListener("click", onGalleryClick);
