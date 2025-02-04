const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm));
}

function displayResults(result, searchTerm) {
    resultPlaylist.classList.add('hidden');
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = ''; // Limpa os resultados anteriores

    const filteredArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm));

    filteredArtists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        artistCard.innerHTML = `
            <div class="card-img">
                <img class="artist-img" src="${artist.urlImg}"/>
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">Artista</span>
            </div>`;
        gridContainer.appendChild(artistCard);            
    });

    // Exibe ou oculta a seção de resultados com base na quantidade de artistas filtrados
    if (filteredArtists.length > 0) {
        resultArtist.classList.remove('hidden');
    } else {
        resultArtist.classList.add('hidden'); // Oculta se não houver resultados
    }
}

searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.add('hidden'); // Oculta a seção de resultados
        return;
    }
    requestApi(searchTerm);
});