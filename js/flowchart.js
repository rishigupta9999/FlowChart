function ShapeLabel(inShape)
{
	var label = null;
	
	if ("Text" in inShape)
	{
		if (typeof(inShape.Text) == "string")
		{
			label = inShape.Text;
		}
		else ("#text" in inShape.Text)
		{
			label = inShape.Text["#text"];
		}
	}
	
	return label;
}

function DisplayableShapes(inShapes)
{
	var shapesCopy = jQuery.extend(true, [], inShapes);
	
	var length = shapesCopy.length;
	
	for (var i = 0; i < length; i++)
	{
		var curShape = shapesCopy[i];
		var label = ShapeLabel(curShape);
		
		if (label == null)
		{
			shapesCopy.splice(i, 1);
			length--;
			i--;
		}
	}

	return shapesCopy;
}

function initFlowchart(data)
{
	var shapes = data.PageContents.Shapes.Shape;
	var shapesToDraw = DisplayableShapes(shapes);
	
	var rects = svg.selectAll("rect")
	   .data(shapesToDraw)
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
	       
	       var curShape = shapesToDraw[i];
	       var cell = curShape.Cell[0];
	       
	       var name = cell["@N"];
	       console.assert(name == "PinX", "Expected PinX");
	
	       var posX = cell["@V"];
	       
	       var shouldDisplay = false;
	       var label = ShapeLabel(curShape);
	       
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
	   .attr("text", function(d, i) {
	       return ShapeLabel(shapes[i]);
	   })
	
	var bar = [4, 5, 6, 7];
	console.log(bar);
}