import React from 'react';
import { useSelector } from 'react-redux';
import { CSVconverter } from './CSVconverter';
import { generateUUID } from '../UniqueID';

function Optionsbutton({ options,}) {
  const selectedSentence = useSelector((state) => state.selection.data);
  const currentDisplayData = useSelector((state) => state.displayResult.data);

  const download = (downloadOption) => {
    const filename = generateUUID();
    switch (downloadOption) {
      case '1':
        // Download all data available
        CSVconverter(currentDisplayData, `${filename}.csv`);
        break;
      case '2':
        const upvotedSelection = selectedSentence.filter((element) => {
          return element.selectionType === 'upvoted';
        });
        CSVconverter(upvotedSelection, `${filename}.csv`);
        break;
      case '3':
        const downvotedSelection = selectedSentence.filter((element) => {
          return element.selectionType === 'downvoted';
        });
        CSVconverter(downvotedSelection, `${filename}.csv`);
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value !== "") 
      {
      download(value);
      // Reset the select element to the default empty option
      e.target.value = "";
    }
  };

  return (
    <div>
      <select onChange={handleChange} defaultValue="">
        <option value="" disabled>Select download option</option>
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Optionsbutton;
