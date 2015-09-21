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

function Connectors(inShapes)
{
	var shapesCopy = jQuery.extend(true, [], inShapes);
	
	var length = shapesCopy.length;
	
	for (var i = 0; i < length; i++)
	{
		var curShape = shapesCopy[i];
		
		var numCell = curShape["Cell"].length;
		
		var startX = 0;
		var startY = 0;
		var endX = 0;
		var endY = 0;
		var valid = 0;
		
		for (var c = 0; c < numCell; c++)
		{
			var curCell = curShape["Cell"][c];
			
			if (curCell["@N"] == "BeginX")
			{
				startX = curCell["@V"];
				valid++;
			}
			else if (curCell["@N"] == "BeginY")
			{
				beginY = curCell["@V"];
				valid++;
			}
			else if (curCell["@N"] == "EndX")
			{
				endX = curCell["@V"];
				valid++;
			}
			if (curCell["@N"] == "EndY")
			{
				endY = curCell["@V"];
				valid++;
			}
		}
		
		console.assert( ((valid == 0) || (valid == 4)), "Missing elements in line" );
		
		if (!valid)
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
	var maxY = minY;
	
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
		
		if (curY > maxY)
		{
			curY = maxY;
		}
	}
	
	maxY -= minY;
	
	for (var i = 0; i < length; i++)
	{
		inShapes[i].Cell[0]["@V"] -= minX;
		inShapes[i].Cell[1]["@V"] = maxY - (inShapes[i].Cell[1]["@V"] - minY);
	}
}

function initFlowchart(data)
{
	var shapes = data.PageContents.Shapes.Shape;
	
	// Extract shapes that correspond to nodes on the flowchart 
	var shapesToDraw = DisplayableShapes(shapes);
	NormalizePositions(shapesToDraw);
	
	// Extract shapes that would be connectors (lines)
	var connectors = Connectors(shapes);
	NormalizePositions(shapes);
	
	var scaleX = 150;
	var scaleY = 150;
	
	// Draw groups that will contain shape and text
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
	
	// Draw rectangles for the nodes
	groups.append("rect")
		.attr("width", rectWidth)
		.attr("height", rectHeight)
		.attr("fill", "white")
		.attr("stroke", "black");
	
	// Draw text
	groups.append("text")
		.attr("x", 10)
		.attr("y", 20)
		.text(function(d) {
			return ShapeLabel(d)
		});
		
	// Draw lines
	var lines = svg.selectAll("lines")
					.data(connectors)
					.enter()
					.append("line")
					.attr("x1", "0")
					.attr("y1", "0")
					.attr("x2", "250")
					.attr("y2", "250")
					.attr("stroke", "black");
	
	var bar = [4, 5, 6, 7];
	console.log(bar);
}