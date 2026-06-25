// Gérer le chargement initial via l'URL (GitHub Pages)
window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") || "accueil";               // Par défaut, afficher "accueil"
    loadPage(page, false);                                      // Ne pas pushState ici pour éviter la boucle infinie
};

// Gérer la navigation avec les boutons "Précédent" et "Suivant" ; ne plus avoir de pages mal chargées
window.onpopstate = function (event) {
    if (event.state && event.state.page) {
        loadPage(event.state.page, false);                      // Ne pas modifier l'historique ici non plus
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
        // Le contenu des autres pages
        let pageContent = "";

        switch (page) {
            case "accueil":
                pageContent = `
                    <h1>Mon site pense-bête</h1>
                    <p>Pour stocker des connaissances et des futurs projets.</p> 
                    <p>Pourquoi faire ? ↓</p> <img src="./img/vegapunk.webp" weight=125 height=420>
                    <p>Et non ce n'est pas moi, je n'ai pas eu droit à une capacité de stockage aussi grande...
                    <p>Vue d'ensemble des sections : </p>
                    <ul>
                        <li>La section <strong> Recaps </strong> contient des notions importantes (des cours, des livres et autres).</li>
                        <li>La section <strong> Stage </strong> pour détailler un peu plus mes stages en donnant plus de contexte et de conclusions.</li>
                        <li>La section <strong> CTF </strong> sur mes expériences des Capture The Flag (en ligne ou événements). </li>
                        <li>La section <strong> Jeu </strong> : un piège.</li>
                        <li>La section <strong> Contact </strong>... besoin d'explications ?</li>
                    </ul>
                `;
                break;
            case "jeu":
                pageContent = `
                    <p>Juste un petit cadeau : </p>
                    <a href="https://www.youtube.com/watch?v=Xpkc-NU1KA0" target="_blank" rel="noopener noreferrer">Lien légitime ? Malveillant ?</a></p>
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
                        <li>Hackropole</li>
                    </ul>
                    <p><strong>Conférences et CTF en présentiel :</strong></p>
                    <ul>
                        <li>GreHack 2024 <a href="https://grehack.fr/" target="_blank" rel="noopener noreferrer">(ici)</a></li>
                        <ul>
                            <li>Equipe : M2CSI+1</li>
                            <li>L'envolée de l'équipe à un moment M de la compétition :
                                <p><\p>
                                <img src="./img/score GreHack non final.png" alt="Pour se rappeler que dans la vie il y a des hauts" width="600" height="400">
                            </li>
                            <li>Score final : 1770</li>
                            <li>Place : 24/38</li>
                            <li>Conclusion : la plus grande qualité que l'on apprend en CTF est la résilience...</li>
                            <li>Défis performés : Stéganographie / Cryptologie / OSINT / SOC...</li>
                        </ul>
                    </ul>
                `;
                break;
            case "stage":
                pageContent = `
                    <h1>Stages</h1>
                    <p><strong>Stage de M2 Cybersecurity / Stage de fin d'études : X-ray attacks on microcontroller.</strong></p>
                    <ul>
                        <li><u>Durée</u> : 6 mois pour l'année académique 2024/2025.</li>
                        <li><u>Lieu</u> : Laboratoire TIMA (Techniques de l'Informatique et de la Microélectronique pour l'Architecture des systèmes intégrés), Grenoble, France.</li>
                        <li><u>Équipe</u> : Équipe Amfors (Architectures and Methods for Resilient Systems).</li>
                        <li><u>Projet</u> : projet MITIX (Modification non Invasive de circuiTs Intégrés par rayons X).</li>
                        <li><u>Superviseurs</u> : 
                            <ul>
                                <li>Paolo Maistri <a href="mailto:paolo.maistri@univ-grenoble-alpes.fr">paolo.maistri@univ-grenoble-alpes.fr</a> - Amfors team leader</li>
                                <li>Laurent Maingault - CEA Leti</li>
                                <li>Luc Salvo - SIMaP</li>
                            </ul>
                        </li>
                        <li><u>But</u> : Protéger l'algorithme de chiffrement AES des attaques par rayons X en sélectionnant et en implémentant des algorithmes de détection de fautes. <br> Pour les expérimentations nous avons faits des campagnes d'attaques au laboratoires SIMaP pour vérifier l'efficacité de nos algorithmes en situation réelle (avec une source de rayons X de laboratoire, un tomographe).</li>
                        <li><u>Cheminement de la pensée</u> : Je devais implémenter des contre-mesures contre les attaques par rayons X. Étant donc dans un modèle de fautes persistantes, la première cibles de ce type d'attaque est AES (via la SBOX). Nous avons donc attaquer une mémoire flash remplie de SBOXS avec des rayons X pour évaluer notre capacité à détecter des fautes via des algorithmes de détection. J'ai aussi testé un algorithme de détection de fautes pour une implémentation plus spécifique d'AES : AES-TBOXS (utilisée pour accélerer le chiffrement par exemple).</li>
                        <li><u>Campagnes d'attaques</u> : J'en ai fait 2 en compagnie de Luc Salvo à SIMaP. <br> La première n'a pas été concluante car nous n'avions au final pas la bonne die image (image sur laquelle nous nous basons pour attaquer un microcontrôleur / c'est une cartographie des composants d'un microcontrôleur). <br>Pour la seconde nous avons pris une nouvelle die image adaptée puis attaqué avec un masque de tungsten laissant passer plus de rayons X (trou de 100µm) pour avoir plus de chances d'induire des fautes dans la mémoire non volatile du DUT. <br>Nous avons eu des résultats très positif pour un algorithme et nous n'avons pas pu en récupérer pour les autres malgré nos essais (manque de cibles).</li>
                        <li><u>Conclusion</u> : Nous avons un algorithme de détection de fautes efficace contre les attaques par rayons X et nous avons démontré son efficience avec des tests en conditions réelles.</li>
                        <li><u>Mémoire</u> : À la fin de ce stage j'ai écrit un mémoire avec beaucoup plus de détails sur les attaques par rayons X, les algorithmes de détection (dont leur sélection), les campagnes d'attaques... Si vous souhaitez le lire n'hésitez pas à me contacter !</li>    
                    </ul>

                    <p><strong>Stage de M1 MoSIG : Comparing Intel processor families from carbon footprint point of view.</strong></p>
                    <ul>
                        <li><u>Durée</u> : 2 mois pour l'année académique 2023/2024.</li>
                        <li><u>Lieu</u> : Batiment IMAG, Saint-Martin-d'Hères, France.</li>
                        <li><u>Équipe</u> : Équipe ERODS (Efficient and Robust Distributed Systems) dans le LIG (Laboratoire d'Informatique de Grenoble).</li>
                        <li><u>Superviseur</u> : Thomas Ropars - ERODS team </li>
                        <li><u>But</u> : Faire baisser l'empreinte carbone d'un data center (mais en se concentrant sur la sélection des processeurs). <br>Comparer l'empreinte carbone des processeurs selon leur technologie ou leur architecture.</li>
                        <li><u>Cheminement de la pensée</u> : les CPUs sont le premier facteur d'empreinte carbone dans les data centers et deviennent donc le premier levier pour la réduire. Pour ce faire j'ai cherché à savoir si il vaut acheter un vieux processeur moins performant ou en acheter un nouveau (l'empreinte carbone n'étant pas que sur l'usage du CPU mais venant aussi de sa fabrication). <br>Pour avoir des réponses, j'ai fait tourner des algorithmes concurrents sur des processeurs avec différentes technologies (via Grid5000) et j'ai récupéré les données de consommation. En parallèle j'ai estimé leur empreinte carbone pour leur construction. </li>
                        <li><u>Conclusion</u> : En comparant les empreintes carbones des processeurs selon leur technologie, nous en sommes venu à la conclusion qu'il valait mieux acheter un nouveau processeur (il allait réduire son coût de fabrication grâce sa meilleure efficacité à l'usage). <br>En comparant la pollution des CPUs via leur architectures, nous en avons conclu qu'elle a un impact sur la pollution aussi.</li>
                    </ul>
                `;
                break;
            case "contacts":
                pageContent = `
                    <h1>Contacts</h1>
                    <p>Contactez-moi par mail : </p>
                    <a href="mailto:theophane.paradis.contact@gmail.com">theophane.paradis.contact@gmail.com</a>
                    <p>Ou via LinkedIn</p>
                    <a href="https://www.linkedin.com/in/theophane-paradis/" target="_blank" rel="noopener noreferrer">Mon profil LinkedIn</a>
                `;
                break;
            default:
                // Si la page n'est pas trouvée, afficher "accueil" par défaut
                pageContent = `
                    <h1>Mon site pense-bête</h1>
                    <p>Pour stocker des connaissances et des futurs projets.</p> 
                    <p>Pourquoi faire ? ↓</p> <img src="./img/vegapunk.webp" weight=125 height=420>
                    <p>Et non ce n'est pas moi, je n'ai pas eu droit à une capacité de stockage aussi grande...
                    <p>Vue d'ensemble des sections : </p>
                    <ul>
                        <li>La section <strong> Recaps </strong> contient des notions importantes (des cours, des outils utiles et autres).</li>
                        <li>La section <strong> Stages </strong> reviens plus en détails sur les stages que j'ai eu l'occasion de faire. </li>
                        <li>La section <strong> CTF </strong> sur mes expériences des Capture The Flag (en ligne ou événements). </li>
                        <li>La section <strong> Jeu </strong>... mystère...</li>
                        <li>La section <strong> Contact </strong>... ai-je vraiment besoin d'aller plus loin ?</li>
                    </ul>
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
        event.preventDefault();                     // Empêcher le rechargement de la page
        const page = link.dataset.page;             // Récupérer la page correspondante
        loadPage(page);                             // Charger le contenu de la page
    });
});

// Gérer la navigation via les boutons "Précédent" et "Suivant" du navigateur
window.addEventListener('popstate', event => {
    const page = event.state?.page || detectPageFromURL();  // Récupérer la page depuis l'historique ou l'URL
    loadPage(page);                                         // Charger la page correspondante
});

// Charger la page initiale
const initialPage = detectPageFromURL();
loadPage(initialPage);

// Fonction pour ouvrir/fermer le menu
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.getElementById('recaps-content');

    // Vérifier la taille de l'écran (mobile seulement mais marche sur ordi aussi)
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

