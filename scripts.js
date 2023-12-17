let currentIndex = 0;

// function openPopup(imageSrc, caption, index) {
//   currentIndex = index !== undefined ? index : 0;
//   document.getElementById('popup-image').src = imageSrc;
//   document.getElementById('popup-caption').innerHTML = caption;
//   document.getElementById('popup').classList.add('show');

//   // Add event listeners for keyboard events
//   document.addEventListener('keydown', handleKeyPress);
// }

function openPopup(imageSrc, caption) {
    const popupImage = document.getElementById('popup-image');
    const popupCaption = document.getElementById('popup-caption');

    popupImage.src = imageSrc;

    if (caption && caption.trim() !== '') {
        popupCaption.innerHTML = caption;
        popupCaption.style.display = 'block'; // Show the caption
    } else {
        popupCaption.style.display = 'none'; // Hide the caption
    }

    document.getElementById('popup').classList.add('show');
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