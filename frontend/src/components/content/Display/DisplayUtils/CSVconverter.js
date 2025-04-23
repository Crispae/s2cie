/**
 * Convert data into CSV file
 * 
 */

export const CSVconverter = (data,filename) => {

    const CSVData = array2CSV(data);
    download(CSVData,filename)

}

const array2CSV = (data) =>{

       /** Defining constant */
       const header = ["sentenceId", "documentId", "text"]
   
       /**
        * Converting data into CSV
        * 
        */
   
       const csvRows = []
       csvRows.push(header.join(",")) /** First row contains headers */
   
       /**
        * Iterating over the data
        */
   
       for (const row of data) {
           const rowValues = header.map(header => {
               const escaped = ('' + row[header]).replace(/"/g, '\\"'); // To replace unwanted quotes.
               return `"${escaped}"`; // To escape the comma in an address-like string.
           });
           csvRows.push(rowValues.join(',')); // Push into array as comma-separated values.
       }
   
       return csvRows.join('\n');
}

const download = (data,filename) =>{

    const blob = new Blob([data], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename + '.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    

};


