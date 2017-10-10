//
// This example imports a CSV file, filters out an entire column and exports a new CSV file.
//
// This example uses Data-Forge.
//

'use strict';

var dataForge = require('data-forge');

function transformData (inputDataFrame) {
    return inputDataFrame
        .parseFloats("transects_length")
        .groupBy(inputRow => inputRow.reef_name)
        .select(group => {
            return {
                reef_name: group.first().reef_name,
                transects_length: group.select(row => row.transects_length).sum(),
            };
        })
        .inflate();
}

dataForge.readFile('./data/surveys.csv')
    .parseCSV()
    .then(inputDataFrame => {
        var outputDataFrame = transformData(inputDataFrame);
        return outputDataFrame
            .asCSV()
            .writeFile('./output/surveys-aggregated.csv');
    })
    .then(() => {
        console.log('Done!');
    })
    .catch(err => {
        console.error('Error!');
        console.error(err && err.stack || err);
    });