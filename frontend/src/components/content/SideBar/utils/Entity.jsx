import React from 'react';
import { useDispatch } from 'react-redux';
import { addPlotData, removePlotData } from '../../../../redux/slices/plot/plot';
function Entity({ name, value,id,isChecked,elementType}) {

  const dispatch = useDispatch()
    
  const handleEntitySelectionChange = (name,id,entityValue,elementType,checked) => {
    if (checked) {
      
      const selectedEntity = { id: id,
                               name:name,
                               docs: Array.from(entityValue.doc_list),
                               type:elementType}

      // Add the selected entity
      dispatch(addPlotData(selectedEntity))

    } else {
      // Remove the unselected entity
      dispatch(removePlotData(id))
    }
  };

  const single_entity_div_style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #ddd',
    borderRadius: '3px',
    padding: '8px',
    margin: '5px 0',
    backgroundColor: '#f9f9f9',
    fontSize: '12px',
  };

  const count_style = {
    borderRadius: '50%',
    backgroundColor: '#ccc',
    padding: '5px',
    minWidth: '25px',
    textAlign: 'center',
  };

  
  return (
    <div key={name} style={single_entity_div_style}>

      {/* Section to define each entity as an input element */}
      <label style={{ display: 'flex', alignItems: 'center' }}>
        <input
          onChange={(event) =>

            handleEntitySelectionChange(name,id,value, elementType,event.target.checked)
          }
          type="checkbox"
          checked = {isChecked}
        />
        <span style={{ marginLeft: '5px' }}>{name}</span>
      </label>

      {/* Div for count */}
      <div style={count_style}>{value.total_count}</div>
    </div>
  );
}

export default React.memo(Entity);
