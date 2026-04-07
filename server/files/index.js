window.onload = function () {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        const movieList = document.querySelector('#movie-list');

        if (xhr.status === 200) {
            const movies = JSON.parse(xhr.responseText);

            movies.forEach(movie => {
                const article = document.createElement('article');
                article.className = 'movie-card';
                article.setAttribute(
                    'aria-labelledby',
                    `title-${movie.Title.replace(/[^a-zA-Z0-9]/g, '')}`
                );

                article.innerHTML = `
          <figure class="poster-wrapper">
            <img src="${movie.Poster}" alt="${movie.Title} poster" class="poster" loading="lazy">
            <figcaption class="sr-only">Poster image for ${movie.Title}</figcaption>
          </figure>

          <header>
            <h2 id="title-${movie.Title.replace(/[^a-zA-Z0-9]/g, '')}" class="movie-title">${movie.Title}</h2>
            <div class="movie-meta">
              <span>📅 ${movie.Released}</span>
              <span>⏱️ ${movie.Runtime} min</span>
              <span class="rating">⭐ ${movie.imdbRating}</span>
            </div>
          </header>

          <section aria-label="Plot summary">
            <p class="plot">${movie.Plot}</p>
          </section>

          <section aria-label="Genres">
            <ul class="genres">
              ${movie.Genres.map(g => `<li class="genre-tag">${g}</li>`).join('')}
            </ul>
          </section>

          <aside aria-label="Production credits">
            <dl class="credits-section">
              <div>
                <dt>Directors</dt>
                <dd>${movie.Directors.join(', ')}</dd>
              </div>
              <div>
                <dt>Writers</dt>
                <dd>${movie.Writers.join(', ')}</dd>
              </div>
              <div>
                <dt>Actors</dt>
                <dd>${movie.Actors.slice(0, 3).join(', ')}${movie.Actors.length > 3 ? ' et al.' : ''}</dd>
              </div>
              <div>
                <dt>Metascore</dt>
                <dd>${movie.Metascore}</dd>
              </div>
            </dl>
          </aside>

          <footer>
            <button class="edit-btn">Edit</button>
          </footer>
        `;

                article.querySelector('.edit-btn').onclick = function () {
                    location.href = `edit.html?imdbID=${movie.imdbID}`;
                };

                movieList.appendChild(article);
            });
        } else {
            movieList.textContent =
                'Data could not be loaded, Status ' +
                xhr.status +
                ' - ' +
                xhr.statusText;
        }
    };

    xhr.open('GET', '/movies');
    xhr.send();
};