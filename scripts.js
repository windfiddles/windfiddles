let currentIndex = 0;

function openPopup(imageSrc, caption, index) {
  currentIndex = index !== undefined ? index : 0;
  document.getElementById('popup-image').src = imageSrc;
  document.getElementById('popup-caption').innerHTML = caption;
  document.getElementById('popup').classList.add('show');

  // Add event listeners for keyboard events
  document.addEventListener('keydown', handleKeyPress);
}


function closePopup() {
  document.getElementById('popup').classList.remove('show');
  // Remove event listeners when the popup is closed
  document.removeEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {

  // Check if the key pressed is 'Escape'
  if (event.key === 'Escape') {
    closePopup();
  } else if (event.key === 'ArrowLeft') {
    navigateImages(-1); // Move to the previous image
  } else if (event.key === 'ArrowRight') {
    navigateImages(1); // Move to the next image
  }
}


function navigateImages(offset) {
  const nextIndex = currentIndex + offset;

  if (nextIndex >= 0 && nextIndex < galleryData.length) {
    const nextImageData = galleryData[nextIndex];

    document.getElementById('popup-image').src = nextImageData.src;
    document.getElementById('popup-caption').innerText = nextImageData.caption;

    currentIndex = nextIndex;
  }




}
