// Fonction pour charger le contenu d'une page
function loadPage(page) {
    let pageContent = "";

    // Définir le contenu en fonction de la page
    switch (page) {
        case "accueil":
            pageContent = `
                <h1>Bienvenue sur le site</h1>
                <p>Ceci est la page d'accueil. Utilisez le menu pour naviguer.</p>
            `;
            break;
        case "recaps":
            pageContent = `
                <h1>Recaps</h1>
                <p>Bienvenue dans la section Recaps !</p>
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

    // Insérer le contenu dans la zone principale
    document.getElementById('main-content').innerHTML = pageContent;

    // Mettre à jour l'URL et l'état du navigateur
    history.pushState({ page }, "", page + ".html");

    // Mettre à jour le menu pour indiquer la page active
    document.querySelectorAll('.menu-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
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
    const page = event.state?.page || 'accueil'; // Récupérer la page depuis l'historique
    loadPage(page); // Charger la page correspondante
});

// Charger la page initiale (accueil)
loadPage('accueil');
