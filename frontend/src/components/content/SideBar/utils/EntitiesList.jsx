import React from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import Entity from './Entity';


function EntitiesList({ data,elementType}) {

  /**
   * Entites styling
   */
  const entities_style = {
    border: '1px solid #ccc',
    borderRadius: '3px',
  };
  
 

  
  /**
   *  When we use React-window, on scrolling we loose 
   *  the checked box option, 
   *  to retain that,we need to provide it as prop
   */
  const entityKeys = useSelector((state) => state.plot.data.map(entity => entity.id));

  /**
   * 
   * Sorting of entites based on total_count
   */
  const entries = Object.entries(data);
  entries.sort((a, b) => {
    return b[1].total_count - a[1].total_count}
  );

  
  
  
  const Row = ({ index, style }) => {
    const [key, value] = entries[index];

    return (

      <div style={style}>
        {/**
         * In name placeholder we use reprensentative_term
         * key will be th id of the entity
         * value will be the whole object of the entity
         */}

         
        <Entity key={key} 
                name={value.reprensentative_term} 
                id={key} value={value}
                elementType={elementType} 
                isChecked={entityKeys.includes(key)}>
        </Entity>

      </div>
    );
  };

  return (
    <List
      style={entities_style}
      height={500}
      itemData={entries}
      itemCount={entries.length}
      itemSize={50} // Adjust the item size based on your Entity component's height
      width="100%"
    >
      {Row}
    </List>
  );
}

export default React.memo(EntitiesList);
