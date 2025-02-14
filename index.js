const fs = require('fs');
const http = require('http');
const url = require('url');

// Fonction pour lire le fichier
function readFileContent(filePath, callback) {
    try {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Erreur lors de la lecture du fichier:', '');
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    } catch (error) {
        console.error('Erreur inattendue lors de la lecture du fichier:', '');
        callback(error, null);
    }
}

// Fonction pour gérer les requêtes HTTP
function requestHandler(req, res) {
 try{   
    var q = url.parse(req.url,true);
   var fileName =  '.'+ q.pathname;

    readFileContent(fileName, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
 } catch (error) {
        console.error('Erreur inattendue lors du traitement de la requête:', '');
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Erreur interne du serveur</h1>');
    }
}

// Création du serveur HTTP
const server = http.createServer(requestHandler);

// Écoute sur le port 3000
server.listen(3000, () => {
    console.log('SERVER RUNNING on port 3000 for me');
});
 
