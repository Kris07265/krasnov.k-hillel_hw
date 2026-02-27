'use strict';

const userSelect = document.getElementById('userSelect');
const albumSelect = document.getElementById('albumSelect');
const loadBtn = document.getElementById('loadBtn');
const statusContainer = document.getElementById('status');
const photosContainer = document.getElementById('photos');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let allPhotos = [];
let offset = 0;

document.addEventListener('DOMContentLoaded', () => {
    statusContainer.textContent = "Loading users...";
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            if (!res.ok) {
                throw new Error("HTTP " + res.status);
            }
            return res.json();
        })
    .then(users => {
        users.forEach(user => {
            const userSelectOption = document.createElement('option');
            userSelectOption.value = user.id;
            userSelectOption.textContent = user.name;
            userSelect.append(userSelectOption);
        });
    })
    .catch(err => statusContainer.textContent = `Error: ${err.message}`)
        .finally(() => statusContainer.textContent = '')
});

userSelect.addEventListener('change', () => {
    photosContainer.textContent = '';
    albumSelect.disabled = true;
    loadBtn.disabled = true;
    statusContainer.textContent = "Loading albums...";
    const userId = userSelect.value;
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then(res => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        })
    .then(albums => {
        albumSelect.innerHTML = '<option value="">Select album...</option>';
        albums.forEach(album => {
            const albumSelectOption = document.createElement('option');
            albumSelectOption.value = album.id;
            albumSelectOption.textContent = album.title;
            albumSelect.append(albumSelectOption);
        })
    })
    .catch(err => statusContainer.textContent = `Error: ${err.message}`)
    .finally(() => {
        statusContainer.textContent = '';
        albumSelect.disabled = false;
    })
});

albumSelect.addEventListener('change', () => {
    loadBtn.disabled = !albumSelect.value;
})


loadBtn.addEventListener('click', () => {
    photosContainer.textContent = '';
    statusContainer.textContent = "Loading photos...";
    const albumId = albumSelect.value;
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    .then(res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
    })
    .then(data => {
        allPhotos = data;
        offset = 0;
        renderPhotos();
        if (offset >= allPhotos.length) {
            loadMoreBtn.classList.add('d-none');
        } else {
            loadMoreBtn.classList.remove('d-none');
        }
    })
        .catch(err => statusContainer.textContent = `Error: ${err.message}`)
        .finally(() => statusContainer.textContent = '');
})

function renderPhotos() {
    const nextPhotos = allPhotos.slice(offset, offset + 12);
    nextPhotos.forEach(photo => {
        const card = document.createElement('div');
        card.classList.add('photo-card');
        card.innerHTML =`
        <img src="${photo.thumbnailUrl}" alt="${photo.title}">
        <p>${photo.title.length > 40 ? photo.title.slice(0,40) + '…' : photo.title}</p>
        <a href="${photo.url}" target="_blank">Open</a>`;
        photosContainer.append(card);
    });
    offset += 12;
}

loadMoreBtn.addEventListener('click', () => {
    renderPhotos();
    if (offset >= allPhotos.length) {
        loadMoreBtn.classList.add('d-none');
    } else {
        loadMoreBtn.classList.remove('d-none');
    }
});