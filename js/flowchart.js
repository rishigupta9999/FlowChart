function ShapeLabel(inShape)
{
	var label = null;
	
	if ("Text" in inShape)
	{
		if (typeof(inShape.Text) == "string")
		{
			label = inShape.Text;
		}
		else if ("#text" in inShape.Text)
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

function NormalizePositions(inShapes)
{
	var length = inShapes.length;
	
	var minX = inShapes[0].Cell[0]["@V"];
	var minY = inShapes[0].Cell[1]["@V"];
	
	for (var i = 0; i < length; i++)
	{
		var curX = inShapes[i].Cell[0]["@V"];
		var curY = inShapes[i].Cell[1]["@V"];
		
		if (curX < minX)
		{
			minX = curX;
		}
		
		if (curY < minY)
		{
			minY = curY;
		}
	}
	
	for (var i = 0; i < length; i++)
	{
		inShapes[i].Cell[0]["@V"] -= minX;
		inShapes[i].Cell[1]["@V"] -= minY;
	}
}

function initFlowchart(data)
{
	var shapes = data.PageContents.Shapes.Shape;
	
	console.log(shapes);
	var shapesToDraw = DisplayableShapes(shapes);
	NormalizePositions(shapesToDraw);
	
	var scaleX = 150;
	var scaleY = 150;
	
	var groups = svg.selectAll("g")
	   .data(shapesToDraw)
	   .enter()
	   .append("g")
	   .attr("transform", function(d, i) {
		   var curShape = shapesToDraw[i];
	       var cellX = curShape.Cell[0];
	       var cellY = curShape.Cell[1];
	       
	       var name = cellX["@N"];
	       console.assert(name == "PinX", "Expected PinX");
	       
	       name = cellY["@N"];
	       console.assert(name == "PinY", "Expected PinY");
	
	       var posX = cellX["@V"] * scaleX;
		   var posY = cellY["@V"] * scaleY;

		   return "translate(" + posX + ", " + posY +  ")";
		})
	
	var svgWidth = svg.attr("width");
	var svgHeight = svg.attr("height");
	var rectWidth = 50;
	var rectHeight = 50;
	var cellsWidth = svgWidth / rectWidth;
	var cellsHeight = svgHeight / rectHeight;
		   
	groups.append("rect")
		.attr("width", rectWidth)
		.attr("height", rectHeight)
		.attr("fill", "white")
		.attr("stroke", "black");
		
	groups.append("text")
		.attr("x", 10)
		.attr("y", 20)
		.text(function(d) {
			return ShapeLabel(d)
		});
	
	var bar = [4, 5, 6, 7];
	console.log(bar);
}