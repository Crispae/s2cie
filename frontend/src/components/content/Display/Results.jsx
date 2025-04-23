import React, { useState, useEffect, useRef } from 'react';
import processResponse from './DisplayUtils/ResponseProcessor';
import DisplayElement from './DisplayUtils/DisplayElement';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import SkeletonLoader from './DisplayUtils/SkeletonLoader';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addSelectedData,removeSelectedData } from '../../../redux/slices/selected/selection';
import { addDisplayResult } from '../../../redux/slices/displayResult/displayResult';
import UsageDisplay from './DisplayUtils/UsageDisplay';
function Results({ response, scoredResponse,}) {

  /**
   * Dispatch to store data in redux store
   * 
   */

  /**
   * 
   * check the match
   * console.log(response.total_hits[91].matches)
   * 
   */


  const dispatch = useDispatch();

  const [hitsCount, setHitCount] = useState(0);

  /**
   * 
   * 
   */
  const isResponseLoading = useSelector((state) => state.response.loading);
  const isContextLoading = useSelector((state) => state.context.loading);
  const selectedSentence = useSelector((state)=> new Set(state.selection.data))
  const results = useSelector((state)=> state.displayResult.data)

  const backgroundColor = (result)=>{
                          
    let bgColor;
    selectedSentence.forEach((element) => {

      if (element.sentenceId === result.sentenceId) 
      {

        if(element.selectionType === "upvoted"){
          bgColor =  "#B3D191"}

        else if(element.selectionType === "downvoted"){
          bgColor =  "#E6A3A3"
        }

      }
    })

    return bgColor


  }

  const plotDataArray = useSelector((state)=> state.plot.data)


  const onThumsUp = ({result_obj}) => {
    /**
     *  Also need to update the state to store the information of selection
     */
    OnChangeSelectedSentences({"type":"upvoted",
                               result:result_obj})
    
    }

    const onThumsDown = ({result_obj}) =>{
      
      OnChangeSelectedSentences({"type":"downvoted",
                                result:result_obj})
      
      }

    const onClear = ({result_obj}) => {
      OnChangeSelectedSentences({"type":"clear",
        result:result_obj
      })
     
    };

  const cache = useRef(
    new CellMeasurerCache({
      defaultHeight: 50,
      fixedWidth: true,
    })
  );

  const OnChangeSelectedSentences = (data) => {

      if (data.type === "clear") {

        dispatch(removeSelectedData(data))
      }else{

        dispatch(addSelectedData(data))

      }
      
  };

  function filterArticles(plotData) {
    const selectedArticles = new Set();
    plotData.forEach((element) => {
      element.docs.forEach((article) => {
        selectedArticles.add(article);
      });
    });

    const uniqueArticles = Array.from(selectedArticles);
    return uniqueArticles;
  }

  useEffect(() => {

    if (response) 
      {

      /**
       * Destructurin the responses
       */
      const { totalHitsCount: hits, results: res } = processResponse(response);
      /**
       * Setting the hit count
       */
      setHitCount(hits);

      /**
       * Extracting the articles from the selection in element bar
       */
      const filteredArticles = filterArticles(plotDataArray);
      let filteredResults;

      if (filteredArticles.length === 0) {
        filteredResults = res;
      } else {
        filteredResults = res.filter((result) => filteredArticles.includes(result.documentId));
      }

      /**
       * 
       * Storing result to redux store
       */
      dispatch(addDisplayResult(filteredResults))
    } 
    else {
      /**
       * If there is no response, then result and hit count should be 0
       */
      setHitCount(0);
    }
  }, [response, plotDataArray, dispatch]);


  return (
    <div

      style={{
        border: '1px solid gray',
        height: '900px',
        borderRadius: '4px',
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
      }}
    >
      {isResponseLoading || isContextLoading ?

      (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <SkeletonLoader></SkeletonLoader>
        </div>
      )
      
      : response && hitsCount > 0 ? 
      (
        <AutoSizer>

          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowCount={results.length}
              rowRenderer={({ key, style, index, parent }) => {
                const result = results[index];
                return (

                  <CellMeasurer
                    key={key}
                    cache={cache.current}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                  >
                    <div style={style}>
                      {/**
                       * TODO: move the most diplay element logic to its own component
                       */}
                      <DisplayElement
                        key={index}
                        result_obj={result}
                        scoredResponse={scoredResponse}
                        onThumsUp={onThumsUp}
                        onThumsDown={onThumsDown}
                        onClear={onClear}
                        backgroundColor={backgroundColor}
                      />
                    </div>
                  </CellMeasurer>
                );
              }}
            ></List>
          )}

        </AutoSizer>

      ) : response && hitsCount === 0 ? 
      (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <h2 style={{ textAlign: 'center' }}>No Hits Found</h2>
        </div>


      ):
      
      (
        <UsageDisplay></UsageDisplay>
        
      )
      
      }

    </div>
  );
}

export default Results;
