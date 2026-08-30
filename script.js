```css
/* =========================================================
   MIS LIBROS
   CSS COMPLETO
   Mobile-ready / Capacitor-ready / GitHub Pages
   ========================================================= */


/* =========================================================
   GOOGLE FONTS
   ========================================================= */

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');


/* =========================================================
   RESET
   ========================================================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    width: 100%;
    min-height: 100%;
    scroll-behavior: smooth;
}

body {
    width: 100%;
    min-height: 100vh;

    font-family: "DM Sans", sans-serif;

    background: #f7f6f2;
    color: #20211f;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    overflow-x: hidden;
}


/* =========================================================
   VARIABLES
   ========================================================= */

:root {
    --background: #f7f6f2;
    --surface: #ffffff;

    --text: #20211f;
    --text-soft: #686963;
    --text-light: #96978f;

    --primary: #2f5d50;
    --primary-dark: #23483d;
    --primary-light: #e8efeb;

    --border: #e7e6e0;

    --danger: #b94a48;
    --danger-light: #f8eaea;

    --warning: #d49a32;

    --shadow-sm:
        0 2px 8px rgba(32, 33, 31, 0.05);

    --shadow:
        0 8px 30px rgba(32, 33, 31, 0.08);

    --shadow-lg:
        0 20px 60px rgba(32, 33, 31, 0.14);

    --radius-sm: 8px;
    --radius: 14px;
    --radius-lg: 20px;
}


/* =========================================================
   ELEMENTOS GENERALES
   ========================================================= */

button,
input,
textarea,
select {
    font: inherit;
}

button {
    border: 0;
    cursor: pointer;
}

button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
    outline: 3px solid rgba(47, 93, 80, 0.25);
    outline-offset: 2px;
}

a {
    color: inherit;
    text-decoration: none;
}

img {
    display: block;
    max-width: 100%;
}


/* =========================================================
   APP
   ========================================================= */

.app {
    width: 100%;
    min-height: 100vh;
}


/* =========================================================
   HEADER
   ========================================================= */

.header {
    width: 100%;
    background: var(--surface);
    border-bottom: 1px solid var(--border);

    position: sticky;
    top: 0;
    z-index: 100;

    padding-top: env(safe-area-inset-top);
}

.header-inner {
    width: 100%;
    max-width: 1200px;
    min-height: 76px;

    margin: 0 auto;
    padding: 16px 24px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}


/* =========================================================
   LOGO / TITULO
   ========================================================= */

.logo {
    display: flex;
    align-items: center;
    gap: 12px;

    min-width: 0;
}

.logo-icon {
    width: 42px;
    height: 42px;

    flex: 0 0 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 12px;

    background: var(--primary);
    color: #ffffff;

    font-size: 20px;
}

.logo-text {
    min-width: 0;
}

.logo-title {
    font-family: "Playfair Display", serif;
    font-size: 22px;
    line-height: 1.1;
    font-weight: 700;

    color: var(--text);

    white-space: nowrap;
}

.logo-subtitle {
    margin-top: 3px;

    font-size: 12px;
    line-height: 1.2;

    color: var(--text-soft);
}


/* =========================================================
   HEADER ACTIONS
   ========================================================= */

.header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}


/* =========================================================
   BUTTONS
   ========================================================= */

.btn {
    min-height: 42px;

    padding: 0 16px;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border-radius: 10px;

    font-size: 14px;
    font-weight: 600;

    transition:
        background 0.2s ease,
        color 0.2s ease,
        transform 0.15s ease,
        box-shadow 0.2s ease;
}

.btn:hover {
    transform: translateY(-1px);
}

.btn:active {
    transform: translateY(0);
}

.btn-primary {
    background: var(--primary);
    color: #ffffff;

    box-shadow: 0 4px 12px rgba(47, 93, 80, 0.18);
}

.btn-primary:hover {
    background: var(--primary-dark);
}

.btn-secondary {
    background: var(--primary-light);
    color: var(--primary);
}

.btn-secondary:hover {
    background: #dce8e2;
}

.btn-danger {
    background: var(--danger-light);
    color: var(--danger);
}

.btn-danger:hover {
    background: #f3dddd;
}

.btn-ghost {
    background: transparent;
    color: var(--text-soft);
}

.btn-ghost:hover {
    background: #f2f1ec;
    color: var(--text);
}


/* =========================================================
   MAIN
   ========================================================= */

.main {
    width: 100%;
    max-width: 1200px;

    margin: 0 auto;

    padding:
        32px
        24px
        calc(50px + env(safe-area-inset-bottom));
}


/* =========================================================
   PAGE INTRO
   ========================================================= */

.page-intro {
    margin-bottom: 28px;
}

.page-title {
    font-family: "Playfair Display", serif;

    font-size: clamp(30px, 5vw, 42px);
    line-height: 1.15;

    color: var(--text);
}

.page-description {
    max-width: 650px;

    margin-top: 8px;

    color: var(--text-soft);

    font-size: 15px;
    line-height: 1.6;
}


/* =========================================================
   TOOLBAR
   ========================================================= */

.toolbar {
    width: 100%;

    margin-bottom: 28px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 16px;
    flex-wrap: wrap;
}


/* =========================================================
   SEARCH
   ========================================================= */

.search {
    position: relative;

    flex: 1 1 280px;
    max-width: 460px;
}

.search input {
    width: 100%;
    height: 46px;

    padding: 0 16px 0 44px;

    border: 1px solid var(--border);
    border-radius: 12px;

    background: var(--surface);
    color: var(--text);

    font-size: 14px;

    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
}

.search input::placeholder {
    color: var(--text-light);
}

.search input:focus {
    border-color: var(--primary);

    box-shadow:
        0 0 0 3px rgba(47, 93, 80, 0.08);

    outline: none;
}

.search-icon {
    position: absolute;

    left: 15px;
    top: 50%;

    transform: translateY(-50%);

    color: var(--text-light);

    pointer-events: none;
}


/* =========================================================
   FILTERS
   ========================================================= */

.filters {
    display: flex;
    align-items: center;
    gap: 8px;

    flex-wrap: wrap;
}

.filter-btn {
    min-height: 40px;

    padding: 0 14px;

    border: 1px solid var(--border);
    border-radius: 10px;

    background: var(--surface);
    color: var(--text-soft);

    font-size: 13px;
    font-weight: 500;

    transition:
        background 0.2s ease,
        color 0.2s ease,
        border-color 0.2s ease;
}

.filter-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
}

.filter-btn.active {
    border-color: var(--primary);

    background: var(--primary);
    color: #ffffff;
}


/* =========================================================
   BOOK GRID
   ========================================================= */

.books-grid {
    width: 100%;

    display: grid;

    grid-template-columns:
        repeat(4, minmax(0, 1fr));

    gap: 20px;
}


/* =========================================================
   BOOK CARD
   ========================================================= */

.book-card {
    min-width: 0;

    background: var(--surface);

    border: 1px solid var(--border);
    border-radius: var(--radius);

    overflow: hidden;

    box-shadow: var(--shadow-sm);

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease;
}

.book-card:hover {
    transform: translateY(-3px);

    border-color: #dcdad2;

    box-shadow: var(--shadow);
}


/* =========================================================
   BOOK COVER
   ========================================================= */

.book-cover {
    width: 100%;

    aspect-ratio: 2 / 3;

    background: #ecebe6;

    overflow: hidden;

    position: relative;
}

.book-cover img {
    width: 100%;
    height: 100%;

    object-fit: cover;

    transition: transform 0.3s ease;
}

.book-card:hover .book-cover img {
    transform: scale(1.025);
}

.book-cover-placeholder {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px;

    background: var(--primary-light);
    color: var(--primary);

    text-align: center;

    font-family: "Playfair Display", serif;
    font-size: 18px;
}


/* =========================================================
   BOOK INFO
   ========================================================= */

.book-info {
    padding: 16px;
}

.book-title {
    color: var(--text);

    font-family: "Playfair Display", serif;

    font-size: 18px;
    line-height: 1.3;
    font-weight: 700;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;
}

.book-author {
    margin-top: 6px;

    color: var(--text-soft);

    font-size: 13px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


/* =========================================================
   RATING
   ========================================================= */

.rating {
    display: flex;
    align-items: center;

    gap: 2px;

    margin-top: 10px;
}

.star {
    color: #d9d8d1;

    font-size: 16px;

    line-height: 1;
}

.star.active {
    color: var(--warning);
}

.rating-number {
    margin-left: 5px;

    color: var(--text-light);

    font-size: 12px;
}


/* =========================================================
   STATUS
   ========================================================= */

.book-status {
    display: inline-flex;
    align-items: center;

    margin-top: 12px;

    padding: 5px 9px;

    border-radius: 7px;

    background: var(--primary-light);
    color: var(--primary);

    font-size: 11px;
    font-weight: 600;
}

.book-status.reading {
    background: #f3eee2;
    color: #9b7429;
}

.book-status.finished {
    background: #e7efe9;
    color: #37634f;
}

.book-status.wishlist {
    background: #eeeaf3;
    color: #6f5a85;
}


/* =========================================================
   CARD ACTIONS
   ========================================================= */

.book-actions {
    display: flex;
    align-items: center;

    gap: 8px;

    margin-top: 15px;
}

.book-action {
    flex: 1;

    min-height: 36px;

    padding: 0 8px;

    border: 1px solid var(--border);
    border-radius: 8px;

    background: transparent;
    color: var(--text-soft);

    font-size: 12px;
    font-weight: 600;

    transition:
        background 0.2s ease,
        color 0.2s ease,
        border-color 0.2s ease;
}

.book-action:hover {
    border-color: var(--primary);
    color: var(--primary);
    background: var(--primary-light);
}

.book-action.delete:hover {
    border-color: var(--danger);
    color: var(--danger);
    background: var(--danger-light);
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

.empty-state {
    width: 100%;

    padding: 70px 25px;

    text-align: center;

    border: 1px dashed var(--border);
    border-radius: var(--radius-lg);

    background: rgba(255, 255, 255, 0.55);
}

.empty-icon {
    width: 64px;
    height: 64px;

    margin: 0 auto 18px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 18px;

    background: var(--primary-light);
    color: var(--primary);

    font-size: 26px;
}

.empty-state h2 {
    font-family: "Playfair Display", serif;

    font-size: 24px;

    color: var(--text);
}

.empty-state p {
    max-width: 440px;

    margin: 8px auto 20px;

    color: var(--text-soft);

    font-size: 14px;
    line-height: 1.6;
}


/* =========================================================
   MODAL
   ========================================================= */

.modal {
    position: fixed;

    inset: 0;

    z-index: 1000;

    display: none;

    align-items: center;
    justify-content: center;

    padding:
        20px
        20px
        calc(20px + env(safe-area-inset-bottom));

    background: rgba(24, 27, 25, 0.55);

    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}

.modal.active,
.modal.show {
    display: flex;
}


/* =========================================================
   MODAL CONTENT
   ========================================================= */

.modal-content {
    width: 100%;
    max-width: 560px;
    max-height: calc(100vh - 40px);

    overflow-y: auto;

    background: var(--surface);

    border-radius: var(--radius-lg);

    box-shadow: var(--shadow-lg);

    animation: modalIn 0.2s ease-out;
}

@keyframes modalIn {
    from {
        opacity: 0;
        transform: translateY(12px) scale(0.98);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}


/* =========================================================
   MODAL HEADER
   ========================================================= */

.modal-header {
    padding: 22px 24px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 15px;

    border-bottom: 1px solid var(--border);
}

.modal-title {
    font-family: "Playfair Display", serif;

    font-size: 24px;

    color: var(--text);
}

.modal-close {
    width: 38px;
    height: 38px;

    flex: 0 0 38px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 9px;

    background: transparent;
    color: var(--text-soft);

    font-size: 22px;

    transition:
        background 0.2s ease,
        color 0.2s ease;
}

.modal-close:hover {
    background: #f1f0eb;
    color: var(--text);
}


/* =========================================================
   MODAL BODY
   ========================================================= */

.modal-body {
    padding: 24px;
}


/* =========================================================
   FORM
   ========================================================= */

.form-group {
    margin-bottom: 18px;
}

.form-group:last-child {
    margin-bottom: 0;
}

.form-label {
    display: block;

    margin-bottom: 7px;

    color: var(--text);

    font-size: 13px;
    font-weight: 600;
}

.form-control {
    width: 100%;

    min-height: 44px;

    padding: 10px 13px;

    border: 1px solid var(--border);
    border-radius: 10px;

    background: #ffffff;
    color: var(--text);

    font-size: 14px;

    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
}

.form-control::placeholder {
    color: var(--text-light);
}

.form-control:focus {
    border-color: var(--primary);

    box-shadow:
        0 0 0 3px rgba(47, 93, 80, 0.08);

    outline: none;
}

textarea.form-control {
    min-height: 110px;

    resize: vertical;
}

select.form-control {
    cursor: pointer;
}


/* =========================================================
   FORM ROW
   ========================================================= */

.form-row {
    display: grid;

    grid-template-columns:
        repeat(2, minmax(0, 1fr));

    gap: 14px;
}


/* =========================================================
   RATING SELECTOR
   ========================================================= */

.rating-selector {
    display: flex;
    align-items: center;

    gap: 5px;
}

.rating-selector button {
    width: 36px;
    height: 36px;

    background: transparent;

    color: #d8d7d0;

    font-size: 24px;
    line-height: 1;

    transition:
        color 0.15s ease,
        transform 0.15s ease;
}

.rating-selector button:hover {
    transform: scale(1.08);
}

.rating-selector button.active {
    color: var(--warning);
}


/* =========================================================
   MODAL FOOTER
   ========================================================= */

.modal-footer {
    padding: 18px 24px;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    gap: 10px;

    border-top: 1px solid var(--border);
}


/* =========================================================
   DELETE CONFIRMATION
   ========================================================= */

.confirm-modal {
    max-width: 420px;
}

.confirm-content {
    padding: 30px 24px;

    text-align: center;
}

.confirm-icon {
    width: 56px;
    height: 56px;

    margin: 0 auto 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 16px;

    background: var(--danger-light);
    color: var(--danger);

    font-size: 24px;
}

.confirm-content h2 {
    font-family: "Playfair Display", serif;

    font-size: 24px;

    color: var(--text);
}

.confirm-content p {
    margin-top: 8px;

    color: var(--text-soft);

    font-size: 14px;
    line-height: 1.5;
}


/* =========================================================
   TOAST / NOTIFICACIONES
   ========================================================= */

.toast {
    position: fixed;

    left: 50%;
    bottom: 24px;

    z-index: 2000;

    transform:
        translateX(-50%)
        translateY(20px);

    opacity: 0;
    visibility: hidden;

    min-width: 260px;
    max-width: calc(100vw - 40px);

    padding: 13px 18px;

    border-radius: 10px;

    background: #20211f;
    color: #ffffff;

    box-shadow: var(--shadow);

    text-align: center;

    font-size: 13px;
    font-weight: 500;

    transition:
        opacity 0.2s ease,
        transform 0.2s ease,
        visibility 0.2s ease;
}

.toast.show,
.toast.active {
    opacity: 1;
    visibility: visible;

    transform:
        translateX(-50%)
        translateY(0);
}


/* =========================================================
   SCROLLBAR
   ========================================================= */

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #d1d0c9;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #b8b7af;
}


/* =========================================================
   RESPONSIVE — TABLET
   ========================================================= */

@media (max-width: 1000px) {

    .books-grid {
        grid-template-columns:
            repeat(3, minmax(0, 1fr));
    }

}


/* =========================================================
   RESPONSIVE — TABLET PEQUEÑA
   ========================================================= */

@media (max-width: 760px) {

    .header-inner {
        min-height: 68px;

        padding-left: 18px;
        padding-right: 18px;
    }

    .logo-title {
        font-size: 20px;
    }

    .logo-subtitle {
        display: none;
    }

    .main {
        padding:
            26px
            18px
            calc(40px + env(safe-area-inset-bottom));
    }

    .books-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));

        gap: 15px;
    }

    .toolbar {
        align-items: stretch;
        flex-direction: column;
    }

    .search {
        max-width: none;
        width: 100%;
    }

    .filters {
        width: 100%;
    }

    .filter-btn {
        flex: 1;
    }

}


/* =========================================================
   RESPONSIVE — MÓVIL
   ========================================================= */

@media (max-width: 520px) {

    .header-inner {
        padding:
            12px
            14px;
    }

    .logo {
        gap: 9px;
    }

    .logo-icon {
        width: 38px;
        height: 38px;

        flex-basis: 38px;

        border-radius: 10px;

        font-size: 18px;
    }

    .logo-title {
        font-size: 18px;
    }

    .header-actions .btn {
        min-height: 38px;

        padding:
            0 11px;

        font-size: 12px;
    }

    .main {
        padding:
            22px
            14px
            calc(30px + env(safe-area-inset-bottom));
    }

    .page-intro {
        margin-bottom: 20px;
    }

    .page-title {
        font-size: 30px;
    }

    .page-description {
        font-size: 13px;
    }

    .books-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));

        gap: 11px;
    }

    .book-info {
        padding: 11px;
    }

    .book-title {
        font-size: 15px;
    }

    .book-author {
        font-size: 11px;
    }

    .rating {
        margin-top: 7px;
    }

    .star {
        font-size: 14px;
    }

    .book-status {
        margin-top: 9px;

        padding: 4px 7px;

        font-size: 10px;
    }

    .book-actions {
        margin-top: 10px;

        gap: 5px;
    }

    .book-action {
        min-height: 32px;

        padding: 0 4px;

        font-size: 10px;
    }

    .empty-state {
        padding:
            50px
            18px;
    }

    .empty-state h2 {
        font-size: 21px;
    }

    .modal {
        align-items: flex-end;

        padding:
            0
            0
            env(safe-area-inset-bottom);
    }

    .modal-content {
        max-height: 92vh;

        border-radius:
            20px
            20px
            0
            0;
    }

    .modal-header {
        padding:
            18px;
    }

    .modal-body {
        padding:
            18px;
    }

    .modal-footer {
        padding:
            15px 18px;

        padding-bottom:
            calc(15px + env(safe-area-inset-bottom));
    }

    .form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }

}


/* =========================================================
   RESPONSIVE — MÓVIL MUY PEQUEÑO
   ========================================================= */

@media (max-width: 380px) {

    .books-grid {
        grid-template-columns: 1fr;
    }

    .book-cover {
        aspect-ratio: 16 / 10;
    }

    .header-actions .btn {
        padding:
            0 9px;
    }

    .page-title {
        font-size: 27px;
    }

}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
        scroll-behavior: auto !important;

        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;

        transition-duration: 0.01ms !important;
    }

}
```
