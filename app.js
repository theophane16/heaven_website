// Gérer le chargement initial via l'URL (GitHub Pages)
window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") || "accueil"; // Par défaut, afficher "accueil"
    loadPage(page, false); // Ne pas pushState ici pour éviter la boucle infinie
};

// Gérer la navigation avec les boutons "Précédent" et "Suivant"
window.onpopstate = function (event) {
    if (event.state && event.state.page) {
        loadPage(event.state.page, false); // Ne pas modifier l'historique ici non plus
    } else {
        loadPage("accueil", false);
    }
};

// Fonction pour charger le contenu d'une page dynamiquement
function loadPage(page, updateHistory = true) {
    // Mettre à jour l'élément actif du menu
    document.querySelectorAll('.menu-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });

    // Mettre à jour l'URL SANS .html
    if (updateHistory) {
        history.pushState({ page }, "", "?page=" + page);
    }

    // Si la page est 'recaps', charger le contenu de recaps.html
    if (page === "recaps") {
        fetch('recaps.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('main-content').innerHTML = html;
                initializeAccordions();
            })
            .catch(err => console.warn('Erreur de chargement de recaps.html', err));
    } else {
        // Définir le contenu des autres pages
        let pageContent = "";

        switch (page) {
            case "accueil":
                pageContent = `
                    <h1>Bienvenue sur mon site</h1>
                    <p>Il contient pleins de petites choses pour que je m'en souvienne.</p>
                    <p>Pour avoir une vue d'ensemble des sections : </p>
                    <ul>
                        <li>La section <strong> Recaps </strong> contient des notions importantes que j'ai pu voir en cours notamment.</li>
                        <li>La section <strong> CTF </strong> sur mes expériences des Capture The Flag (en ligne ou événements) </li>
                        <li>La section <strong> Jeu </strong> est censée avoir un fichier d'un de mes jeux mais les aléas font que...</li>
                        <li>La section <strong> Contact </strong> contient mon mail, une redirection Lnikedin, mon CV en français et anglais.</li>
                    </ul>
                `;
                break;
            case "jeu":
                pageContent = `
                    <h1>Jeu</h1>
                    <p>Un jour ce sera mis à jour avec LE jeu de l'année...</p>
                    <p> Tout est une question de temps </p>
                    <p> Mais si vous vous ennuyez, allez jouer à Hollow Knight ou Outer Wilds, j'aurai bien rajouté Silksong mais bon...</p> 
                    <p> Une fois fait, on pourra débattre des musiques, notamment celle-ci : 
                    <a href="https://www.youtube.com/watch?v=Xpkc-NU1KA0" target="_blank" rel="noopener noreferrer">Une petite dose de nostalgie ?</a></p>
                `;
                break;
            case "ctf":
                pageContent = `
                    <h1>CTF</h1>
                    <p><strong>Plateformes en ligne de CTF.</strong></p>
                    <ul>
                        <li>TryHackMe</li>
                        <li>HackTheBox</li>
                        <li>RootMe</li>
                    </ul>
                    <p><strong>Conférences et CTF en présentiel :</strong></p>
                    <ul>
                        <li>GreHack 2024 <a href="https://grehack.fr/" target="_blank" rel="noopener noreferrer">(ici)</a></li>
                        <ul>
                            <li>Equipe : M2CSI+1</li>
                            <li>L'envolée de l'équipe à un moment M de la compétition :
                                <p><\p>
                                <img src="./score GreHack non final.png" alt="Pour se rappeler que dans la vie il y a des hauts" width="600" height="400">
                            </li>
                            <li>Score final : 1770</li>
                            <li>Place : 24/38</li>
                            <li>Conclusion : la plus grande qualité que l'on apprend en CTF est la résilience...</li>
                            <li>Défis performés : Stéganographie / Cryptologie / OSINT / SOC...</li>
                        </ul>
                    </ul>
                `;
                break;
            case "contacts":
                pageContent = `
                    <h1>Contacts</h1>
                    <p>Contactez-moi par mail : </p>
                    <a href="mailto:theophane.paradis@etu.univ-grenoble-alpes.fr">theophane.paradis@etu.univ-grenoble-alpes.fr</a>
                    <p>Ou via LinkedIn</p>
                    <a href="https://www.linkedin.com/in/theophane-paradis/" target="_blank" rel="noopener noreferrer">Mon profil LinkedIn</a>
                `;
                break;
            default:
                // Si la page n'est pas trouvée, afficher "accueil" par défaut
                pageContent = `
                    <h1>Bienvenue sur mon site</h1>
                    <h2><img src="./BULLE-Site-icon.png" alt="TPFLAG{Icon.png}"width="300" height="300"></h2>
                    <p>En complément du CV ou juste pour un trou de mémoire.</p>
                    <p>Si vous cherchez mon CV contactez moi via mon mail ou linkedIn<\p>
                `;
                break;
        }

        // Insérer le contenu dans le main-content
        document.getElementById('main-content').innerHTML = pageContent;

        // Initialiser les accordéons si nécessaire
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

