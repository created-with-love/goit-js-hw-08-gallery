import images from './gallery-items.js';

// Функция, которая кушает обьект и выдеат разметку для вставки картинок
const makeImagesMarkUp = function (image) {
  const { preview, original, description } = image;

  return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt="${description}"
    />
  </a>
</li>`;
};

// Определяю куда будет вставлена разметка, функцией прогоняю весь массив обьектов для создание разметки и заливаю полученный текст в HTML
const galleryListHeaderEl = document.querySelector('.js-gallery');
const galleryListMarkUp = images.map(makeImagesMarkUp).join('');

galleryListHeaderEl.insertAdjacentHTML('beforeend', galleryListMarkUp);

galleryListHeaderEl.addEventListener('click', onImageLinkClick);
const modalWindow = document.querySelector('.lightbox');
const modalImageEl = document.querySelector('.lightbox__image');

function onImageLinkClick(event) {
  // предотвращаю открытие ссылки по клику
  event.preventDefault();
  // получаю атрибуты с картинки, по которой кликнул
  const imgFullUrl = event.target.dataset.source;
  const altTextFromImg = event.target.alt;

  // задаю в модальном окне картинке атрибуты
  modalImageEl.src = imgFullUrl;
  modalImageEl.alt = altTextFromImg;
  modalWindow.classList.add('is-open');

  window.addEventListener('keydown', arrowImagesSwitch);
}

// Определяю кнопку для закрытия модального окна, вешаю слушатель и создаю функцию закрытия
const closeModalBtn = document.querySelector('.lightbox__button');
closeModalBtn.addEventListener('click', onCloseBtnClick);

function onCloseBtnClick() {
  modalWindow.classList.remove('is-open');
  modalImageEl.src = '';
}

// Код для закрытия модального окна клавишей Esc
window.addEventListener('keydown', onEscKeyPress);

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseBtnClick();
  }
}

// Код для закрытия модального окна кликом в бекдроп
const backdropEl = document.querySelector('.lightbox__content');
backdropEl.addEventListener('click', onBackdropClick);

function onBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseBtnClick();
  }
}

// Код для пролистования картинок при нажатии вправо-влево на клавиатуре с открым модальным окном

function arrowImagesSwitch(e) {
  window.addEventListener('keydown', onRightArrowClick);
  window.addEventListener('keydown', onLeftArrowClick);
  const imagesSrcArray = images.map(image => image.original);
  const indexOfCurrentImg = imagesSrcArray.indexOf(modalImageEl.src);

  function onRightArrowClick(evt) {
    if (evt.code === 'ArrowRight') {
      if (indexOfCurrentImg < imagesSrcArray.length - 1)
        modalImageEl.src = imagesSrcArray[Number(indexOfCurrentImg) + 1];
    }
  }

  function onLeftArrowClick(evt) {
    if (evt.code === 'ArrowLeft') {
      if (indexOfCurrentImg > 0) {
        modalImageEl.src = imagesSrcArray[Number(indexOfCurrentImg) - 1];
      }
    }
  }
}
