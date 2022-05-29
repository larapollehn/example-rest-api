const fs = require('fs');
const logger = require('./logger');

/**
 * Write data to csv file 
 * @param {string} fileName  
 * @param {[{}]} data 
 * @param {function formattingFunc(data) {}} formattingFunc
 * @returns {{success: boolean, error?: string, filename?: string}}
 */
async function writeToCSV(fileName, data, formattingFunc){
    try{
        const csvData = formattingFunc(data);
        if(csvData){
            const saveFileName = sanitizeFilename(fileName, 'csv');
            await fs.promises.writeFile(process.env.RESULTS_PATH + saveFileName, csvData, 'utf8');
            return {success: true, filename: saveFileName};
        } else {
            logger.log('error', 'writeToCSV: ' + 'CSV Data not compatible.');
            return {success: false, error: 'CSV Data could not be formatted.'};
        }
        
    }catch (err){
        logger.log('error', 'writeToCSV: ' + err); 
        return {success: false, error: err};
    }
}

/**
 * Convert json formatted data to valid cvs string
 * @param {[{}]} json 
 * @returns {String|false}  
 */
function jsonToCsvArtists(json){
    const columnHeaders = ['name', 'mbid', 'url', 'image_small', 'image'];

    if(json.length > 0) {
        const rows = [];

        for(let i = 0; i < json.length; i++){

            const row = [];
            for (let j = 0; j < columnHeaders.length; j++){

                if(columnHeaders[j] === 'image'){
                    row.push(extractImageUrl(json[i]['image'], 'large'));

                } else if(columnHeaders[j] === 'image_small'){
                    row.push(extractImageUrl(json[i]['image'], 'small'));

                } else {
                    //escape to keep special characters used by csv to separate entries, like comma or semicolon
                    row.push(`"${json[i][columnHeaders[j]]}"`);
                }
            }
            rows.push(row);
        }

        return [columnHeaders, ...rows].join('\n'); // each entry is on its own row; 
    } else {
        logger.log('error', 'Could not format json to csv');
        return false;
    }

}

/**
 * Extract the url of an image
 * @param {[{'#text':string,size:string}]} imageObjs 
 * @param {string} size 
 * @returns 
 */
function extractImageUrl(imageObjs, size){
    const image = imageObjs.find(img => img.size === size);
    if(image && image['#text']){
        return image['#text'];
    }
    return '';
}

/**
 * Weak sanitazing of user supplied filename
 * @param {String} filename 
 * @param {String} fileExtension desired extension 
 */
function sanitizeFilename(filename, fileExtension){
    const nameParts = filename.split('.');

    let extension = nameParts.length >= 2 ? nameParts.pop() : fileExtension;
    let base = nameParts.join('_');

    if(extension !== fileExtension){
        extension = fileExtension;
    }

    return base.replace(/[^a-zA-Z0-9]/g, '_') + '.' + extension;

}

module.exports = {writeToCSV, jsonToCsvArtists};