import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);
const galleryEl = document.querySelector('.gallery');

function createCalleryCardMurkup(gallery) {
    return gallery
        .map(({ preview, original, description }) => {
            return `
            <div class="gallery_item">
                <a class="gallery_link" href="${original}">
                    <img
                        class="gallery_image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </div>
            `;
        })
        .join('');
}

const cardsMarcup = createCalleryCardMurkup(galleryItems);
galleryEl.innerHTML = cardsMarcup;

galleryEl.addEventListener('click', handLeImgClick);

function handLeImgClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    const openModal = () => {
        const originalImg = event.target.dataset.source;
        const instance = basicLightbox.create(
            `
            <img src="${originalImg}">
            `,
            {
                onShow: (instance) => {
                    window.addEventListener('keydown', openModalbyEsc);
                },
                onClose: (instance) => {
                    window.addEventListener('keydown', openModalbyEsc)
                }
            }
        );
        const openModalbyEsc = (event) => {
            if (event.code === 'Escape') {
                instance.close();
            }
        };

        instance.show();
    };

    openModal();
}