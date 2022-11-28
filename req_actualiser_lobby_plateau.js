"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");
const url = require("url");
const fct = require("./fct_initialisation.js");
const actualiser_lobby_plateau = function (req, res, query) {
	let contenu;
	let lobby;
	let membres;
	let tables;
	let choix;
	let pseudo;
	let mise;
	let joueur;
	let joueur_mise;
	let marqueurs;
	let page;
	let carte1;
	let carte2;
	let requete;
	let pathname;

	requete = url.parse(req.url, true);
    pathname = requete.pathname;
    query = requete.query;
	
	//Récupération du contexte
	
	contenu = fs.readFileSync("lobbys.json", "UTF-8");
    lobby = JSON.parse(contenu);
	
	contenu = fs.readFileSync("membres.json", "UTF-8");
    membres = JSON.parse(contenu);
	
	contenu = fs.readFileSync("tables.json", "UTF-8");
    tables = JSON.parse(contenu);
	
	choix = query.choix;
	pseudo = query.pseudo;

	//Vérifie que les joueurs sont là et récupère leur mise, si ts les joueurs du tab sont là on les envoit vers le plateau

	//joueur = tables[choix].joueurs;
	//joueur_mise = tables[choix].mises;
	joueur = tables[choix].joueurs.filter(el1 => el1 === null);
	joueur_mise = tables[choix].mises.filter(el2 => el2 === null);
	
	//rajouter mise dans json
	if(joueur.length === joueur_mise.length){
		page = fs.readFileSync("modele_plateau.html", "utf-8");
	}else{
		page = fs.readFileSync("modele_lobby_plateau.html", "utf-8");
	}

	//Initialisation des cartes
    
    if(tables[choix].cartes.length === 0){ 
    let paquet = fct.carteInit()
    tables[choix].cartes = paquet;
    }   
    
	//Distribution des cartes 

	let c1 = fct.carte();
	let c2 = fct.carte();

	//on ne peut plus rejoindre la table car etat = false

	tables[choix].etat = false;

	//on enregistre
	
	contenu = fs.readFileSync("tables.json", "UTF-8");
	tables = JSON.parse(contenu);

	marqueurs = {};
	marqueurs.pseudo = pseudo;
	marqueurs.choix = choix;
	marqueurs.mise = mise;
	marqueurs.carte1 = c1;
	marqueurs.carte2 = c2;
	page = nunjucks.renderString(page, marqueurs);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
};

module.exports = actualiser_lobby_plateau;

