
export default function eventHandler(cyObj) {

    /**
     * 
     * TODO: Integreation of tippy.js to show the infromation between the nodes and edges
     * 
     * 
     * 
     */


    // Add node click event
    cyObj.on("tap","node",(event)=>{

        let node = event.target;

        cyObj.elements().forEach((element)=>{

            // Element should not be node and must have tippy
            if (element !== node && element.tippy){
                element.tippy.hide();
            }

            // Toggle the pop-up for the clicked node
            if (node.tippy) {
                node.tippy.show();
            }
            
        })

    });


    // Add edge click event
    cyObj.on("tap","edge",(event)=>{

        let edge = event.target;
        cyObj.elements().forEach((element)=>{

            // Element should not be node and must have tippy
            if (element !== edge && element.tippy){
                element.tippy.hide();
            }

            // Toggle the pop-up for the clicked node
            if (edge.tippy) {
                edge.tippy.show();
            }
            
        })



    })












}