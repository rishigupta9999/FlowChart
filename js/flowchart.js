function initFlowchart(data)
{
	var shapes = data.PageContents.Shapes.Shape;
	
	var rects = svg.selectAll("rect")
	   .data(shapes)
	   .enter()
	   .append("rect");
	   
	  rects.attr("width", 10)
	       .attr("height", 10)
	       .attr("x", function(d, i) {
		       return (i * 15);
	       });
	
	var bar = [4, 5, 6, 7];
	console.log(bar);
}