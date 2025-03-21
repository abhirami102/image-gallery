// Sample image data
const images = [
    {
        id: 1,
        src: 'jonatan-pie-xgTMSz6kegE-unsplash.jpg',
        category: 'animals',
        caption: ' Artic Fox'
    },
    {
        id: 2,
        src: 'amber-kipp-75715CVEJhI-unsplash.jpg',
        category: 'animals',
        caption: 'Cat'
    },
    {
        id: 3,
        src: 'david-edelstein-N4DbvTUDikw-unsplash.jpg',
        category: 'nature',
        caption: 'Beautiful landscape'
    },
    {
        id: 4,
        src: 'alejandro-contreras-wTPp323zAEw-unsplash.jpg',
        category: 'nature',
        caption: 'Flamingo'
    },
    {
        id: 5,
        src: 'charlesdeluvio-Mv9hjnEUHR4-unsplash.jpg',
        category: 'animals',
        caption: 'Pug'
    },
    {
        id: 6,
        src: 'aj-McsNra2VRQQ-unsplash.jpg',
        category: 'nature',
        caption: 'Cherry Blossom'
    },
];

// DOM Elements
const galleryContainer = document.getElementById('imageGallery');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.querySelector('.modal-caption');
const closeModal = document.querySelector('.close-modal');
const filterSelect = document.getElementById('filterSelect');
const brightnessSlider = document.getElementById('brightnessSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// State variables
let currentFilter = 'all';
let currentImageIndex = 0;
let filteredImages = [...images];

// Functions
function createGalleryItem(image) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
        <img src="${image.src}" alt="${image.caption}" loading="lazy">
        <div class="caption">${image.caption}</div>
    `;
    
    div.addEventListener('click', () => openModal(image));
    return div;
}

function renderGallery() {
    galleryContainer.innerHTML = '';
    filteredImages.forEach(image => {
        galleryContainer.appendChild(createGalleryItem(image));
    });
}

function openModal(image) {
    modalImage.src = image.src;
    modalCaption.textContent = image.caption;
    modal.style.display = 'block';
    currentImageIndex = filteredImages.findIndex(img => img.id === image.id);
}

function closeModalHandler() {
    modal.style.display = 'none';
}

function filterImages(category) {
    currentFilter = category;
    filteredImages = category === 'all' 
        ? [...images] 
        : images.filter(image => image.category === category);
    renderGallery();
}

function adjustBrightness(value) {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.style.filter = `brightness(${value}%)`;
    });
}

function navigateImages(direction) {
    if (filteredImages.length === 0) return;
    
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    } else {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    const image = filteredImages[currentImageIndex];
    openModal(image);
}

// Event Listeners
filterSelect.addEventListener('change', (e) => filterImages(e.target.value));

brightnessSlider.addEventListener('input', (e) => adjustBrightness(e.target.value));

closeModal.addEventListener('click', closeModalHandler);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalHandler();
});

prevBtn.addEventListener('click', () => navigateImages('prev'));
nextBtn.addEventListener('click', () => navigateImages('next'));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'ArrowLeft') navigateImages('prev');
        if (e.key === 'ArrowRight') navigateImages('next');
        if (e.key === 'Escape') closeModalHandler();
    }
});

// Initial render
renderGallery(); 
