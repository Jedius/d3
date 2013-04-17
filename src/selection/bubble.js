import "selection";

d3_selectionPrototype.color = function(color) {
  this.style("fill", color);
  return this;
};

d3_selectionPrototype.position = function(x,y) {
  this.attr("transform", "translate(" + x + "," + y + ")");
  return this;
};

d3_selectionPrototype.overlap = function(nodes,opacity) {
	var index = nodes[0].indexOf(this.node());
	if (index !== -1) {
		nodes[0].splice(index,1);
		nodes[0].unshift(this.node());
		nodes.order();
	}
	if (typeof opacity === 'number') {
		var clone = this.node().parentNode.insertBefore(this.node().cloneNode(true), nodes[0][nodes[0].length-1]);
		d3.select(clone).style('opacity',opacity);
	  return this;
	}

};