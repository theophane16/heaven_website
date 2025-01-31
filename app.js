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
                    <h1>Bienvenue sur mon site</h1>
                    <p>Il contient pleins de petites choses pour que je m'en souvienne.</p>
                `;
                break;
            case "jeu":
                pageContent = `
                    <h1>Jeu</h1>
                    <p>Un jour ce sera mis à jour avec LE jeu de l'année...</p>
                `;
                break;
            case "ctf":
                pageContent = `
                    <h1>CTF</h1>
                    <p>Discussion encore en cours.</p>
                    <p>TryHackMe</p>
                    <p>RootMe</p>
                    <p>HackTheBox</p>
                `;
                break;
            case "contacts":
                pageContent = `
                    <h1>Contacts</h1>
                    <p>un ptit mail ?</p>
                `;
                break;
            default:
                // Si la page n'est pas trouvée, afficher "accueil" par défaut
                pageContent = `
                    <h1>Bienvenue sur mon site</h1>
                    <p>Il contient pleins de petites choses pour que je m'en souvienne.</p>
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

function openPdfModal(event, pdfUrl) {
    event.preventDefault();  // Empêche le comportement par défaut du lien
    document.getElementById("pdfFrame").src = pdfUrl;
    document.getElementById("pdfModal").style.display = "block";
}

function closePdfModal() {
    document.getElementById("pdfModal").style.display = "none";
    document.getElementById("pdfFrame").src = ""; // Nettoyer l'iframe
}

// Fonction pour ouvrir/fermer le menu
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.getElementById('recaps-content');

    // Vérifier la taille de l'écran (mobile seulement)
    if (window.innerWidth < 768) {
        sidebar.classList.toggle('open');

        // Ajuster le margin du contenu principal
        if (sidebar.classList.contains('open')) {
            mainContent.style.marginLeft = '250px';
        } else {
            mainContent.style.marginLeft = '0';
        }
    }
}

// Vérifier au chargement si on est sur desktop pour afficher la sidebar
document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth >= 768) {
        document.querySelector('.sidebar').classList.add('open');
    }
});

