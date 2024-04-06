function afficherModal() {
    const modalContainer = document.getElementById('modal_container');
    modalContainer.style.display = 'block';
}

function fermerModal() {
    const modalContainer = document.getElementById('modal_container');
    modalContainer.style.display = 'none';
}

function ajouterTache() {
    const titre = document.getElementById('titre_tache').value;
    const description = document.getElementById('cont_description').value;
    const dateDebut = document.getElementById('d_debut').value;
    const dateFin = document.getElementById('d_fin').value;
    const priorite = document.getElementById('priorite').value;

    // Créer un objet représentant la nouvelle tâche
    const nouvelleTache = {
        titre,
        description,
        dateDebut,
        dateFin,
        priorite
    };

    

    // Récupérer les tâches actuelles depuis le localStorage
    const taches = localStorage.getItem('taches') ? JSON.parse(localStorage.getItem('taches')) : [];

    // Ajouter la nouvelle tâche à la liste des tâches
    taches.push(nouvelleTache);

    // Sauvegarder les tâches mises à jour dans le localStorage
    sauvegarderTaches(taches);

    // Charger à nouveau les tâches pour mettre à jour l'affichage
    chargerTaches();

    // Réinitialiser les champs de saisie après l'ajout de la tâche
    document.getElementById('titre_tache').value = '';
    document.getElementById('cont_description').value = '';
    document.getElementById('d_debut').value = '';
    document.getElementById('d_fin').value = '';
    document.getElementById('priorite').value = '';

    // Fermer la fenêtre modale après l'ajout de la tâche
    fermerModal();
    const message = `La tâche "${titre}" a été ajoutée avec succès ! Courage pour l'exécution !!!`;
    const affi_message = document.getElementById('message');
    affi_message.innerText(message);
}



// Fonction pour sauvegarder les tâches dans le localStorage
function sauvegarderTaches(taches) {
    // Convertir les tâches en format JSON
    const tachesJSON = JSON.stringify(taches);

    // Stocker les tâches dans le localStorage avec la clé 'taches'
    localStorage.setItem('taches', tachesJSON);
}

// Fonction pour charger les tâches depuis le localStorage
function chargerTaches() {
    // Récupérer les tâches depuis le localStorage avec la clé 'taches'
    const tachesJSON = localStorage.getItem('taches');

    // Si des tâches sont stockées localement, les convertir en objet JavaScript
    if (tachesJSON) {
        const taches = JSON.parse(tachesJSON);

        // Afficher chaque tâche dans la liste des tâches
        const listTaches = document.querySelector('.list_taches');
        listTaches.innerHTML = ''; // Effacer le contenu actuel de la liste des tâches

        taches.forEach((tache) => {
            const nouvelleTache = creerElementTache(tache);
            listTaches.appendChild(nouvelleTache);
        });
    }
}

function creerElementTache(tache) {
    const nouvelleTache = document.createElement('div');
    nouvelleTache.classList.add('item');

    //couleur en fonction de la priorite
    if (tache.priorite === 'faible') {
        nouvelleTache.classList.add('priorite_faible');
    } else if (tache.priorite === 'moyen') {
        nouvelleTache.classList.add('priorite_moyenne');
    } else if (tache.priorite === 'eleve') {
        nouvelleTache.classList.add('priorite_elevee');
    }

    nouvelleTache.innerHTML = `
        <h3>${tache.titre}</h3>
        <p><strong>Description :</strong> ${tache.description}</p>
        <p><strong>Date début :</strong> ${tache.dateDebut}</p>
        <p><strong>Date fin :</strong> ${tache.dateFin}</p>
        <p><strong>Priorité :</strong> ${tache.priorite}</p>
        <button onclick="supprimerTache('${tache.titre}')" class="supprimer"><img src="img/supp.png" class="supp_img"></button>
        <button onclick="terminer()" id="terminer">Terminer</button>
        <button onclick="cours" id="cours">En cours</button>
    `;

    return nouvelleTache;
}
function terminer(){
    const terminer = document.getElementById('terminer');
    const cours = document.getElementById('cours');

    terminer.style.color = "green";
    cours.style.color = "white";
}
function cours(){
    const terminer = document.getElementById('terminer');
    const cours = document.getElementById('cours');

    cours.style.color = "green";
    terminer.style.color = "white";
}
// Ajouter la fonction supprimerTache(titre) pour gérer la suppression
function supprimerTache(titre) {
    // Récupérer les tâches actuelles depuis le localStorage
    const taches = localStorage.getItem('taches') ? JSON.parse(localStorage.getItem('taches')) : [];

    // Filtrer les tâches pour exclure celle avec le titre spécifié
    const nouvellesTaches = taches.filter(tache => tache.titre !== titre);

    // Mettre à jour le localStorage avec les nouvelles tâches
    sauvegarderTaches(nouvellesTaches);

    // Recharger les tâches pour mettre à jour l'affichage
    chargerTaches();
}


// Charger les tâches au chargement de la page
// Appeler chargerTaches() au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    chargerTaches();
});
