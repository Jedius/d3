import "selection";

// Task 1
d3_selectionPrototype.strokeWidth = function(width) {
	this.style("stroke-width", width);
	return this;
};

// Task 2
d3_selectionPrototype.strokeColor = function(color) {
	this.style("stroke", color);
	return this;
};

// Task 3 == Task 10
d3_selectionPrototype.fill = function(color) {
  this.style("fill", color);
  return this;
};

// Task 4
d3_selectionPrototype.fillOpacity = function(opacity) {
	this.style("fill-opacity", opacity);
	return this;
};

// Task 5
d3_selectionPrototype.overlap = function(nodes,opacity) {
	var index = nodes[0].indexOf(this.node());
	if (index !== -1) {
		nodes[0].splice(index,1);
		nodes[0].unshift(this.node());
		nodes.order();
	}
	if (typeof opacity === 'number') {
		var parent = this.node().parentNode;
		var cur = this.node().cloneNode(true)
		var temp = d3.select(parent).append('temp');
		var clone = parent.insertBefore(cur,temp);
		temp.remove();
		this.cloneOverlap = d3.select(clone);
		this.cloneOverlap.style('opacity',opacity);
	}
	return this;
};

// Task 6
d3_selectionPrototype.bColor = function(color) {
  this.style("background-color", color);
  return this;
};


// Task 7
d3_selectionPrototype.hide = function() {
  if (this.style('display') !== 'none') {
  	this._styleDisplay = this.style('display');	
  }
  this.style("display", 'none');
  return this;
};

d3_selectionPrototype.show = function() {
  if (this._styleDisplay && this._styleDisplay !== 'none') {
  	this.style("display", this._styleDisplay);
  } else {
  	this.style("display", 'inline');	
  }
  return this;
};

// Task 8
d3_selectionPrototype.font = function(font) {
  this.style("font-family", font);
  return this;
};

// Task 9
d3_selectionPrototype.fontSize = function(size) {
  this.style("font-size", size);
  return this;
};

d3_selectionPrototype.position = function(x,y) {
  this.attr("transform", "translate(" + x + "," + y + ")");
  return this;
};

