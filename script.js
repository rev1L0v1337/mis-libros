/* =====================================================
   MIS LIBROS
   script.js
   Compatible con index.html + style.css
===================================================== */

"use strict";

/* =====================================================
   DATA
===================================================== */

const STORAGE_KEY = "mis_libros_v2";
const THEME_KEY = "mis_libros_theme";

let books = [];
let editingBookId = null;
let selectedRating = 0;


/* =====================================================
   STORAGE
===================================================== */

function loadBooks() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            books = [];
            return;
        }

        const parsed = JSON.parse(saved);

        books = Array.isArray(parsed) ? parsed : [];

    } catch (error) {
        console.error("Error cargando libros:", error);
        books = [];
    }
}


function saveBooks() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(books)
        );
    } catch (error) {
        console.error("Error guardando libros:", error);
    }
}


/* =====================================================
   DOM
===================================================== */

const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModal");
const cancelButton = document.getElementById("cancelButton");
const bookForm = document.getElementById("bookForm");

const heroAddButton = document.getElementById("heroAddButton");
const addBookButton = document.getElementById("addBookButton");
const viewAllButton = document.getElementById("viewAllButton");

const themeButton = document.getElementById("themeButton");
const settingsThemeButton =
    document.getElementById("settingsThemeButton");

const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");
const filterGenre = document.getElementById("filterGenre");

const recentBooks = document.getElementById("recentBooks");
const libraryBooks = document.getElementById("libraryBooks");
const favoriteBooks = document.getElementById("favoriteBooks");

const totalBooks = document.getElementById("totalBooks");
const readBooks = document.getElementById("readBooks");
const readingBooks = document.getElementById("readingBooks");
const toReadBooks = document.getElementById("toReadBooks");

const statsTotal = document.getElementById("statsTotal");
const readPercentage = document.getElementById("readPercentage");
const readProgress = document.getElementById("readProgress");
const averageRating = document.getElementById("averageRating");
const pagesRead = document.getElementById("pagesRead");

const modalTitle = document.getElementById("modalTitle");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const genreInput = document.getElementById("genre");
const statusInput = document.getElementById("status");
const pagesInput = document.getElementById("pages");
const progressInput = document.getElementById("progress");
const startDateInput = document.getElementById("startDate");
const finishDateInput = document.getElementById("finishDate");
const ratingContainer = document.getElementById("rating");
const notesInput = document.getElementById("notes");
const favoriteInput = document.getElementById("favorite");

const exportButton = document.getElementById("exportButton");
const importButton = document.getElementById("importButton");
const importFile = document.getElementById("importFile");
const clearButton = document.getElementById("clearButton");


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    loadBooks();

    loadTheme();

    setupNavigation();

    setupModal();

    setupRating();

    setupSearchAndFilters();

    setupTheme();

    setupImportExport();

    setupClearData();

    renderAll();

    closeModal();

});


/* =====================================================
   MODAL
===================================================== */

function openModal(book) {

    if (!modal) {
        return;
    }

    if (book) {

        editingBookId = book.id;

        if (modalTitle) {
            modalTitle.textContent = "Editar libro";
        }

        titleInput.value = book.title || "";
        authorInput.value = book.author || "";
        genreInput.value = book.genre || "Novela";
        statusInput.value = book.status || "to-read";
        pagesInput.value = book.pages || "";
        progressInput.value = book.progress || 0;
        startDateInput.value = book.startDate || "";
        finishDateInput.value = book.finishDate || "";
        notesInput.value = book.notes || "";
        favoriteInput.checked = Boolean(book.favorite);

        selectedRating = Number(book.rating) || 0;

    } else {

        editingBookId = null;

        if (modalTitle) {
            modalTitle.textContent = "Añadir libro";
        }

        bookForm.reset();

        selectedRating = 0;

        progressInput.value = 0;
    }

    updateRating();

    /*
       IMPORTANTE:
       El modal utiliza la clase "hidden" del CSS.
       Primero quitamos cualquier display inline.
    */

    modal.style.display = "";

    modal.classList.remove("hidden");

    document.body.style.overflow = "hidden";

    setTimeout(function () {

        if (titleInput) {
            titleInput.focus();
        }

    }, 50);
}


function closeModal() {

    if (!modal) {
        return;
    }

    /*
       Esta es la parte importante.
       El CSS contiene:

       .modal-overlay.hidden {
           display: none;
       }

       Por tanto añadimos "hidden".
    */

    modal.classList.add("hidden");

    /*
       Eliminamos cualquier estilo inline
       que pudiera mantener visible el modal.
    */

    modal.removeAttribute("style");

    document.body.style.overflow = "";

    editingBookId = null;

    selectedRating = 0;

    updateRating();
}


/* =====================================================
   MODAL EVENTS
===================================================== */

function setupModal() {

    if (closeModalButton) {

        closeModalButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                closeModal();
            }
        );
    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                closeModal();
            }
        );
    }


    if (heroAddButton) {

        heroAddButton.addEventListener(
            "click",
            function () {

                openModal();
            }
        );
    }


    if (addBookButton) {

        addBookButton.addEventListener(
            "click",
            function () {

                openModal();
            }
        );
    }


    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {
                    closeModal();
                }
            }
        );
    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (
                    modal &&
                    !modal.classList.contains("hidden")
                ) {
                    closeModal();
                }
            }
        }
    );


    if (bookForm) {

        bookForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                saveBook();
            }
        );
    }
}


/* =====================================================
   SAVE BOOK
===================================================== */

function saveBook() {

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (!title || !author) {

        alert("Introduce el título y el autor.");

        return;
    }


    let progress = Number(progressInput.value);

    if (!Number.isFinite(progress)) {
        progress = 0;
    }

    progress = Math.max(
        0,
        Math.min(100, progress)
    );


    const bookData = {

        title: title,

        author: author,

        genre:
            genreInput.value || "Otro",

        status:
            statusInput.value || "to-read",

        pages:
            Number(pagesInput.value) || 0,

        progress: progress,

        startDate:
            startDateInput.value || "",

        finishDate:
            finishDateInput.value || "",

        rating:
            selectedRating,

        notes:
            notesInput.value.trim(),

        favorite:
            favoriteInput.checked

    };


    if (editingBookId !== null) {

        const index = books.findIndex(
            function (book) {
                return book.id === editingBookId;
            }
        );


        if (index !== -1) {

            books[index] = {
                ...books[index],
                ...bookData
            };
        }

    } else {

        books.unshift({

            id: Date.now(),

            createdAt:
                new Date().toISOString(),

            ...bookData

        });
    }


    saveBooks();

    renderAll();

    closeModal();
}


/* =====================================================
   RATING
===================================================== */

function setupRating() {

    if (!ratingContainer) {
        return;
    }

    const buttons =
        ratingContainer.querySelectorAll("button");


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                selectedRating =
                    Number(button.dataset.rating) || 0;

                updateRating();
            }
        );
    });
}


function updateRating() {

    if (!ratingContainer) {
        return;
    }

    const buttons =
        ratingContainer.querySelectorAll("button");


    buttons.forEach(function (button) {

        const rating =
            Number(button.dataset.rating) || 0;

        button.classList.toggle(
            "active",
            rating <= selectedRating
        );
    });
}


/* =====================================================
   NAVIGATION
===================================================== */

function setupNavigation() {

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                const pageId =
                    item.dataset.page;

                showPage(pageId);
            }
        );
    });


    if (viewAllButton) {

        viewAllButton.addEventListener(
            "click",
            function () {

                showPage("libraryPage");
            }
        );
    }
}


function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function (page) {

        page.classList.add("hidden");
    });


    const target =
        document.getElementById(pageId);


    if (target) {

        target.classList.remove("hidden");
    }


    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(function (item) {

        item.classList.toggle(
            "active",
            item.dataset.page === pageId
        );
    });


    closeModal();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   SEARCH / FILTERS
===================================================== */

function setupSearchAndFilters() {

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderLibrary
        );
    }


    if (filterStatus) {

        filterStatus.addEventListener(
            "change",
            renderLibrary
        );
    }


    if (filterGenre) {

        filterGenre.addEventListener(
            "change",
            renderLibrary
        );
    }
}


function getFilteredBooks() {

    let result = books.slice();


    const search =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


    const status =
        filterStatus
            ? filterStatus.value
            : "all";


    const genre =
        filterGenre
            ? filterGenre.value
            : "all";


    if (search) {

        result = result.filter(
            function (book) {

                const title =
                    String(book.title || "")
                        .toLowerCase();

                const author =
                    String(book.author || "")
                        .toLowerCase();

                return (
                    title.includes(search) ||
                    author.includes(search)
                );
            }
        );
    }


    if (status !== "all") {

        result = result.filter(
            function (book) {
                return book.status === status;
            }
        );
    }


    if (genre !== "all") {

        result = result.filter(
            function (book) {
                return book.genre === genre;
            }
        );
    }


    return result;
}


/* =====================================================
   RENDER ALL
===================================================== */

function renderAll() {

    renderRecentBooks();

    renderLibrary();

    renderFavorites();

    updateStats();
}


/* =====================================================
   BOOK CARD
===================================================== */

function createBookCard(book) {

    const card =
        document.createElement("article");

    card.className = "book-card";


    const cover =
        document.createElement("div");

    cover.className = "book-cover";

    cover.textContent = "📖";

    cover.style.display = "flex";
    cover.style.alignItems = "center";
    cover.style.justifyContent = "center";
    cover.style.fontSize = "48px";


    const info =
        document.createElement("div");

    info.className = "book-info";


    const title =
        document.createElement("div");

    title.className = "book-title";

    title.textContent =
        book.title || "Sin título";


    const author =
        document.createElement("div");

    author.className = "book-author";

    author.textContent =
        book.author || "Autor desconocido";


    const meta =
        document.createElement("div");

    meta.className = "book-meta";

    meta.textContent =
        getStatusText(book.status);


    if (Number(book.rating) > 0) {

        meta.textContent +=
            " · " +
            "★".repeat(
                Math.min(5, Number(book.rating))
            );
    }


    info.appendChild(title);

    info.appendChild(author);

    info.appendChild(meta);

    card.appendChild(cover);

    card.appendChild(info);


    card.addEventListener(
        "click",
        function () {

            openModal(book);
        }
    );


    return card;
}


/* =====================================================
   RECENT BOOKS
===================================================== */

function renderRecentBooks() {

    if (!recentBooks) {
        return;
    }


    recentBooks.innerHTML = "";


    const recent =
        books.slice(0, 4);


    if (recent.length === 0) {

        recentBooks.appendChild(
            emptyMessage(
                "Aún no tienes libros",
                "Añade tu primer libro para comenzar."
            )
        );

        return;
    }


    recent.forEach(function (book) {

        recentBooks.appendChild(
            createBookCard(book)
        );
    });
}


/* =====================================================
   LIBRARY
===================================================== */

function renderLibrary() {

    if (!libraryBooks) {
        return;
    }


    libraryBooks.innerHTML = "";


    const filtered =
        getFilteredBooks();


    if (filtered.length === 0) {

        libraryBooks.appendChild(
            emptyMessage(
                "No hay libros",
                "Prueba con otros filtros o añade un libro."
            )
        );

        return;
    }


    filtered.forEach(function (book) {

        libraryBooks.appendChild(
            createBookCard(book)
        );
    });
}


/* =====================================================
   FAVORITES
===================================================== */

function renderFavorites() {

    if (!favoriteBooks) {
        return;
    }


    favoriteBooks.innerHTML = "";


    const favorites =
        books.filter(
            function (book) {
                return Boolean(book.favorite);
            }
        );


    if (favorites.length === 0) {

        favoriteBooks.appendChild(
            emptyMessage(
                "No tienes favoritos",
                "Marca tus libros favoritos con ♥."
            )
        );

        return;
    }


    favorites.forEach(function (book) {

        favoriteBooks.appendChild(
            createBookCard(book)
        );
    });
}


/* =====================================================
   EMPTY MESSAGE
===================================================== */

function emptyMessage(title, text) {

    const div =
        document.createElement("div");


    div.style.gridColumn = "1 / -1";

    div.style.padding = "40px 20px";

    div.style.textAlign = "center";

    div.style.color =
        "var(--text-secondary)";


    const strong =
        document.createElement("strong");

    strong.style.display = "block";

    strong.style.color = "var(--text)";

    strong.style.marginBottom = "6px";

    strong.textContent = title;


    const span =
        document.createElement("span");

    span.textContent = text;


    div.appendChild(strong);

    div.appendChild(span);


    return div;
}


/* =====================================================
   STATUS
===================================================== */

function getStatusText(status) {

    if (status === "read") {
        return "Leído";
    }

    if (status === "reading") {
        return "Leyendo";
    }

    if (status === "to-read") {
        return "Por leer";
    }

    return "";
}


/* =====================================================
   STATS
===================================================== */

function updateStats() {

    const total =
        books.length;


    const read =
        books.filter(
            function (book) {
                return book.status === "read";
            }
        ).length;


    const reading =
        books.filter(
            function (book) {
                return book.status === "reading";
            }
        ).length;


    const toRead =
        books.filter(
            function (book) {
                return book.status === "to-read";
            }
        ).length;


    if (totalBooks) {
        totalBooks.textContent = total;
    }

    if (readBooks) {
        readBooks.textContent = read;
    }

    if (readingBooks) {
        readingBooks.textContent = reading;
    }

    if (toReadBooks) {
        toReadBooks.textContent = toRead;
    }

    if (statsTotal) {
        statsTotal.textContent = total;
    }


    const percentage =
        total > 0
            ? Math.round((read / total) * 100)
            : 0;


    if (readPercentage) {
        readPercentage.textContent =
            percentage + "%";
    }


    if (readProgress) {
        readProgress.style.width =
            percentage + "%";
    }


    const ratedBooks =
        books.filter(
            function (book) {
                return Number(book.rating) > 0;
            }
        );


    let ratingAverage = 0;


    if (ratedBooks.length > 0) {

        const ratingSum =
            ratedBooks.reduce(
                function (sum, book) {

                    return (
                        sum +
                        Number(book.rating)
                    );
                },
                0
            );


        ratingAverage =
            ratingSum / ratedBooks.length;
    }


    if (averageRating) {

        averageRating.textContent =
            ratingAverage.toFixed(1);
    }


    const readPages =
        books
            .filter(
                function (book) {
                    return book.status === "read";
                }
            )
            .reduce(
                function (sum, book) {

                    return (
                        sum +
                        (Number(book.pages) || 0)
                    );
                },
                0
            );


    if (pagesRead) {
        pagesRead.textContent = readPages;
    }
}


/* =====================================================
   THEME
===================================================== */

function loadTheme() {

    let theme = "light";


    try {

        theme =
            localStorage.getItem(THEME_KEY) || "light";

    } catch (error) {

        theme = "light";
    }


    if (theme === "dark") {

        document.body.classList.add("dark");

    } else {

        document.body.classList.remove("dark");
    }


    updateThemeButtons();
}


function setupTheme() {

    if (themeButton) {

        themeButton.addEventListener(
            "click",
            toggleTheme
        );
    }


    if (settingsThemeButton) {

        settingsThemeButton.addEventListener(
            "click",
            toggleTheme
        );
    }
}


function toggleTheme() {

    document.body.classList.toggle("dark");


    const isDark =
        document.body.classList.contains("dark");


    try {

        localStorage.setItem(
            THEME_KEY,
            isDark ? "dark" : "light"
        );

    } catch (error) {

        console.error(
            "No se pudo guardar el tema:",
            error
        );
    }


    updateThemeButtons();
}


function updateThemeButtons() {

    const isDark =
        document.body.classList.contains("dark");


    if (themeButton) {

        themeButton.textContent =
            isDark ? "☀️" : "🌙";
    }


    if (settingsThemeButton) {

        settingsThemeButton.textContent =
            isDark ? "☀️" : "🌙";
    }
}


/* =====================================================
   IMPORT / EXPORT
===================================================== */

function setupImportExport() {

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            exportLibrary
        );
    }


    if (importButton) {

        importButton.addEventListener(
            "click",
            function () {

                if (importFile) {
                    importFile.click();
                }
            }
        );
    }


    if (importFile) {

        importFile.addEventListener(
            "change",
            importLibrary
        );
    }
}


function exportLibrary() {

    try {

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
                    type: "application/json"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "mis-libros.json";


        document.body.appendChild(link);

        link.click();

        link.remove();


        setTimeout(
            function () {
                URL.revokeObjectURL(url);
            },
            100
        );

    } catch (error) {

        console.error(
            "Error exportando:",
            error
        );

        alert(
            "No se pudo exportar la biblioteca."
        );
    }
}


function importLibrary(event) {

    const file =
        event.target.files &&
        event.target.files[0];


    if (!file) {
        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function () {

            try {

                const imported =
                    JSON.parse(reader.result);


                if (!Array.isArray(imported)) {

                    throw new Error(
                        "Formato incorrecto"
                    );
                }


                books =
                    imported.map(
                        function (book, index) {

                            return {

                                id:
                                    book.id ||
                                    Date.now() +
                                    index,

                                createdAt:
                                    book.createdAt ||
                                    new Date().toISOString(),

                                title:
                                    book.title || "",

                                author:
                                    book.author || "",

                                genre:
                                    book.genre || "Otro",

                                status:
                                    book.status || "to-read",

                                pages:
                                    Number(book.pages) || 0,

                                progress:
                                    Number(book.progress) || 0,

                                startDate:
                                    book.startDate || "",

                                finishDate:
                                    book.finishDate || "",

                                rating:
                                    Number(book.rating) || 0,

                                notes:
                                    book.notes || "",

                                favorite:
                                    Boolean(book.favorite)
                            };
                        }
                    );


                saveBooks();

                renderAll();

                alert(
                    "Biblioteca importada correctamente."
                );

            } catch (error) {

                console.error(
                    "Error importando:",
                    error
                );

                alert(
                    "No se pudo importar el archivo."
                );
            }


            event.target.value = "";
        };


    reader.onerror =
        function () {

            alert(
                "No se pudo leer el archivo."
            );

            event.target.value = "";
        };


    reader.readAsText(file);
}


/* =====================================================
   CLEAR DATA
===================================================== */

function setupClearData() {

    if (!clearButton) {
        return;
    }


    clearButton.addEventListener(
        "click",
        function () {

            if (books.length === 0) {

                alert(
                    "No hay libros para eliminar."
                );

                return;
            }


            const confirmed =
                confirm(
                    "¿Seguro que quieres eliminar todos tus libros? Esta acción no se puede deshacer."
                );


            if (!confirmed) {
                return;
            }


            books = [];

            saveBooks();

            renderAll();

            closeModal();
        }
    );
}
