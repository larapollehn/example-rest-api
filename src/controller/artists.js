const artistsServices = require('../services/artists');
const logger = require('../utils/logger');

function get(request, responds){
    if(request.query.artist && request.query.file){
        artistsServices.searchArtistByName(request.query)
        .then((result) => {
            responds.status(200).send({success: true, data: result});
        })
        .catch((err) => {
            logger.log('error', err);
            responds.status(500)
        })
    } else {
        responds.status(400).send({success: false, error: 'Missing query parameters: "name" and "file" are required.'});
    }
}

module.exports = {get};