export function DataProcessor(plotData){
    /***
     * 
     *  takes an array of object.
     *  From each object identify document Id
     *  If two terms share the same doc together they are linked
     * 
     */

    const heatmapData = [];
    // Iterate through each pair of plot objects
    for (let i = 0; i < plotData.length; i++) {
      const plotObj1 = plotData[i];

      for (let j = i + 1; j < plotData.length; j++) {
        const plotObj2 = plotData[j];

        // Check if both entities occur in the same document
        const commonDocs = plotObj1.docs.filter(docId => plotObj2.docs.includes(docId));

        if (commonDocs.length > 0) {
          // Both entities occur in the same document(s)
          /**
           * 
           * TODO: Add more details such as x_type and y_type
           * id of common docs
           * 
           * 
           */
          heatmapData.push({
            x: plotObj1.name,
            y: plotObj2.name,
            value: commonDocs.length,
            x_type: plotObj1.type,
            y_type: plotObj2.type,
            common_docs: commonDocs
          });
        }
      }
    }

return heatmapData


}