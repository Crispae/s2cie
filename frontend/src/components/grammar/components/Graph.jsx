import React from 'react'
import Tree from 'react-d3-tree'

function Graph() {

    const orgChart = [
        {
          "name": "Regulation",
          "children": [

            {
              "name": "Positive_regulation",
              "children": [
                {
                  "name": "Theme",
                  "labels": ["Theme", "Th"]
                },
                {
                  "name": "Cause",
                  "labels": ["Cause", "Ca"]
                }
              ]
            },

            {
              "name": "Negative_regulation",
              "children": [
                {
                  "name": "Theme",
                  "labels": ["Theme", "Th"]
                },
                {
                  "name": "Cause",
                  "labels": ["Cause", "Ca"]
                }
              ]
            },

            {
              "name": "Activation",
              "children": [
                {
                  "name": "Theme",
                  "labels": ["Theme", "Th"]
                },
                {
                  "name": "Cause",
                  "labels": ["Cause", "Ca"]
                }
              ]
            },

            {
              "name": "Inactivation",
              "children": [
                {
                  "name": "Theme",
                  "labels": ["Theme", "Th"]
                },
                {
                  "name": "Cause",
                  "labels": ["Cause", "Ca"]
                }
              ]
            },

             {
              "name": "Inactivation",
              "children": [
                {
                  "name": "Theme",
                  "labels": ["Theme", "Th"]
                },
                {
                  "name": "Cause",
                  "labels": ["Cause", "Ca"]
                }
              ]
            },
            {
                "name": "Gene_Expressions",
                "children": [
                  {
                    "name": "Gene_expression",
                    "children": [
                      {
                        "name": "Theme",
                        "labels": ["Theme", "Th"]
                      }
                    ]
                  },
                  {
                    "name": "Transcription",
                    "children": [
                      {
                        "name": "Theme",
                        "labels": ["Theme", "Th"]
                      }
                    ]
                  },
                  {
                    "name": "Translation",
                    "children": [
                      {
                        "name": "Theme",
                        "labels": ["Theme", "Th"]
                      }
                    ]
                  }
                  // ... (other gene expression types)
                ]
              },

              {
                "name": "Conversions",
                "children": [
                  {
                    "name": "Conversion",
                    "children": [
                      {
                        "name": "Theme",
                        "labels": ["Theme", "Th"]
                      },
                      {
                        "name": "Product",
                        "labels": ["Product", "Prod", "Pr"]
                      }
                    ]
                  },
                  {
                    "name": "Phosphorylation",
                    // ... (similar structure for other conversion types)
                  },
                  // ... (other conversion types)
                ]
              },













          ]
        },






        
        



        
        // ... (other categories like Degradation, Binding, Localization, etc.)
      ]
      




  return (
    <div id="treeWrapper" style={{ width: 'auto', height: '100%' }}>
      <Tree orientation='Vertical' data={orgChart} draggable="true" />
    </div>
  )
}

export default Graph
