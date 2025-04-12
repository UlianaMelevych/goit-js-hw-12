import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const lightbox = new SimpleLightbox(".gallery a");
const loadMoreBtn = document.querySelector(".load-more");

export function createGallery(images) {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </li>
  `).join("");

  galleryContainer.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = "";
}

export function showLoader() {
  loader.classList.add("visible");
}

export function hideLoader() {
  loader.classList.remove("visible");
}

export function showLoadMore() {
  loadMoreBtn.classList.remove("hidden");
}

export function hideLoadMore() {
  loadMoreBtn.classList.add("hidden");
}
