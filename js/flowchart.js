function initFlowchart(data)
{
	var shapes = data.PageContents.Shapes.Shape;
	
	var rects = svg.selectAll("rect")
	   .data(shapes)
	   .enter()
	   .append("rect");
	
	var svgWidth = svg.attr("width");
	var svgHeight = svg.attr("height");
	var rectWidth = 10;
	var rectHeight = 10;
	var cellsWidth = svgWidth / rectWidth;
	var cellsHeight = svgHeight / rectHeight;
	var scaleX = 100;
	var scaleY = 20;
	
//		console.assert(false, "blah");
	   
	  rects.attr("width", rectWidth)
	       .attr("height", rectHeight)
	       .attr("x", function(d, i) {
		       var curShape = shapes[i];
		       var cell = curShape.Cell[0];
		       var name = cell["@N"];
		       
		       console.assert(name == "PinX", "Expected PinX");

		       var posX = cell["@V"]
		       		       console.log(posX);

		       return posX * scaleX;
		       
	       });
	
	var bar = [4, 5, 6, 7];
	console.log(bar);
}