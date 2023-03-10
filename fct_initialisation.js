   //Initialisation du paquet de cartes 
"use strict";
const fs = require("fs");

const cartes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];
    
	function carte(cartes){
        const carte_index = 0;
		const carte = cartes[carte_index];
		cartes.splice(carte_index, 1);
		return carte;
    };  

    function couleur(c){
		return [
			"carreau", "coeur",
			"pique", "trefle"
		][Math.floor(c / 13)];
    };  
    
    function valeur(c){
        let v = [(c+1) % 13];
		if(v == 1){
			v = 11;
		}else if(v > 0 && v <= 10){
			return v;
		}else if(v === 0){
			return v = 10;
		}else{
			v = 10;
		}
		return v;
    };  

    
    function carteRandom(cartes){
        return Math.floor(Math.random() * cartes.length);
	};

	function carteInit(){
    let c = [];
	c = c.concat(cartes);
    c = c.concat(cartes);
    c = c.concat(cartes);
    c = c.concat(cartes);
    c = c.concat(cartes);
    c = c.concat(cartes);

    c.sort(()=> Math.random()-0.5);
	// NOTE Léa: pour test si le bug pour compter les points revient
    //c = [9, 4, 4, 8, 6];
	return c;	
	};

	function calculbanque(l){
		let total = 0;
		let c = 0;
		for(let i = 0; i < l.length; i++){
			total += Number(valeur(l[i]));
			console.log("total" + total);
			if(Number(valeur(l[i])) === 11){
				c += 1;
			}
		}
			while(total > 21 && c !== 0){
				total -= 10;
				c--;
				console.log("total 10 :" + total);
			}
		return total;
	};
	
	function liste_attente(l1,l2){
		let ls = [];
		for(let i = 0; i < l1.length; i++){
			ls.push(l2[l1[i]].pseudo);
		}
		return ls;
	};

	function indice_joueur(l,p){
		let indice;
		for(let i = 0; i < l.length; i++){
			if(l[i].pseudo === p){
				indice = i;
			}
		}
		return indice;
	};

	function coins_joueur(l,p){
		let coins;
		for(let i = 0; i < l.length; i++){
			if(l[i].pseudo === p){
				coins = l[i].coins;
			}
		}
		return coins;
	};

module.exports = {
	carte : carte,
	couleur : couleur,
	valeur : valeur,
	carteRandom : carteRandom,
	carteInit : carteInit,
	calculbanque : calculbanque,
	liste_attente : liste_attente,
	indice_joueur : indice_joueur,
	coins_joueur : coins_joueur
};

