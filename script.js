document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    const filterButton = document.getElementById('filter-button');
    const filterMenu = document.getElementById('filter-menu');

    if (filterButton && filterMenu) {
        filterButton.addEventListener('click', () => {
            // Aggiungi o rimuovi la classe 'show' al menu
            filterMenu.classList.toggle('show');
            // Modifica il testo del pulsante a seconda dello stato
            if (filterMenu.classList.contains('show')) {
                filterButton.textContent = 'CLOSE'; // O un'icona
            } else {
                filterButton.textContent = 'FILTER';
            }
        });
        
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                // Rimuove la classe 'show' quando si passa a una larghezza desktop
                filterMenu.classList.remove('show');
                // Reimposta il testo del pulsante
                filterButton.textContent = 'FILTER';
            }
        });
    }

    // Header scroll effect
    const siteHeader = document.querySelector('.site-header');

    const handleScroll = () => {
        // Aggiungi o rimuovi la classe 'scrolled' in base alla posizione di scroll
        if (window.scrollY > 50) { // Scegli un valore a tua preferenza (es. 50px)
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    };

    // Chiama la funzione di gestione dello scroll all'avvio e ad ogni evento di scroll
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Funzione per applicare il tema
    const applyTheme = (isDarkMode) => {
        if (isDarkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };

    // 1. Carica il tema salvato all'avvio
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        applyTheme(true);
    } else {
        applyTheme(false); // Assicurati che il tema chiaro sia applicato di default
    }

    // 2. Listener per il toggle del tema
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isCurrentlyDarkMode = body.classList.contains('dark-mode');
            applyTheme(!isCurrentlyDarkMode); // Applica il tema opposto

            // Salva la preferenza nel localStorage
            if (!isCurrentlyDarkMode) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light'); // O rimuovi l'elemento
            }
        });
    }

    // Funzione per impostare le colonne della griglia Masonry
    const setMasonryColumns = () => {
        const masonryGrid = document.querySelector('masonry-layout');
        if (!masonryGrid) return;

        // Se lo schermo è più piccolo di 600px, usa 3 colonne
        if (window.innerWidth < 600) {
            masonryGrid.setAttribute('cols', '3');
        } else {
            // Altrimenti, usa 5 colonne (valore di default)
            masonryGrid.setAttribute('cols', '5');
        }
    };

    // Chiama la funzione all'avvio e ogni volta che la finestra viene ridimensionata
    setMasonryColumns();
    window.addEventListener('resize', setMasonryColumns);


    // Inizializza LightGallery
    const masonryGrid = document.querySelector('.masonry');
    if (masonryGrid) {
        lightGallery(masonryGrid, {
            selector: 'a',
            plugins: [lgZoom, lgThumbnail],
            download: false,
        });
    }
});