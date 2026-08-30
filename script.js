```javascript
/* =========================================================
   MIS LIBROS
   JavaScript completo
   Compatible con index.html + style.css
   ========================================================= */


/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

const STORAGE_KEY = "mis_libros_v2";
const THEME_KEY = "mis_libros_theme";


/* =========================================================
   DATOS
   ========================================================= */

let books = [];

let editingBookId = null;
let selectedRating = 0;


/* =========================================================
   CARGAR DATOS
   ========================================================= */

try {
    const savedBooks = localStorage.getItem(STORAGE_KEY);

    if (savedBooks) {
        const parsed = JSON.parse(savedBooks);

        if (Array.isArray(parsed)) {
            books = parsed;
        }
    }
} catch (error) {
    console.error("Error cargando libros:", error);
    books = [];
}


/* =========================================================
   DOM
   ========================================================= */

const modal = document.getElementById("modal");

const closeModalButton =
    document.getElementById("closeModal");

const cancelButton =
    document.getElementById("cancelButton");

const bookForm =
    document.getElementById("bookForm");

const heroAddButton =
    document.getElementById("heroAddButton");

const addBookButton =
    document.getElementById("addBookButton");

const modalTitle =
    document.getElementById("modalTitle");

const themeButton =
    document.getElementById("themeButton");

const settingsThemeButton =
    document.getElementById("settingsThemeButton");

const viewAllButton =
    document.getElementById("viewAllButton");

const searchInput =
    document.getElementById("searchInput");

const filterStatus =
    document.getElementById("filterStatus");

const filterGenre =
    document.getElementById("filterGenre");

const exportButton =
    document.getElementById("exportButton");

const importButton =
    document.getElementById("importButton");

const importFile =
    document.getElementById("importFile");

const clearButton =
    document.getElementById("clearButton");


/* =========================================================
   FORMULARIO
   ========================================================= */

const titleInput =
    document.getElementById("title");

const authorInput =
    document.getElementById("author");

const genreInput =
    document.getElementById("genre");

const statusInput =
    document.getElementById("status");

const pagesInput =
    document.getElementById("pages");

const progressInput =
    document.getElementById("progress");

const startDateInput =
    document.getElementById("startDate");

const finishDateInput =
    document.getElementById("finishDate");

const ratingContainer =
    document.getElementById("rating");

const notesInput =
    document.getElementById("notes");

const favoriteInput =
    document.getElementById("favorite");


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
       MUY IMPORTANTE:

       El CSS muestra .modal-overlay por defecto.
       Por eso lo ocultamos inmediatamente al cargar.
    */

    if (modal) {
        modal.classList.add("hidden");
    }

    loadTheme();

    updateStats();

    renderRecentBooks();

    renderLibrary();

    renderFavorites();

    updateStatisticsPage();

    setupNavigation();

    setupEvents();

});


/* =========================================================
   EVENTOS
   ========================================================= */

function setupEvents() {

    /* -----------------------------------------
       ABRIR MODAL
       ----------------------------------------- */

    if (heroAddButton) {
        heroAddButton.addEventListener("click", () => {
            openAddModal();
        });
    }

    if (addBookButton) {
        addBookButton.addEventListener("click", () => {
            openAddModal();
        });
    }


    /* -----------------------------------------
       CERRAR MODAL
       ----------------------------------------- */

    if (closeModalButton) {
        closeModalButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            closeModal();
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            closeModal();
        });
    }


    /* -----------------------------------------
       CERRAR AL HACER CLICK FUERA
       ----------------------------------------- */

    if (modal) {

        modal.addEventListener("click", (event) => {

            /*
               Solo cerramos si el click ha sido
               directamente sobre el fondo.

               Si se pulsa dentro del formulario/modal,
               NO se cierra.
            */

            if (event.target === modal) {
                closeModal();
            }

        });

    }


    /* -----------------------------------------
       ESC PARA CERRAR
       ----------------------------------------- */

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


    /* -----------------------------------------
       FORMULARIO
       ----------------------------------------- */

    if (bookForm) {

        bookForm.addEventListener("submit", (event) => {

            event.preventDefault();

            saveBook();

        });

    }


    /* -----------------------------------------
       ESTRELLAS
       ----------------------------------------- */

    if (ratingContainer) {

        const ratingButtons =
            ratingContainer.querySelectorAll(
                "button[data-rating]"
            );

        ratingButtons.forEach(button => {

            button.addEventListener("click", () => {

                selectedRating =
                    Number(button.dataset.rating);

                updateRatingVisual();

            });

        });

    }


    /* -----------------------------------------
       TEMA
       ----------------------------------------- */

    if (themeButton) {

        themeButton.addEventListener("click", () => {
            toggleTheme();
        });

    }

    if (settingsThemeButton) {

        settingsThemeButton.addEventListener("click", () => {
            toggleTheme();
        });

    }


    /* -----------------------------------------
       VER TODOS
       ----------------------------------------- */

    if (viewAllButton) {

        viewAllButton.addEventListener("click", () => {

            showPage("libraryPage");

        });

    }


    /* -----------------------------------------
       BÚSQUEDA
       ----------------------------------------- */

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            renderLibrary();

        });

    }


    /* -----------------------------------------
       FILTRO ESTADO
       ----------------------------------------- */

    if (filterStatus) {

        filterStatus.addEventListener("change", () => {

            renderLibrary();

        });

    }


    /* -----------------------------------------
       FILTRO GÉNERO
       ----------------------------------------- */

    if (filterGenre) {

        filterGenre.addEventListener("change", () => {

            renderLibrary();

        });

    }


    /* -----------------------------------------
       EXPORTAR
       ----------------------------------------- */

    if (exportButton) {

        exportButton.addEventListener("click", () => {

            exportLibrary();

        });

    }


    /* -----------------------------------------
       IMPORTAR
       ----------------------------------------- */

    if (importButton) {

        importButton.addEventListener("click", () => {

            if (importFile) {
                importFile.click();
            }

        });

    }

    if (importFile) {

        importFile.addEventListener("change", (event) => {

            importLibrary(event);

        });

    }


    /* -----------------------------------------
       ELIMINAR TODOS
       ----------------------------------------- */

    if (clearButton) {

        clearButton.addEventListener("click", () => {

            clearLibrary();

        });

    }

}


/* =========================================================
   MODAL
   ========================================================= */

function openAddModal() {

    editingBookId = null;

    if (modalTitle) {
        modalTitle.textContent = "Añadir libro";
    }

    resetForm();

    /*
       QUITAMOS hidden SOLO AQUÍ.
    */

    if (modal) {
        modal.classList.remove("hidden");
    }

    /*
       Evitamos que el body se desplace
       mientras el modal está abierto.
    */

    document.body.style.overflow = "hidden";

    setTimeout(() => {

        if (titleInput) {
            titleInput.focus();
        }

    }, 50);

}


function openEditModal(bookId) {

    const book =
        books.find(item => item.id === bookId);

    if (!book) {
        return;
    }

    editingBookId = bookId;

    if (modalTitle) {
        modalTitle.textContent = "Editar libro";
    }


    /* -----------------------------------------
       CARGAR DATOS
       ----------------------------------------- */

    if (titleInput) {
        titleInput.value = book.title || "";
    }

    if (authorInput) {
        authorInput.value = book.author || "";
    }

    if (genreInput) {
        genreInput.value =
            book.genre || "Novela";
    }

    if (statusInput) {
        statusInput.value =
            book.status || "to-read";
    }

    if (pagesInput) {
        pagesInput.value =
            book.pages || "";
    }

    if (progressInput) {
        progressInput.value =
            book.progress || 0;
    }

    if (startDateInput) {
        startDateInput.value =
            book.startDate || "";
    }

    if (finishDateInput) {
        finishDateInput.value =
            book.finishDate || "";
    }

    if (notesInput) {
        notesInput.value =
            book.notes || "";
    }

    if (favoriteInput) {
        favoriteInput.checked =
            Boolean(book.favorite);
    }


    selectedRating =
        Number(book.rating) || 0;

    updateRatingVisual();


    /* -----------------------------------------
       MOSTRAR MODAL
       ----------------------------------------- */

    if (modal) {
        modal.classList.remove("hidden");
    }

    document.body.style.overflow = "hidden";

}


function closeModal() {

    /*
       AQUÍ ESTÁ LA CORRECCIÓN PRINCIPAL.

       Añadimos hidden.
       NO usamos display:flex.
       NO recreamos el modal.
       NO disparamos ningún botón.
    */

    if (!modal) {
        return;
    }

    modal.classList.add("hidden");

    /*
       Restaurar scroll.
    */

    document.body.style.overflow = "";

    /*
       Limpiar estado de edición.
    */

    editingBookId = null;

    selectedRating = 0;

}


function resetForm() {

    if (bookForm) {
        bookForm.reset();
    }

    if (statusInput) {
        statusInput.value = "to-read";
    }

    if (progressInput) {
        progressInput.value = 0;
    }

    selectedRating = 0;

    updateRatingVisual();

}


/* =========================================================
   RATING
   ========================================================= */

function updateRatingVisual() {

    if (!ratingContainer) {
        return;
    }

    const buttons =
        ratingContainer.querySelectorAll(
            "button[data-rating]"
        );

    buttons.forEach(button => {

        const value =
            Number(button.dataset.rating);

        button.classList.toggle(
            "active",
            value <= selectedRating
        );

    });

}


/* =========================================================
   GUARDAR LIBRO
   ========================================================= */

function saveBook() {

    const title =
        titleInput
            ? titleInput.value.trim()
            : "";

    const author =
        authorInput
            ? authorInput.value.trim()
            : "";


    if (!title || !author) {

        alert(
            "Por favor, introduce el título y el autor."
        );

        return;

    }


    let pages =
        pagesInput
            ? Number(pagesInput.value) || 0
            : 0;

    let progress =
        progressInput
            ? Number(progressInput.value) || 0
            : 0;


    /*
       Limitar valores.
    */

    pages = Math.max(0, pages);

    progress =
        Math.max(
            0,
            Math.min(100, progress)
        );


    const bookData = {

        title,

        author,

        genre:
            genreInput
                ? genreInput.value
                : "Otro",

        status:
            statusInput
                ? statusInput.value
                : "to-read",

        pages,

        progress,

        startDate:
            startDateInput
                ? startDateInput.value
                : "",

        finishDate:
            finishDateInput
                ? finishDateInput.value
                : "",

        rating:
            selectedRating,

        notes:
            notesInput
                ? notesInput.value.trim()
                : "",

        favorite:
            favoriteInput
                ? favoriteInput.checked
                : false

    };


    /* -----------------------------------------
       EDITAR
       ----------------------------------------- */

    if (editingBookId !== null) {

        const index =
            books.findIndex(
                book => book.id === editingBookId
            );

        if (index !== -1) {

            books[index] = {
                ...books[index],
                ...bookData,
                updatedAt: Date.now()
            };

        }

    }

    /* -----------------------------------------
       NUEVO
       ----------------------------------------- */

    else {

        const newBook = {

            id:
                Date.now().toString() +
                Math.random()
                    .toString(36)
                    .substring(2, 9),

            ...bookData,

            createdAt: Date.now(),

            updatedAt: Date.now()

        };

        books.unshift(newBook);

    }


    saveBooks();

    closeModal();

    updateEverything();

}


/* =========================================================
   ELIMINAR LIBRO
   ========================================================= */

function deleteBook(bookId) {

    const book =
        books.find(
            item => item.id === bookId
        );

    if (!book) {
        return;
    }


    const confirmed =
        confirm(
            `¿Quieres eliminar "${book.title}" de tu biblioteca?`
        );


    if (!confirmed) {
        return;
    }


    books =
        books.filter(
            item => item.id !== bookId
        );


    saveBooks();

    updateEverything();

}


/* =========================================================
   FAVORITO
   ========================================================= */

function toggleFavorite(bookId) {

    const book =
        books.find(
            item => item.id === bookId
        );

    if (!book) {
        return;
    }

    book.favorite =
        !Boolean(book.favorite);

    book.updatedAt = Date.now();

    saveBooks();

    updateEverything();

}


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function saveBooks() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(books)
        );

    } catch (error) {

        console.error(
            "No se pudieron guardar los libros:",
            error
        );

    }

}


/* =========================================================
   ESTADÍSTICAS SUPERIORES
   ========================================================= */

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


    const totalElement =
        document.getElementById("totalBooks");

    const readElement =
        document.getElementById("readBooks");

    const readingElement =
        document.getElementById("readingBooks");

    const toReadElement =
        document.getElementById("toReadBooks");


    if (totalElement) {
        totalElement.textContent = total;
    }

    if (readElement) {
        readElement.textContent = read;
    }

    if (readingElement) {
        readingElement.textContent = reading;
    }

    if (toReadElement) {
        toReadElement.textContent = toRead;
    }

}


/* =========================================================
   LIBROS RECIENTES
   ========================================================= */

function renderRecentBooks() {

    const container =
        document.getElementById("recentBooks");

    if (!container) {
        return;
    }


    /*
       Mostrar los últimos 4 libros.
    */

    const recent =
        books.slice(0, 4);


    if (recent.length === 0) {

        container.innerHTML =
            createEmptyState(
                "📚",
                "Todavía no tienes libros",
                "Añade tu primer libro para empezar tu biblioteca."
            );

        return;

    }


    container.innerHTML =
        recent
            .map(book => createBookCard(book))
            .join("");

}


/* =========================================================
   BIBLIOTECA
   ========================================================= */

function renderLibrary() {

    const container =
        document.getElementById("libraryBooks");

    if (!container) {
        return;
    }


    let filtered =
        [...books];


    /* -----------------------------------------
       BÚSQUEDA
       ----------------------------------------- */

    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    if (search) {

        filtered =
            filtered.filter(book => {

                const title =
                    String(
                        book.title || ""
                    ).toLowerCase();

                const author =
                    String(
                        book.author || ""
                    ).toLowerCase();

                return (
                    title.includes(search) ||
                    author.includes(search)
                );

            });

    }


    /* -----------------------------------------
       ESTADO
       ----------------------------------------- */

    const selectedStatus =
        filterStatus
            ? filterStatus.value
            : "all";


    if (selectedStatus !== "all") {

        filtered =
            filtered.filter(
                book =>
                    book.status === selectedStatus
            );

    }


    /* -----------------------------------------
       GÉNERO
       ----------------------------------------- */

    const selectedGenre =
        filterGenre
            ? filterGenre.value
            : "all";


    if (selectedGenre !== "all") {

        filtered =
            filtered.filter(
                book =>
                    book.genre === selectedGenre
            );

    }


    /* -----------------------------------------
       RESULTADO VACÍO
       ----------------------------------------- */

    if (filtered.length === 0) {

        if (books.length === 0) {

            container.innerHTML =
                createEmptyState(
                    "📚",
                    "Tu biblioteca está vacía",
                    "Añade tu primer libro para comenzar."
                );

        } else {

            container.innerHTML =
                createEmptyState(
                    "🔎",
                    "No encontramos libros",
                    "Prueba con otra búsqueda o cambia los filtros."
                );

        }

        return;

    }


    container.innerHTML =
        filtered
            .map(book => createBookCard(book))
            .join("");

}


/* =========================================================
   FAVORITOS
   ========================================================= */

function renderFavorites() {

    const container =
        document.getElementById("favoriteBooks");

    if (!container) {
        return;
    }


    const favorites =
        books.filter(
            book => Boolean(book.favorite)
        );


    if (favorites.length === 0) {

        container.innerHTML =
            createEmptyState(
                "♥",
                "No tienes favoritos",
                "Marca tus libros especiales como favoritos."
            );

        return;

    }


    container.innerHTML =
        favorites
            .map(book => createBookCard(book))
            .join("");

}


/* =========================================================
   CREAR TARJETA DE LIBRO
   ========================================================= */

function createBookCard(book) {

    const title =
        escapeHTML(book.title || "Sin título");

    const author =
        escapeHTML(book.author || "Autor desconocido");

    const genre =
        escapeHTML(book.genre || "Otro");


    const rating =
        Number(book.rating) || 0;


    const statusText =
        getStatusText(book.status);


    const progress =
        Number(book.progress) || 0;


    const pages =
        Number(book.pages) || 0;


    const favorite =
        Boolean(book.favorite);


    const stars =
        createStars(rating);


    /*
       Como el HTML no tiene campo para portada,
       usamos una portada visual generada.
    */

    const cover =
        createBookCover(book);


    return `

        <article
            class="book-card"
            data-book-id="${escapeAttribute(book.id)}"
        >

            ${cover}

            <div class="book-info">

                <div class="book-title">
                    ${title}
                </div>

                <div class="book-author">
                    ${author}
                </div>

                <div class="book-meta">
                    ${genre}
                </div>

                <div
                    style="
                        margin-top:8px;
                        color:var(--text-secondary);
                        font-size:12px;
                    "
                >
                    ${stars}
                </div>

                <div
                    style="
                        margin-top:7px;
                        color:var(--accent);
                        font-size:12px;
                        font-weight:700;
                    "
                >
                    ${statusText}
                    ${pages ? ` · ${pages} pág.` : ""}
                </div>

                ${
                    book.status === "reading"
                        ? `
                            <div
                                style="
                                    margin-top:8px;
                                    height:6px;
                                    background:var(--surface-soft);
                                    border-radius:99px;
                                    overflow:hidden;
                                "
                            >
                                <div
                                    style="
                                        width:${progress}%;
                                        height:100%;
                                        background:var(--accent);
                                        border-radius:99px;
                                    "
                                ></div>
                            </div>

                            <div
                                style="
                                    margin-top:4px;
                                    color:var(--text-muted);
                                    font-size:11px;
                                "
                            >
                                ${progress}% completado
                            </div>
                        `
                        : ""
                }

                <div
                    style="
                        display:flex;
                        gap:7px;
                        margin-top:12px;
                    "
                >

                    <button
                        type="button"
                        class="text-button"
                        style="font-size:12px;"
                        onclick="editBook('${escapeAttribute(book.id)}')"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="text-button"
                        style="
                            font-size:12px;
                            color:${favorite ? "var(--danger)" : "var(--text-secondary)"};
                        "
                        onclick="favoriteBook('${escapeAttribute(book.id)}')"
                    >
                        ${favorite ? "♥ Favorito" : "♡ Favorito"}
                    </button>

                    <button
                        type="button"
                        class="text-button"
                        style="
                            font-size:12px;
                            color:var(--danger);
                        "
                        onclick="removeBook('${escapeAttribute(book.id)}')"
                    >
                        Eliminar
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   PORTADA VISUAL
   ========================================================= */

function createBookCover(book) {

    const title =
        escapeHTML(
            book.title || "Libro"
        );


    const firstLetter =
        escapeHTML(
            (book.title || "L")
                .trim()
                .charAt(0)
                .toUpperCase()
        );


    return `

        <div
            class="book-cover"
            style="
                display:flex;
                align-items:center;
                justify-content:center;
                flex-direction:column;
                padding:20px;
                text-align:center;
                background:var(--accent-light);
                color:var(--accent);
            "
        >

            <div
                style="
                    font-family:'Playfair Display',serif;
                    font-size:46px;
                    line-height:1;
                    margin-bottom:12px;
                "
            >
                ${firstLetter}
            </div>

            <div
                style="
                    font-family:'Playfair Display',serif;
                    font-size:15px;
                    line-height:1.25;
                "
            >
                ${title}
            </div>

        </div>

    `;

}


/* =========================================================
   ESTRELLAS
   ========================================================= */

function createStars(rating) {

    let result = "";

    for (let i = 1; i <= 5; i++) {

        result +=
            i <= rating
                ? "★"
                : "☆";

    }

    return result;

}


/* =========================================================
   ESTADOS
   ========================================================= */

function getStatusText(status) {

    switch (status) {

        case "read":
            return "✓ Leído";

        case "reading":
            return "📖 Leyendo";

        case "to-read":
            return "🔖 Por leer";

        default:
            return "Por leer";

    }

}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function createEmptyState(
    icon,
    title,
    description
) {

    return `

        <div
            style="
                grid-column:1 / -1;
                padding:55px 25px;
                text-align:center;
                background:var(--surface);
                border:1px dashed var(--border);
                border-radius:var(--radius);
            "
        >

            <div
                style="
                    font-size:42px;
                    margin-bottom:12px;
                "
            >
                ${icon}
            </div>

            <h3
                style="
                    font-family:'Playfair Display',serif;
                    font-size:22px;
                "
            >
                ${escapeHTML(title)}
            </h3>

            <p
                style="
                    margin-top:6px;
                    color:var(--text-secondary);
                    font-size:13px;
                "
            >
                ${escapeHTML(description)}
            </p>

        </div>

    `;

}


/* =========================================================
   FUNCIONES DE TARJETAS
   ========================================================= */

function editBook(bookId) {

    openEditModal(bookId);

}


function favoriteBook(bookId) {

    toggleFavorite(bookId);

}


function removeBook(bookId) {

    deleteBook(bookId);

}


/*
   Hacemos las funciones accesibles desde
   los onclick de las tarjetas.
*/

window.editBook = editBook;
window.favoriteBook = favoriteBook;
window.removeBook = removeBook;


/* =========================================================
   NAVEGACIÓN
   ========================================================= */

function setupNavigation() {

    const navItems =
        document.querySelectorAll(
            ".nav-item[data-page]"
        );


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const pageId =
                item.dataset.page;

            showPage(pageId);

        });

    });

}


function showPage(pageId) {

    const pages =
        document.querySelectorAll(
            ".page"
        );


    pages.forEach(page => {

        page.classList.add("hidden");

    });


    const selectedPage =
        document.getElementById(pageId);


    if (selectedPage) {

        selectedPage.classList.remove(
            "hidden"
        );

    }


    const navItems =
        document.querySelectorAll(
            ".nav-item[data-page]"
        );


    navItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.page === pageId
        );

    });


    /*
       Actualizar contenido cuando
       se entra en una página.
    */

    if (pageId === "libraryPage") {
        renderLibrary();
    }

    if (pageId === "favoritesPage") {
        renderFavorites();
    }

    if (pageId === "statsPage") {
        updateStatisticsPage();
    }

}


/* =========================================================
   ESTADÍSTICAS
   ========================================================= */

function updateStatisticsPage() {

    const total =
        books.length;


    const read =
        books.filter(
            book => book.status === "read"
        ).length;


    const statsTotal =
        document.getElementById(
            "statsTotal"
        );


    const readPercentage =
        document.getElementById(
            "readPercentage"
        );


    const readProgress =
        document.getElementById(
            "readProgress"
        );


    const averageRating =
        document.getElementById(
            "averageRating"
        );


    const pagesRead =
        document.getElementById(
            "pagesRead"
        );


    if (statsTotal) {
        statsTotal.textContent = total;
    }


    const percentage =
        total > 0
            ? Math.round(
                (read / total) * 100
            )
            : 0;


    if (readPercentage) {
        readPercentage.textContent =
            `${percentage}%`;
    }


    if (readProgress) {
        readProgress.style.width =
            `${percentage}%`;
    }


    const ratedBooks =
        books.filter(
            book =>
                Number(book.rating) > 0
        );


    const ratingAverage =
        ratedBooks.length > 0
            ? ratedBooks.reduce(
                (sum, book) =>
                    sum + Number(book.rating),
                0
            ) / ratedBooks.length
            : 0;


    if (averageRating) {

        averageRating.textContent =
            ratingAverage.toFixed(1);

    }


    const readPages =
        books
            .filter(
                book =>
                    book.status === "read"
            )
            .reduce(
                (sum, book) =>
                    sum + (Number(book.pages) || 0),
                0
            );


    if (pagesRead) {
        pagesRead.textContent =
            readPages;
    }

}


/* =========================================================
   ACTUALIZAR TODO
   ========================================================= */

function updateEverything() {

    updateStats();

    renderRecentBooks();

    renderLibrary();

    renderFavorites();

    updateStatisticsPage();

}


/* =========================================================
   TEMA
   ========================================================= */

function loadTheme() {

    let theme = null;

    try {
        theme =
            localStorage.getItem(
                THEME_KEY
            );
    } catch (error) {
        theme = null;
    }


    if (theme === "dark") {

        document.body.classList.add(
            "dark"
        );

    } else {

        document.body.classList.remove(
            "dark"
        );

    }


    updateThemeButtons();

}


function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    const isDark =
        document.body.classList.contains(
            "dark"
        );


    try {

        localStorage.setItem(
            THEME_KEY,
            isDark
                ? "dark"
                : "light"
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
        document.body.classList.contains(
            "dark"
        );


    const icon =
        isDark
            ? "☀️"
            : "🌙";


    if (themeButton) {
        themeButton.textContent = icon;
    }

    if (settingsThemeButton) {
        settingsThemeButton.textContent = icon;
    }

}


/* =========================================================
   EXPORTAR
   ========================================================= */

function exportLibrary() {

    const data = {

        app: "Mis Libros",

        version: 2,

        exportedAt:
            new Date().toISOString(),

        books

    };


    const json =
        JSON.stringify(
            data,
            null,
            2
        );


    const blob =
        new Blob(
            [json],
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
        "mis-libros-backup.json";


    document.body.appendChild(link);

    link.click();

    link.remove();


    URL.revokeObjectURL(url);

}


/* =========================================================
   IMPORTAR
   ========================================================= */

function importLibrary(event) {

    const file =
        event.target.files &&
        event.target.files[0];


    if (!file) {
        return;
    }


    const reader =
        new FileReader();


    reader.onload = () => {

        try {

            const parsed =
                JSON.parse(
                    reader.result
                );


            let importedBooks = null;


            if (
                Array.isArray(parsed)
            ) {

                importedBooks =
                    parsed;

            } else if (
                parsed &&
                Array.isArray(parsed.books)
            ) {

                importedBooks =
                    parsed.books;

            }


            if (!importedBooks) {

                throw new Error(
                    "Formato no válido"
                );

            }


            const validBooks =
                importedBooks
                    .filter(
                        book =>
                            book &&
                            typeof book === "object" &&
                            book.title &&
                            book.author
                    )
                    .map(book => ({

                        id:
                            book.id ||
                            Date.now().toString() +
                            Math.random()
                                .toString(36)
                                .substring(2, 8),

                        title:
                            String(book.title),

                        author:
                            String(book.author),

                        genre:
                            book.genre ||
                            "Otro",

                        status:
                            book.status ||
                            "to-read",

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
                            Boolean(book.favorite),

                        createdAt:
                            book.createdAt ||
                            Date.now(),

                        updatedAt:
                            Date.now()

                    }));


            if (validBooks.length === 0) {

                alert(
                    "No se encontraron libros válidos en el archivo."
                );

                return;

            }


            const confirmed =
                confirm(
                    `Se encontraron ${validBooks.length} libros. ¿Quieres reemplazar tu biblioteca actual por estos libros?`
                );


            if (!confirmed) {
                return;
            }


            books =
                validBooks;


            saveBooks();

            updateEverything();


            alert(
                "Biblioteca importada correctamente."
            );


        } catch (error) {

            console.error(
                "Error importando biblioteca:",
                error
            );


            alert(
                "No se pudo importar el archivo. Comprueba que sea un archivo JSON válido."
            );

        }

    };


    reader.readAsText(file);


    /*
       Permite volver a seleccionar
       el mismo archivo posteriormente.
    */

    event.target.value = "";

}


/* =========================================================
   ELIMINAR TODA LA BIBLIOTECA
   ========================================================= */

function clearLibrary() {

    if (books.length === 0) {

        alert(
            "Tu biblioteca ya está vacía."
        );

        return;

    }


    const confirmed =
        confirm(
            "¿Estás seguro de que quieres eliminar TODOS los libros? Esta acción no se puede deshacer."
        );


    if (!confirmed) {
        return;
    }


    const secondConfirmation =
        confirm(
            "Última confirmación: se eliminarán todos tus libros y sus datos."
        );


    if (!secondConfirmation) {
        return;
    }


    books = [];


    saveBooks();

    updateEverything();


    alert(
        "Todos los datos han sido eliminados."
    );

}


/* =========================================================
   SEGURIDAD HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function escapeAttribute(value) {

    return escapeHTML(value);

}


/* =========================================================
   PREVENIR ENVÍOS ACCIDENTALES
   ========================================================= */

document.addEventListener(
    "submit",
    event => {

        /*
           El formulario principal ya tiene
           su propio listener.

           Esto simplemente evita comportamientos
           extraños en caso de futuros formularios.
        */

        if (
            event.target !== bookForm &&
            event.target.tagName === "FORM"
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================================
   FIN
   ========================================================= */
```
