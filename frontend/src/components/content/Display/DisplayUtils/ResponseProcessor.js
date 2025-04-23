export default function processResponse(response) {
  // CHeck for invalid response
  if (!response) {
    console.log("Invalid response: ", response);
    return {};
  }

  // Destructure response Object
  const { duration, count, total_hits: totalHits } = response;
  let results = [];

  if (totalHits?.length > 0) {
    /** Here we are checking score for each document */
    const hasContextScore = totalHits.every(hit => hit.hasOwnProperty('context_score'));

    let hitsToProcess = totalHits;
    if (hasContextScore) {
      hitsToProcess = [...totalHits].sort((a, b) => b.context_score - a.context_score);
    }

    results = hitsToProcess.map(({ sentenceId, documentId, words, matches,match}) => {

      let matchPos;

      if (match) {
        matchPos = match
      }else if(matches){
        matchPos = matches
      }

      const startPositions = matchPos.map(({ start }) => start);
      const endPositions = matchPos.map(({ end }) => end);
      const text = words.join(' ');

      return {
        documentId,
        sentenceId,
        text,
        startPositions,
        endPositions,
      };
    });
  }

  console.log(count);

  return { totalHitsCount: count, results, paginationDocs: totalHits, durationCount: duration };
}
