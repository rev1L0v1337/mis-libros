/* =====================================================
   MIS LIBROS
   Pure HTML / CSS / JavaScript
   Mobile-ready / Capacitor-ready
===================================================== */


/* =====================================================
   DATA
===================================================== */

const STORAGE_KEY = "mis_libros_v2";

let books =
    JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];

let editingBookId = null;

let selectedRating = 0;


/* =====================================================
   DOM
===================================================== */

const modal =
    document.getElementById("modal");

const bookForm =
    document.getElementById("bookForm");

const booksContainers = {

    recent:
        document.getElementById("recentBooks"),

    library:
        document.getElementById("libraryBooks"),

    favorites:
        document.getElementById("favoriteBooks")

};


const searchInput =
    document.getElementById("searchInput");

const filterStatus =
    document.getElementById("filterStatus");

const filterGenre =
    document.getElementById("filterGenre");


/* =====================================================
   STORAGE
===================================================== */

function saveBooks() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(books)
    );

}


/* =====================================================
   MODAL
===================================================== */

function openModal(book = null) {

    modal.classList.add("active");

    if (book) {

        editingBookId = book.id;

        document.getElementById(
            "modalTitle"
        ).textContent = "Editar libro";

        document.querySelector(
            ".save-button"
        ).textContent = "Guardar cambios";


        document.getElementById("title").value =
            book.title || "";

        document.getElementById("author").value =
            book.author || "";

        document.getElementById("genre").value =
            book.genre || "Novela";

        document.getElementById("status").value =
            book.status || "to-read";

        document.getElementById("pages").value =
            book.pages || "";

        document.getElementById("progress").value =
            book.progress || 0;

        document.getElementById("startDate").value =
            book.startDate || "";

        document.getElementById("finishDate").value =
            book.finishDate || "";

        document.getElementById("notes").value =
            book.notes || "";

        document.getElementById("favorite").checked =
            book.favorite || false;

        selectedRating =
            book.rating || 0;

    } else {

        editingBookId = null;

        bookForm.reset();

        selectedRating = 0;

        document.getElementById(
            "modalTitle"
        ).textContent = "Añadir libro";

        document.querySelector(
            ".save-button"
        ).textContent = "Guardar libro";

    }

    updateRating();

}


function closeModal() {

    modal.classList.remove("active");

    editingBookId = null;

    selectedRating = 0;

    bookForm.reset();

    updateRating();

}


document
    .getElementById("addBookButton")
    .addEventListener(
        "click",
        () => openModal()
    );


document
    .getElementById("heroAddButton")
    .addEventListener(
        "click",
        () => openModal()
    );


document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById("cancelButton")
    .addEventListener(
        "click",
        closeModal
    );


modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {
            closeModal();
        }

    }
);


/* =====================================================
   RATING
===================================================== */

document
    .querySelectorAll(".rating button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectedRating =
                    Number(
                        button.dataset.rating
                    );

                updateRating();

            }
        );

    });


function updateRating() {

    document
        .querySelectorAll(".rating button")
        .forEach(button => {

            const rating =
                Number(
                    button.dataset.rating
                );

            button.classList.toggle(
                "active",
                rating <= selectedRating
            );

        });

}


/* =====================================================
   ADD / EDIT BOOK
===================================================== */

bookForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const book = {

            id:
                editingBookId ||
                Date.now(),

            title:
                document.getElementById(
                    "title"
                ).value.trim(),

            author:
                document.getElementById(
                    "author"
                ).value.trim(),

            genre:
                document.getElementById(
                    "genre"
                ).value,

            status:
                document.getElementById(
                    "status"
                ).value,

            pages:
                Number(
                    document.getElementById(
                        "pages"
                    ).value
                ) || 0,

            progress:
                Math.min(
                    100,
                    Math.max(
                        0,
                        Number(
                            document.getElementById(
                                "progress"
                            ).value
                        ) || 0
                    )
                ),

            startDate:
                document.getElementById(
                    "startDate"
                ).value,

            finishDate:
                document.getElementById(
                    "finishDate"
                ).value,

            rating:
                selectedRating,

            notes:
                document.getElementById(
                    "notes"
                ).value.trim(),

            favorite:
                document.getElementById(
                    "favorite"
                ).checked,

            updatedAt:
                new Date().toISOString()

        };


        if (!book.title || !book.author) {

            alert(
                "Introduce el título y el autor."
            );

            return;

        }


        if (editingBookId) {

            books =
                books.map(
                    oldBook =>
                        oldBook.id === editingBookId
                            ? {
                                ...oldBook,
                                ...book
                            }
                            : oldBook
                );

        } else {

            books.unshift(book);

        }


        saveBooks();

        closeModal();

        renderAll();

    }
);


/* =====================================================
   DELETE
===================================================== */

function deleteBook(id) {

    const confirmed =
        confirm(
            "¿Quieres eliminar este libro?"
        );


    if (!confirmed) return;


    books =
        books.filter(
            book => book.id !== id
        );


    saveBooks();

    renderAll();

}


/* =====================================================
   FAVORITE
===================================================== */

function toggleFavorite(id) {

    books =
        books.map(
            book => {

                if (book.id === id) {

                    return {
                        ...book,
                        favorite: !book.favorite
                    };

                }

                return book;

            }
        );


    saveBooks();

    renderAll();

}


/* =====================================================
   EDIT
===================================================== */

function editBook(id) {

    const book =
        books.find(
            book => book.id === id
        );


    if (!book) return;


    openModal(book);

}


/* =====================================================
   STATUS
===================================================== */

function getStatusText(status) {

    const map = {

        "read":
            "Leído",

        "reading":
            "Leyendo",

        "to-read":
            "Por leer"

    };


    return map[status] || "Por leer";

}


/* =====================================================
   STARS
===================================================== */

function getStars(rating) {

    let result = "";

    for (let i = 1; i <= 5; i++) {

        result +=
            i <= rating
                ? "★"
                : "☆";

    }

    return result;

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


/* =====================================================
   BOOK CARD
===================================================== */

function createBookCard(book) {

    const card =
        document.createElement("article");

    card.className = "book-card";


    const firstLetter =
        book.title
            .charAt(0)
            .toUpperCase();


    card.innerHTML = `

        <div class="book-top">

            <div class="book-cover">
                ${escapeHTML(firstLetter)}
            </div>

            <div class="book-info">

                <h3>
                    ${escapeHTML(book.title)}
                </h3>

                <p>
                    ${escapeHTML(book.author)}
                </p>

                <span class="status">
                    ${getStatusText(book.status)}
                </span>

            </div>

        </div>


        <div class="book-progress">

            <div class="progress-label">

                <span>Progreso</span>

                <span>
                    ${book.progress || 0}%
                </span>

            </div>

            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${book.progress || 0}%"
                ></div>

            </div>

        </div>


        <div class="book-bottom">

            <div>

                <div class="rating-display">
                    ${getStars(book.rating || 0)}
                </div>

                ${
                    book.favorite
                        ? `<small>♥ Favorito</small>`
                        : ""
                }

            </div>


            <div class="book-actions">

                <button
                    onclick="toggleFavorite(${book.id})"
                    title="Favorito"
                >
                    ${book.favorite ? "❤️" : "♡"}
                </button>

                <button
                    onclick="editBook(${book.id})"
                    title="Editar"
                >
                    ✏️
                </button>

                <button
                    onclick="deleteBook(${book.id})"
                    title="Eliminar"
                >
                    🗑️
                </button>

            </div>

        </div>

    `;


    return card;

}


/* =====================================================
   EMPTY STATE
===================================================== */

function showEmpty(container, text) {

    container.innerHTML = `

        <div class="empty-state">

            <div>📚</div>

            <h3>
                ${text}
            </h3>

            <p>
                Añade un libro para empezar.
            </p>

        </div>

    `;

}


/* =====================================================
   RENDER LIBRARY
===================================================== */

function renderLibrary() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const status =
        filterStatus.value;

    const genre =
        filterGenre.value;


    const filtered =
        books.filter(book => {

            const matchesSearch =

                book.title
                    .toLowerCase()
                    .includes(search)

                ||

                book.author
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =

                status === "all" ||
                book.status === status;


            const matchesGenre =

                genre === "all" ||
                book.genre === genre;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesGenre
            );

        });


    booksContainers.library.innerHTML = "";


    if (!filtered.length) {

        showEmpty(
            booksContainers.library,
            "No se encontraron libros"
        );

        return;

    }


    filtered.forEach(book => {

        booksContainers.library.appendChild(
            createBookCard(book)
        );

    });

}


/* =====================================================
   RECENT
===================================================== */

function renderRecent() {

    booksContainers.recent.innerHTML = "";


    const recent =
        books.slice(0, 3);


    if (!recent.length) {

        showEmpty(
            booksContainers.recent,
            "Aún no tienes libros"
        );

        return;

    }


    recent.forEach(book => {

        booksContainers.recent.appendChild(
            createBookCard(book)
        );

    });

}


/* =====================================================
   FAVORITES
===================================================== */

function renderFavorites() {

    booksContainers.favorites.innerHTML = "";


    const favorites =
        books.filter(
            book => book.favorite
        );


    if (!favorites.length) {

        showEmpty(
            booksContainers.favorites,
            "Aún no tienes favoritos"
        );

        return;

    }


    favorites.forEach(book => {

        booksContainers.favorites.appendChild(
            createBookCard(book)
        );

    });

}


/* =====================================================
   STATISTICS
===================================================== */

function renderStats() {

    const total =
        books.length;


    const read =
        books.filter(
            book => book.status === "read"
        ).length;


    const percentage =
        total
            ? Math.round(
                (read / total) * 100
            )
            : 0;


    const ratingBooks =
        books.filter(
            book => book.rating > 0
        );


    const average =
        ratingBooks.length
            ? (
                ratingBooks.reduce(
                    (sum, book) =>
                        sum + book.rating,
                    0
                )
                / ratingBooks.length
            ).toFixed(1)
            : "0.0";


    const pages =
        books.reduce(
            (sum, book) =>
                sum +
                Math.round(
                    (book.pages || 0) *
                    ((book.progress || 0) / 100)
                ),
            0
        );


    document.getElementById(
        "statsTotal"
    ).textContent = total;


    document.getElementById(
        "readPercentage"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "readProgress"
    ).style.width =
        percentage + "%";


    document.getElementById(
        "averageRating"
    ).textContent =
        average;


    document.getElementById(
        "pagesRead"
    ).textContent =
        pages.toLocaleString("es-ES");

}


/* =====================================================
   DASHBOARD STATS
===================================================== */

function updateDashboardStats() {

    const total =
        books.length;


    const read =
        books.filter(
            book => book.status === "read"
        ).length;


    const reading =
        books.filter(
            book => book.status === "reading"
        ).length;


    const toRead =
        books.filter(
            book => book.status === "to-read"
        ).length;


    document.getElementById(
        "totalBooks"
    ).textContent = total;


    document.getElementById(
        "readBooks"
    ).textContent = read;


    document.getElementById(
        "readingBooks"
    ).textContent = reading;


    document.getElementById(
        "toReadBooks"
    ).textContent = toRead;

}


/* =====================================================
   RENDER ALL
===================================================== */

function renderAll() {

    renderRecent();

    renderLibrary();

    renderFavorites();

    updateDashboardStats();

    renderStats();

}


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    renderLibrary
);


filterStatus.addEventListener(
    "change",
    renderLibrary
);


filterGenre.addEventListener(
    "change",
    renderLibrary
);


/* =====================================================
   NAVIGATION
===================================================== */

document
    .querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const pageId =
                    button.dataset.page;


                document
                    .querySelectorAll(".page")
                    .forEach(page => {

                        page.classList.add(
                            "hidden"
                        );

                    });


                document
                    .getElementById(pageId)
                    .classList.remove(
                        "hidden"
                    );


                document
                    .querySelectorAll(".nav-item")
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    });


/* =====================================================
   VIEW ALL
===================================================== */

document
    .getElementById("viewAllButton")
    .addEventListener(
        "click",
        () => {

            document
                .querySelector(
                    '[data-page="libraryPage"]'
                )
                .click();

        }
    );


/* =====================================================
   DARK MODE
===================================================== */

function setTheme(theme) {

    const isDark =
        theme === "dark";


    document.body.classList.toggle(
        "dark",
        isDark
    );


    localStorage.setItem(
        "mis_libros_theme",
        theme
    );


    const icon =
        isDark
            ? "☀️"
            : "🌙";


    document.getElementById(
        "themeButton"
    ).textContent = icon;


    document.getElementById(
        "settingsThemeButton"
    ).textContent = icon;

}


function toggleTheme() {

    const dark =
        document.body.classList.contains(
            "dark"
        );


    setTheme(
        dark
            ? "light"
            : "dark"
    );

}


document
    .getElementById("themeButton")
    .addEventListener(
        "click",
        toggleTheme
    );


document
    .getElementById("settingsThemeButton")
    .addEventListener(
        "click",
        toggleTheme
    );


const savedTheme =
    localStorage.getItem(
        "mis_libros_theme"
    ) || "light";


setTheme(savedTheme);


/* =====================================================
   EXPORT
===================================================== */

document
    .getElementById("exportButton")
    .addEventListener(
        "click",
        () => {

            const data =
                JSON.stringify(
                    books,
                    null,
                    2
                );


            const blob =
                new Blob(
                    [data],
                    {
                        type:
                            "application/json"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href = url;

            link.download =
                "mis-libros-backup.json";


            link.click();


            URL.revokeObjectURL(url);

        }
    );


/* =====================================================
   IMPORT
===================================================== */

const importFile =
    document.getElementById(
        "importFile"
    );


document
    .getElementById("importButton")
    .addEventListener(
        "click",
        () => {

            importFile.click();

        }
    );


importFile.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];


        if (!file) return;


        const reader =
            new FileReader();


        reader.onload =
            e => {

                try {

                    const imported =
                        JSON.parse(
                            e.target.result
                        );


                    if (!Array.isArray(imported)) {

                        throw new Error();

                    }


                    books = imported;

                    saveBooks();

                    renderAll();

                    alert(
                        "Biblioteca importada correctamente."
                    );

                } catch {

                    alert(
                        "El archivo no es válido."
                    );

                }

            };


        reader.readAsText(file);

    }
);


/* =====================================================
   CLEAR DATA
===================================================== */

document
    .getElementById("clearButton")
    .addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "¿Seguro que quieres eliminar TODOS tus libros? Esta acción no se puede deshacer."
                );


            if (!confirmed) return;


            books = [];

            saveBooks();

            renderAll();

        }
    );


/* =====================================================
   INITIALIZE
===================================================== */

renderAll();
