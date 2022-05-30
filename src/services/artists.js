const randomArtists = require('../data/randomArtists.json');
const csvManager = require('../utils/csvManager');
const axios = require('axios').default;
const logger = require('../utils/logger');

/**
 * Search Artist by name
 * Write result to csv file
 * Return random artists if search unsuccesful
 * @param {{}} query is the object of query parameters from the request
 */
function searchArtistByName(query){
    return new Promise((resolve) =>{
        axios
        .get(process.env.API_URL, 
            {params: 
                {
                    method: 'artist.search', 
                    artist: query.artist, 
                    api_key: process.env.API_KEY,
                    format: 'json'
                }
            })
        .then( async (res) => {
            const artistMatches = res.data.results.artistmatches.artist;
            if(artistMatches && artistMatches.length > 0){

                let writtenToFile = await csvManager.writeToCSV(query.file, artistMatches, csvManager.jsonToCsvArtists);
                if(writtenToFile.success){
                    resolve({type: 'search', artists: artistMatches, saved_to_csv: {success: true, filename: writtenToFile.filename}});
                } else {
                    resolve({type: 'search', artists: artistMatches, saved_to_csv: {success: false, error: writtenToFile.error}});
                }
                
            } else {
                resolve({type: 'random', artists: getRandomArtists()});
            }
        })
        .catch(err => {
            logger.log('error', 'searchArtistByName ' + err)
            resolve({type: 'random', artists: getRandomArtists()});
        })
    });

}

function getRandomArtists(){
    return randomArtists.artists;
}

module.exports = {searchArtistByName};