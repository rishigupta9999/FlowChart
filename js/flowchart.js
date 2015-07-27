function initFlowchart(data)
{
	var shapes = data.PageContents.Shapes.Shape;
	
	var rects = svg.selectAll("rect")
	   .data(shapes)
	   .enter()
	   .append("rect");
	
	var svgWidth = svg.attr("width");
	var svgHeight = svg.attr("height");
	var rectWidth = 50;
	var rectHeight = 50;
	var cellsWidth = svgWidth / rectWidth;
	var cellsHeight = svgHeight / rectHeight;
	var scaleX = 150;
	var scaleY = 150;
	
//		console.assert(false, "blah");
	   
	  rects.attr("width", rectWidth)
	       .attr("height", rectHeight)
	       .attr("fill", "white")
	       .attr("stroke", "black")
	       .attr("x", function(d, i) {
		       
		       var curShape = shapes[i];
		       var cell = curShape.Cell[0];
		       
		       var name = cell["@N"];
		       console.assert(name == "PinX", "Expected PinX");

		       var posX = cell["@V"];
		       
		       var shouldDisplay = false;
		       var label = null;
		       
		       if ("Text" in curShape)
		       {
			       if (typeof(curShape.Text) == "string")
			       {
				       label = curShape.Text;
			       }
			       else ("#text" in curShape.Text)
			       {
				       label = curShape.Text["#text"];
			       }
		       }
		       
		       if (label != null)
		       {
			       shouldDisplay = true;
		       }

			   if (shouldDisplay)
			   {
		       		return posX * scaleX;
		       }
		       else
		       {
			       return 0;
		       }
	       })
	       .attr("y", function(d, i) {
		       var curShape = shapes[i];
		       var cell = curShape.Cell[1];
		       var name = cell["@N"];
		       
		       console.assert(name == "PinY", "Expected PinY");

		       var posY = cell["@V"]
		       console.log(posY);

		       return posY * scaleY;
	       })
	       .attr("text")
	       {
		       
	       }
	
	var bar = [4, 5, 6, 7];
	console.log(bar);
}