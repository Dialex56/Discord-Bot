const Discord = require ('discord.js');
const fs = require ('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();

//Dossier Events
fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
    console.log(`${f.length} events chargés`);

    f.forEach((f) => {
        let events = require(`./Events/${f}`);
        let event = f.split('.')[0];
        client.on(event, events.bind(null, client));
    });
});

//Dossier Commandes
fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

//Token
client.login('NzAxMDY5ODM3NjAyMTI3OTgy.XpsINA.aQkDzG5y3Tto2KMZ_GJfmC3bH_k');