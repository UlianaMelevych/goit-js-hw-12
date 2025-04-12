import { getImagesByQuery } from './pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMore,
  hideLoadMore
} from './render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
let loadedHits = 0;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = event.target.elements["search-text"].value.trim();

  if (!query) {
    iziToast.warning({ message: "Please enter a search query!" });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMore();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;
    loadedHits = data.hits.length;

    if (!totalHits) {
      iziToast.info({ message: "Sorry, there are no images matching your search query. Please try again!" });
      return;
    }

    createGallery(data.hits);
    if (loadedHits < totalHits) {
      showLoadMore();
    }
  } catch {
    iziToast.error({ message: "An error occurred while fetching images." });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    loadedHits += data.hits.length;

    smoothScroll();

    if (loadedHits >= totalHits) {
      hideLoadMore();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    }
  } catch {
    iziToast.error({ message: "Failed to load more images." });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const { height: cardHeight } = document.querySelector(".gallery-item").getBoundingClientRect();
  window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });
}
