// Fonction pour charger le contenu d'une page dynamiquement
function loadPage(page) {
    // Mettre à jour l'élément actif du menu
    document.querySelectorAll('.menu-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });

    // Mettre à jour l'URL
    history.pushState({ page }, "", page + ".html");

    // Si la page est 'recaps', charger le contenu de recaps.html
    if (page === "recaps") {
        fetch('recaps.html')
            .then(response => response.text())
            .then(html => {
                // Insérer le contenu HTML dans le main-content
                document.getElementById('main-content').innerHTML = html;

                // Initialiser les accordéons après avoir chargé le contenu
                initializeAccordions();
            })
            .catch(err => {
                console.warn('Erreur de chargement de recaps.html', err);
            });
    } else {
        // Si ce n'est pas 'recaps', afficher un contenu par défaut
        let pageContent = "";

        switch (page) {
            case "accueil":
                pageContent = `
                    <h1>Bienvenue sur le site</h1>
                    <p>Ceci est la page d'accueil. Utilisez le menu pour naviguer.</p>
                `;
                break;
            case "jeu":
                pageContent = `
                    <h1>Jeu</h1>
                    <p>Explorez notre section dédiée aux jeux !</p>
                `;
                break;
            case "ctf":
                pageContent = `
                    <h1>CTF</h1>
                    <p>Bienvenue dans la section CTF !</p>
                `;
                break;
            case "contacts":
                pageContent = `
                    <h1>Contacts</h1>
                    <p>Contactez-nous via ce formulaire.</p>
                `;
                break;
            default:
                pageContent = `
                    <h1>Page non trouvée</h1>
                    <p>Cette page n'existe pas.</p>
                `;
                break;
        }

        // Insérer le contenu par défaut dans le main-content
        document.getElementById('main-content').innerHTML = pageContent;

        // Initialiser les accordéons sur la nouvelle page
        initializeAccordions();
    }
}

// Fonction pour initialiser les accordéons
function initializeAccordions() {
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;

            // Ajouter ou retirer la classe "show"
            if (content.classList.contains('show')) {
                content.classList.remove('show');
            } else {
                content.classList.add('show');
            }
        });
    });
}

// Détecter la page initiale à partir de l'URL
function detectPageFromURL() {
    const path = window.location.pathname;
    const page = path.split("/").pop().replace(".html", "") || "accueil";
    return page;
}

// Gérer les clics sur les liens du menu
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault(); // Empêcher le rechargement de la page
        const page = link.dataset.page; // Récupérer la page correspondante
        loadPage(page); // Charger le contenu de la page
    });
});

// Gérer la navigation via les boutons "Précédent" et "Suivant" du navigateur
window.addEventListener('popstate', event => {
    const page = event.state?.page || detectPageFromURL(); // Récupérer la page depuis l'historique ou l'URL
    loadPage(page); // Charger la page correspondante
});

// Charger la page initiale
const initialPage = detectPageFromURL();
loadPage(initialPage);
