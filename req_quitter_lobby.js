"use strict";

const fs = require("fs");
const nj = require("nunjucks");;
const url = require('url');
const fct = require("./fct_initialisation.js");

const req_quitter_lobby = function (req, res, query) {
	let requete;
	let pathname;
    let marqueurs;
	let page;
    let joueur;
	let lobby;
	let pseudo;
	let choix;

	//Récupération des crédits associés au compte

	let coins;
	let members;
	
	pseudo = query.pseudo;
	
	members = fs.readFileSync("membres.json", "UTF-8");
	members = JSON.parse(members);
	
	coins = fct.coins_joueur(members,pseudo);

	requete = url.parse(req.url, true);
    pathname = requete.pathname;
    query = requete.query;

	//Lecture du fichier json 
	
	lobby = fs.readFileSync("lobbys.json", "UTF-8");
    lobby = JSON.parse(lobby);

	//récupération du pseudo depuis url et trouve l'indice du joueur dans le tableau joueur
	
	choix = query.choix;
	joueur = lobby[choix].joueurs.indexOf(pseudo);
	
	//supprétion du joueur ayant quitter le lobby
	
	lobby[choix].joueurs.splice(joueur, 1);

	lobby = JSON.stringify(lobby);
	lobby = fs.writeFileSync("lobbys.json", lobby, 'utf-8');
	
	page = fs.readFileSync(`modele_accueil_membre.html`, "UTF-8");
	
	marqueurs = {};
	marqueurs.pseudo = pseudo;
	marqueurs.choix = choix;
	marqueurs.credits = coins;
	
	page = nj.renderString(page,marqueurs);
    
	res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
};

module.exports = req_quitter_lobby;

