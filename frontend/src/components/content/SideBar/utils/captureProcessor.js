

/**
     * Process matches for API version V0.6.0
     */
function processV060Match(matchEl, sentence, docId, sentenceId,capt) {
    matchEl.namedCaptures.forEach((cap) => {
      const name = cap.name;
      const end = cap.capturedMatch.end;
      const start = cap.capturedMatch.start;
      const token = sentence.slice(start, end)[0]; // Slice first element

      const capturedTerm = {
        token: token,
        start: start,
        end: end,
        docId: docId,
        sentenceId: sentenceId
      };

      if (!capt[name]) {
        capt[name] = {};
      }

      if (!capt[name][token]) {
        capt[name][token] = [];
      }

      capt[name][token].push(capturedTerm);
    });
  }


  /**
     * Process matches for API version V0.5.0
     */
  function processV050Match(matchEl, sentence, docId, sentenceId,capt) {
    matchEl.captures.forEach((capture) => {
      const name = Object.keys(capture)[0];
      const end = capture[name].span.end;
      const start = capture[name].span.start;
      const token = sentence.slice(start, end)[0]; // Slice first element

      const capturedTerm = {
        token: token,
        start: start,
        end: end,
        docId: docId,
        sentenceId: sentenceId
      };

      if (!capt[name]) {
        capt[name] = {};
      }

      if (!capt[name][token]) {
        capt[name][token] = [];
      }

      capt[name][token].push(capturedTerm);
    });
  }




export function captureProcessor(capturedData) {
    let capt = {};
  
    /**
     * Need to handle the response from Basic and grammar endpoint both
     */
    capturedData.total_hits.forEach((element) => {
      const sentence = element.words; // Complete sentence fragmented into words
      const docId = element.documentId; // Docs ID
      const sentenceId = element.sentenceId; // Sentence ID
  
      const matchList = element.matches || element.match; // Handle either 'matches' (basic) or 'match' (Grammar)
  
      if (matchList) {
        matchList.forEach((matchEl) => {
            
          if (matchEl.namedCaptures) {
            // Compatible with API version V0.6.0
            processV060Match(matchEl, sentence, docId, sentenceId,capt);

          } else if (matchEl.captures) {
            // Compatible with API version V0.5.0
            processV050Match(matchEl, sentence, docId, sentenceId,capt);
          }
        });
      }
    });
  
    return capt;
  }
  