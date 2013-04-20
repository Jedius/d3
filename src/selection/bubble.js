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

// Task 3, 10, 11, 15, 20
d3_selectionPrototype.fill = function(color) {
  this.style("fill", color);
  return this;
};

// Task 4
d3_selectionPrototype.fillOpacity = function(opacity) {
	this.style("fill-opacity", opacity);
	return this;
};

// Task 5, 22
d3_selectionPrototype.overlap = function(opacity) {
	if (this[0].length > 1) {
		this.each(function() {
			d3.select(this).overlap(opacity);
		})
	} else {
		var nodes = d3.selectAll(this.node().parentNode.childNodes);
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
			this.node().clone = d3.select(clone)
				.style('opacity',opacity)
				.classed('overlap-clone',true)
		} else if (typeof opacity === 'boolean' && opacity === false) {
			this.node().clone.remove();
		}
	}
	return this;
};

// Task 6, 16
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

// Task 8, 13, 18
d3_selectionPrototype.font = function(font) {
  this.style("font-family", font);
  return this;
};

// Task 9, 14, 19
d3_selectionPrototype.fontSize = function(size) {
  this.style("font-size", size);
  return this;
};

// Task 12
d3_selectionPrototype.move = function(dx,dy) {
  if (typeof dx !== 'undefined') {
  	this.attr("dx", dx);	
  }
  if (typeof dy !== 'undefined') {
  	this.attr("dy", dy);
  }
  
  return this;
};

// Task 21
d3_selectionPrototype.collapse = function(percent) {
  this.attr("transform", function(d) { 
  	if (typeof percent === 'number') {
  		x = d.x*percent;
  		y = d.x*percent;
  	} else {
  		x = 0;
  		y = 0;
  	}
  	return "translate(" + (d.x-x) + "," + (d.y-y) + ")"; 
  });
  return this;
};

d3_selectionPrototype.position = function(x,y) {
  this.attr("transform", "translate(" + x + "," + y + ")");
  return this;
};
