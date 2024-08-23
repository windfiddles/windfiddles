let currentIndex = 0;
let galleryData = []; // Define galleryData globally

// Fetch gallery data from the JSON file
fetch('gallery.json')
  .then(response => response.json())
  .then(data => {
    galleryData = data.images;
    preloadImages(galleryData.map(image => image.src));
    // Optionally, openPopup with the first image
    // openPopup(galleryData[0].src, galleryData[0].caption, 0);
  })
  .catch(error => console.error('Error fetching gallery data:', error));

// Function to preload images
function preloadImages(imageSrcs) {
  imageSrcs.forEach(src => {
    const img = new Image();
    img.src = src; // No images/ prefix
  });
}

// Function to create gallery items dynamically
function createGalleryItem(data, index) {
  const galleryItem = document.createElement('div');
  galleryItem.classList.add('gallery-item');
  galleryItem.onclick = function() {
    openPopup(data.src, data.caption, index);
  };

  const image = document.createElement('img');
  image.src = data.src; // No images/ prefix
  image.alt = data.alt || data.caption;
  image.loading = 'lazy';

  galleryItem.appendChild(image);
  document.getElementById('imageGallery').appendChild(galleryItem);
}

// Open the popup and set image paths
function openPopup(imageSrc, caption, index) {
  const popupImage = document.getElementById('popup-image');
  const popupCaption = document.getElementById('popup-caption');

  popupImage.src = imageSrc; // No images/ prefix

  if (caption && caption.trim() !== '') {
    popupCaption.innerHTML = caption;
    popupCaption.style.display = 'block'; // Show the caption
  } else {
    popupCaption.style.display = 'none'; // Hide the caption
  }

  document.getElementById('popup').classList.add('show');
  document.addEventListener('keydown', handleKeyPress);

  // Update currentIndex when opening the popup
  currentIndex = index !== undefined ? index : 0;
}

// Close the popup and remove event listeners
function closePopup() {
  document.getElementById('popup').classList.remove('show');
  // Remove event listeners when the popup is closed
  document.removeEventListener('keydown', handleKeyPress);
}

// Handle keyboard events for navigation
function handleKeyPress(event) {
  if (event.key === 'Escape') {
    closePopup();
  } else if (event.key === 'ArrowLeft') {
    navigateImages(-1); // Move to the previous image
  } else if (event.key === 'ArrowRight') {
    navigateImages(1); // Move to the next image
  }
}

// Navigate through images
function navigateImages(offset) {
  if (galleryData.length === 0) {
    console.warn('Gallery data is not yet available.');
    return;
  }

  const nextIndex = currentIndex + offset;

  // Make sure the nextIndex is within bounds
  if (nextIndex >= 0 && nextIndex < galleryData.length) {
    const nextImageData = galleryData[nextIndex];

    document.getElementById('popup-image').src = nextImageData.src; // No images/ prefix
    document.getElementById('popup-caption').innerText = nextImageData.caption;

    currentIndex = nextIndex; // Update the currentIndex
  }
}

// Left and right swipes on mobile
let touchStartX = 0;
let touchEndX = 0;

function checkSwipeGesture() {
  if (touchEndX < touchStartX - 30) {
    navigateImages(1); // Swipe left, go to next image
  }
  if (touchEndX > touchStartX + 30) {
    navigateImages(-1); // Swipe right, go to previous image
  }
}

document.getElementById('popup').addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

document.getElementById('popup').addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  checkSwipeGesture();
}, false);

// Close pop-up with downward swipe on mobile
let touchStartY = 0;
let touchEndY = 0;

function checkDownwardSwipe() {
  if (touchEndY > touchStartY + 30) { // 30 is the minimum threshold for swipe
    closePopup();
  }
}

document.getElementById('popup').addEventListener('touchstart', e => {
  e.preventDefault();
  touchStartY = e.changedTouches[0].screenY;
}, false);

document.getElementById('popup').addEventListener('touchend', e => {
  e.preventDefault();
  touchEndY = e.changedTouches[0].screenY;
  checkDownwardSwipe();
}, false);
