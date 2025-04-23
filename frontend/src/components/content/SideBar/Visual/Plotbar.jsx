import React, { useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Plot from 'react-plotly.js';

function Plotbar({annotationData}) {
  
  const [selectedCategory, setSelectedCategory] = useState('Entity type'); // Store category for Bar plot

  const entitydistPlot = useMemo(() => {

    if(annotationData){

      /**
     * Function to process the data for entity distribution plot
     * @todo sleep sometime
     */

    const x_entites = [];
    const y_count = [];

    /**
     *  A check to look if entity types exist or not
     *
     */

    if (selectedCategory in annotationData) {
      const selectedData = annotationData[selectedCategory];

      Object.entries(selectedData).forEach(([key, value]) => {
        x_entites.push(value.reprensentative_term); // pushing name and count of the term
        y_count.push(value.total_count);
      });

    }
    
    return {
      x: x_entites,
      y: y_count,
      type: 'bar',
      marker: {
        color: 'rgba(219, 64, 82, 0.7)',
      },
    };


    } else {

      /**
       * 
       * If annotated data is not available
       * 
       */
      return {}
    }
    
    
  }, [selectedCategory, annotationData]);

  /**
   * Calculate the total distribution of entities
   */

  const distPlot = useMemo(() => {

    if(annotationData){

      /** Function used to calculate the total count of each category */
      const totalDistributionCount = Object.entries(annotationData).map(([outerKey, outerValue]) => ({
        category: outerKey,
        count: Object.values(outerValue).reduce((total, innerValue) => total + innerValue.total_count, 0),
      }));


      const data = {
        x: totalDistributionCount.map(({ category }) => category), // use destructuring here to extract the category
        y: totalDistributionCount.map(({ count }) => count),
        type: 'bar',
        marker: {
          color: 'rgba(219, 64, 82, 0.7)',
        },
      };

      console.log(data)

      return data;
  
    }else{
      return {}
    }

  
  }, [annotationData]);

  /** Option which function will execute */
  const dataToPlot = selectedCategory === 'Entity type' ? distPlot : entitydistPlot;

  /**
   * Layout to design the plot
   */
  const layout = {
    title: "Biological concepts distribution plot",
    autosize: false,
    width: 800,
    height: 400,
    yaxis: {
      automargin: true,
    },
    xaxis: {
      automargin: true,
    },
  };

  // List of categories for radio buttons
  const categories = ['Entity type',
                      'disease',
                      'gene',
                      'cell_type',
                      'cell_line',
                      'mutation', 
                      'species',
                      'DNA',
                      'RNA',
                      'drug'];

  return (
    <Container>
      <Row>
        <Col md={8}>
          {dataToPlot && <Plot data={[dataToPlot]} layout={layout} />}
        </Col>
        <Col style={{ padding: "10px", borderRadius: "5px" }}>
          <form>
            {categories.map(category => (
              <div key={category} style={{ marginBottom: '10px' }}>
                <input
                  type="radio"
                  name="category"
                  id={category}
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                />
                <label htmlFor={category} style={{ marginLeft: '5px' }}>{category}</label>
              </div>
            ))}
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default React.memo(Plotbar);
