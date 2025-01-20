import { galleryItems } from './gallery-items.js';


const galleryRef = document.querySelector('.gallery');
let modalImage; 
// прийшлось об'являти глобально змінну для модалки, інакше до неї немає доступу з функції EscKeyHandler, якщо створювати її в onGalleryClick. Чи можно якось зробити так, щоб 
// modalImage об'являлась в функції onGalleryClick і бачилась в EscKeyHandler, не передаючи її туди як аргумент, 
//а також не використовуючи стрілочні функції, бо інакше не можливо буде прибрати слухача з window.

const galleryItemMarkup = createGalleryItems(galleryItems);

galleryRef.innerHTML = galleryItemMarkup;

galleryRef.addEventListener('click', onGalleryClick);

function createGalleryItems(images) {
    return images
      .map(image =>
      `<li class = "gallery__item">
      <a class="gallery__link" href="${image.original}">
      <img class = "gallery__image" src = "${image.preview}" data-source="${image.original}" alt="${image.description}"> </img> </a>
      </li> `)
      .join("");
  }
  

function onGalleryClick(event){
    event.preventDefault();
    if (event.target.nodeName !== "IMG") return;

    modalImage = basicLightbox.create(`
    <img src="${event.target.dataset.source}" alt="${event.target.alt}">`);
    modalImage.show();
    window.addEventListener('keydown', EscKeyHandler);
}


function EscKeyHandler(event) {
    if (event.code === 'Escape'){
        modalImage.close();
        window.removeEventListener('keydown', EscKeyHandler);
    }
}


