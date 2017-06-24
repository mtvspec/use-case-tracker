(function () {
  'use strict';
  
  app.controller('OrgChatCtrl', function (OrganizationalUnitAPI) {
  
    let vm = this;
  
    vm.organizationalUnits = OrganizationalUnitAPI.organizationalUnits;
  
    var $ = go.GraphObject.make;

    var myDiagram =
      $(go.Diagram, "myDiagramDiv",
        {
          initialContentAlignment: go.Spot.Center, // center Diagram contents
          "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
          layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                    { angle: 90, layerSpacing: 35 })
        });

    // the template we defined earlier
    myDiagram.nodeTemplate =
      $(go.Node, "Horizontal",
        { background: "#FFF" },
        $(go.TextBlock, "Default Text",
          { margin: 12, stroke: "black", font: "16px Ubuntu Mono" },
          new go.Binding("text", "name"))
      );

    // define a Link template that routes orthogonally, with no arrowhead
    myDiagram.linkTemplate =
      $(go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { strokeWidth: 1, stroke: "#555" })); // the link shape

    var model = $(go.TreeModel);
    
    model.nodeDataArray = vm.organizationalUnits;
    console.log(model.nodeDataArray);
    myDiagram.model = model;
  
  });
  
})();