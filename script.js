```javascript
/* =====================================================
   MIS LIBROS
   script.js
   Compatible con el index.html y style.css actuales
===================================================== */


/* =====================================================
   DATA
===================================================== */

const STORAGE_KEY = "mis_libros_v2";

let books = [];

try {
    books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
} catch (error) {
    console.error("Error leyendo la biblioteca:", error);
    books = [];
}

let editingBookId = null;
let selectedRating = 0;


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
const settingsThemeButton = document.getElementById("settingsThemeButton");

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
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /*
       IMPORTANTE:
       El modal empieza SIEMPRE cerrado.
    */
    closeModal();

    loadTheme();
    renderAll();
    setupNavigation();
    setupModal();
    setupRating();
    setupSearchAndFilters();
    setupTheme();
    setupImportExport();
    setupClearData();

});


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

    /*
       Si se está editando
    */
    if (book) {

        editingBookId = book.id;

        modalTitle.textContent = "Editar libro";

        titleInput.value = book.title || "";
        authorInput.value = book.author || "";
        genreInput.value = book.genre || "Novela";
        statusInput.value = book.status || "to-read";
        pagesInput.value = book.pages || "";
        progressInput.value = book.progress || 0;
        startDateInput.value = book.startDate || "";
        finishDateInput.value = book.finishDate || "";
        notesInput.value = book.notes || "";
        favoriteInput.checked = !!book.favorite;

        selectedRating = Number(book.rating) || 0;

    } else {

        editingBookId = null;

        modalTitle.textContent = "Añadir libro";

        bookForm.reset();

        selectedRating = 0;

        progressInput.value = 0;
    }

    updateRating();

    /*
       Abrir modal
    */
    modal.classList.remove("hidden");

    /*
       Evita que quede bloqueado por display anterior.
    */
    modal.style.display = "flex";

    document.body.style.overflow = "hidden";

    setTimeout(() => {

        if (titleInput) {
            titleInput.focus();
        }

    }, 50);
}


function closeModal() {

    /*
       Esta función es la importante.
       La clase hidden del CSS tiene display:none.
    */

    if (!modal) return;

    modal.classList.add("hidden");

    /*
       Quitamos cualquier display inline
       que pudiera haber quedado de una apertura anterior.
    */
    modal.style.display = "";

    document.body.style.overflow = "";

    editingBookId = null;
    selectedRating = 0;

}


/* =====================================================
   MODAL EVENTS
===================================================== */

function setupModal() {

    /*
       Botón X
    */
    if (closeModalButton) {

        closeModalButton.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            closeModal();

        });

    }


    /*
       Botón Cancelar
    */
    if (cancelButton) {

        cancelButton.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            closeModal();

        });

    }


    /*
       Añadir desde HERO
    */
    if (heroAddButton) {

        heroAddButton.addEventListener("click", () => {

            openModal();

        });

    }


    /*
       Añadir desde botón +
    */
    if (addBookButton) {

        addBookButton.addEventListener("click", () => {

            openModal();

        });

    }


    /*
       Cerrar haciendo click fuera de la ventana.
    */
    if (modal) {

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {

                closeModal();

            }

        });

    }


    /*
       ESCAPE
    */
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (
                modal &&
                !modal.classList.contains("hidden")
            ) {

                closeModal();

            }

        }

    });


    /*
       Guardar libro
    */
    if (bookForm) {

        bookForm.addEventListener("submit", (event) => {

            event.preventDefault();

            saveBook();

        });

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

    let progress = Number(progressInput.value) || 0;

    progress = Math.max(
        0,
        Math.min(100, progress)
    );


    const bookData = {

        title,
        author,

        genre:
            genreInput.value || "Otro",

        status:
            statusInput.value || "to-read",

        pages:
            Number(pagesInput.value) || 0,

        progress,

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


    /*
       EDITAR
    */
    if (editingBookId !== null) {

        const index = books.findIndex(
            book => book.id === editingBookId
        );

        if (index !== -1) {

            books[index] = {
                ...books[index],
                ...bookData
            };

        }

    }

    /*
       NUEVO
    */
    else {

        books.unshift({

            id:
                Date.now(),

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

    if (!ratingContainer) return;

    const buttons =
        ratingContainer.querySelectorAll("button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            selectedRating =
                Number(button.dataset.rating);

            updateRating();

        });

    });

}


function updateRating() {

    if (!ratingContainer) return;

    const buttons =
        ratingContainer.querySelectorAll("button");

    buttons.forEach(button => {

        const rating =
            Number(button.dataset.rating);

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

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const pageId =
                item.dataset.page;

            showPage(pageId);

        });

    });


    if (viewAllButton) {

        viewAllButton.addEventListener("click", () => {

            showPage("libraryPage");

        });

    }

}


function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.add("hidden");

    });


    const target =
        document.getElementById(pageId);

    if (target) {

        target.classList.remove("hidden");

    }


    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.page === pageId
        );

    });


    /*
       Si cambiamos de página mientras el modal está abierto,
       lo cerramos.
    */
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

    let result = [...books];

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

        result = result.filter(book => {

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

        });

    }


    if (status !== "all") {

        result = result.filter(
            book => book.status === status
        );

    }


    if (genre !== "all") {

        result = result.filter(
            book => book.genre === genre
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


    /*
       No necesitamos imágenes externas.
       Mostramos una portada limpia y estable.
    */
    cover.innerHTML = "📖";


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


    if (book.rating) {

        meta.textContent +=
            " · " +
            "★".repeat(book.rating);

    }


    info.appendChild(title);
    info.appendChild(author);
    info.appendChild(meta);


    card.appendChild(cover);
    card.appendChild(info);


    /*
       Editar al hacer click
    */
    card.addEventListener("click", () => {

        openModal(book);

    });


    return card;

}


/* =====================================================
   RECENT
===================================================== */

function renderRecentBooks() {

    if (!recentBooks) return;

    recentBooks.innerHTML = "";

    const recent =
        books.slice(0, 4);


    if (!recent.length) {

        recentBooks.innerHTML =
            emptyMessage(
                "Aún no tienes libros",
                "Añade tu primer libro para comenzar."
            );

        return;

    }


    recent.forEach(book => {

        recentBooks.appendChild(
            createBookCard(book)
        );

    });

}


/* =====================================================
   LIBRARY
===================================================== */

function renderLibrary() {

    if (!libraryBooks) return;

    libraryBooks.innerHTML = "";

    const filtered =
        getFilteredBooks();


    if (!filtered.length) {

        libraryBooks.innerHTML =
            emptyMessage(
                "No hay libros",
                "Prueba con otros filtros o añade un libro."
            );

        return;

    }


    filtered.forEach(book => {

        libraryBooks.appendChild(
            createBookCard(book)
        );

    });

}


/* =====================================================
   FAVORITES
===================================================== */

function renderFavorites() {

    if (!favoriteBooks) return;

    favoriteBooks.innerHTML = "";

    const favorites =
        books.filter(book => book.favorite);


    if (!favorites.length) {

        favoriteBooks.innerHTML =
            emptyMessage(
                "No tienes favoritos",
                "Marca tus libros favoritos con ♥."
            );

        return;

    }


    favorites.forEach(book => {

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
    div.style.color = "var(--text-secondary)";


    div.innerHTML = `
        <strong
            style="
                display:block;
                color:var(--text);
                margin-bottom:6px;
            "
        >
            ${escapeHtml(title)}
        </strong>

        <span>
            ${escapeHtml(text)}
        </span>
    `;


    return div;

}


/* =====================================================
   STATUS
===================================================== */

function getStatusText(status) {

    switch (status) {

        case "read":
            return "Leído";

        case "reading":
            return "Leyendo";

        case "to-read":
            return "Por leer";

        default:
            return "";

    }

}


/* =====================================================
   STATS
===================================================== */

function updateStats() {

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


    if (totalBooks)
        totalBooks.textContent = total;

    if (readBooks)
        readBooks.textContent = read;

    if (readingBooks)
        readingBooks.textContent = reading;

    if (toReadBooks)
        toReadBooks.textContent = toRead;


    if (statsTotal)
        statsTotal.textContent = total;


    const percentage =
        total
            ? Math.round((read / total) * 100)
            : 0;


    if (readPercentage)
        readPercentage.textContent =
            percentage + "%";


    if (readProgress)
        readProgress.style.width =
            percentage + "%";


    const ratedBooks =
        books.filter(
            book => Number(book.rating) > 0
        );


    const ratingAverage =
        ratedBooks.length
            ? ratedBooks.reduce(
                (sum, book) =>
                    sum + Number(book.rating),
                0
            ) / ratedBooks.length
            : 0;


    if (averageRating)
        averageRating.textContent =
            ratingAverage.toFixed(1);


    const readPages =
        books
            .filter(book => book.status === "read")
            .reduce(
                (sum, book) =>
                    sum + (Number(book.pages) || 0),
                0
            );


    if (pagesRead)
        pagesRead.textContent =
            readPages;

}


/* =====================================================
   THEME
===================================================== */

function loadTheme() {

    const theme =
        localStorage.getItem("mis_libros_theme");


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


    localStorage.setItem(
        "mis_libros_theme",
        isDark ? "dark" : "light"
    );


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
   EXPORT
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
            () => {

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
    link.download = "mis-libros.json";


    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

}


function importLibrary(event) {

    const file =
        event.target.files[0];


    if (!file) return;


    const reader =
        new FileReader();


    reader.onload = () => {

        try {

            const imported =
                JSON.parse(reader.result);


            if (!Array.isArray(imported)) {

                throw new Error(
                    "Formato incorrecto"
                );

            }


            books =
                imported.map(book => ({

                    id:
                        book.id || Date.now() + Math.random(),

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
                        !!book.favorite

                }));


            saveBooks();
            renderAll();


            alert(
                "Biblioteca importada correctamente."
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "No se pudo importar el archivo."
            );

        }


        event.target.value = "";

    };


    reader.readAsText(file);

}


/* =====================================================
   CLEAR DATA
===================================================== */

function setupClearData() {

    if (!clearButton) return;


    clearButton.addEventListener(
        "click",
        () => {

            if (!books.length) {

                alert(
                    "No hay libros para eliminar."
                );

                return;

            }


            const confirmed =
                confirm(
                    "¿Seguro que quieres eliminar todos tus libros? Esta acción no se puede deshacer."
                );


            if (!confirmed) return;


            books = [];

            saveBooks();

            renderAll();

            closeModal();

        }
    );

}


/* =====================================================
   SECURITY / HTML ESCAPE
===================================================== */

function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}
```
