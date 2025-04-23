import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { monokai } from '@uiw/codemirror-themes-all';


const Editor = React.forwardRef(({height,width,placeholder, theme},ref) =>{
  return (
<div style={{margin:"5px"}}>

<CodeMirror
      placeholder={placeholder}
      height={height}
      ref={ref}
      width={width}
      theme={monokai}
      extensions={ (theme === "yaml") ? [langs.yaml()] : [langs.javascript()]}
      basicSetup={{
        
        highlightActiveLine:false,
        foldGutter: false,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: false,
      }}
    />

</div>
  )
})

export default Editor
