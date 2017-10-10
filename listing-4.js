//
// Example that imports a CSV file, fixes date/time values in each row and exporting a new CSV file.
// Date/times are fixed by encoding in UTC so that the correct timezone is preserved.
//
// This example uses Data-Forge.
//

'use strict';

var dataForge = require('data-forge');

function filterRow (inputRow) {
    return inputRow.country === 'Australia';
}

function transformData (inputDataFrame) {
    return inputDataFrame.where(filterRow);
}

dataForge.readFile('./data/surveys.csv')
    .parseCSV()
    .then(inputDataFrame => {
        var outputDataFrame = transformData(inputDataFrame);

        return outputDataFrame
            .asCSV()
            .writeFile('./output/surveys-but-only-Australia-using-data-forge.csv');
    })
    .then(() => {
        console.log('Done!');
    })
    .catch(err => {
        console.error('Error!');
        console.error(err && err.stack || err);
    });