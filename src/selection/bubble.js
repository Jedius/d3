import "selection";

var style = function (nodes,fn,style,arg,arg2) {
  if (typeof arg === 'undefined') {
    arg = style;
    style = null;
  }
  if (typeof arg === 'object') {
      var i = 0;
      nodes.each(function (d) {
          if (arg[i]) {
              if (style !== null) {
                d3.select(this)[fn](style, arg[i]);
              } else {
                var el = d3.select(this);
                el[fn](arg[i]);
                if (fn === 'text') {
                    var data = el.data()[0];
                    data.__label = arg[i];
                    el.data(data);  
                } else if (fn === 'percent') {
                  var name = '';
                  if (el.data()[0].__label) {
                    name = el.data()[0].__label;
                  } else {
                    name = el.data()[0].name;
                  }
                  if (arg[i]) {
                    el.text(name + ' - ' + el.data()[0].percent*100+'%')
                  } else {
                    el.html(name)
                  }
                } else if (fn === 'popOut') {
                  var tlength = this.getComputedTextLength();
                  var clength = el.data()[0].r*2;
                  if (typeof arg[i] === 'number') {
                      if (clength - tlength <= arg[i]) {
                        el.attr('dy',clength/2+arg2[i]+'px')
                      }
                  } else {

                  }
                  
                }
              }
              i++;
          }
      });
  } else {
      nodes.style(style, arg);
  }
}

d3_selectionPrototype.strokeWidth = function(arg) {
    style(this,'style','stroke-width',arg)
    return this;
};

d3_selectionPrototype.strokeColor = function(arg) {
  	style(this,'style','stroke',arg)
    return this;
};

d3_selectionPrototype.strokeOpacity = function(arg) {
    style(this,'style','stroke-opacity',arg)
    return this;
};

d3_selectionPrototype.fill = function(arg) {
    style(this,'style','fill',arg)
    return this;
};

d3_selectionPrototype.fillOpacity = function(arg) {
	  style(this,'style','fill-opacity',arg)
    return this;
};

d3_selectionPrototype.bColor = function(arg) {
  style(this,'style','background-color',arg)
  return this;
};

d3_selectionPrototype.font = function(arg) {
  style(this,'style','font-family', arg);
  return this;
};

d3_selectionPrototype.fontSize = function(arg) {
  style(this,'style','font-size', arg);
  return this;
};

d3_selectionPrototype.hide = function() {
  if (this.style('display') !== 'none') {
  	this._styleDisplay = this.style('display');	
  }
  style(this,'style','display','none')
  return this;
};

d3_selectionPrototype.show = function() {
  if (this._styleDisplay && this._styleDisplay !== 'none') {
    style(this,'style','display', this._styleDisplay);
  } else {
    style(this,'style','display', 'inline');
  }
  return this;
};

d3_selectionPrototype.label = function(arg) {
  style(this,'text',arg);
  return this;
};

d3_selectionPrototype.percent = function(arg) {
  style(this,'percent',arg);
  return this;
};

d3_selectionPrototype.position = function(arg) {
  if (typeof arg === 'object') {
      var i = 0;
      this.each(function (d) {
          if (arg[i]) {
              d.x = arg[i][0]
              d.y = arg[i][1]
              i++;
          }
      });
  }
  if (typeof arg === 'object') {
    for (var i = 0; i < arg.length; i++) {
      arg[i] = "translate(" + arg[i][0] + "," + arg[i][1] + ")";
    }  
  }
  style(this,'attr','transform', arg);
  return this;
};

d3_selectionPrototype.move = function(dx,dy) {
  if (typeof dx !== 'undefined') {
  	style(this,'attr','dx', dx);
  }
  if (typeof dy !== 'undefined') {
    style(this,'attr','dy', dy);
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

d3_selectionPrototype.down = function() {
  if (this[0].length > 1) {
    this.each(function() {
      d3.select(this).down()
    })
  } else {
    var nodes = d3.selectAll(this.node().parentNode.childNodes);
    var index = nodes[0].indexOf(this.node());
    if (index !== -1) {
      nodes[0].splice(index,1);
      nodes[0].unshift(this.node());
      nodes.order();
    }  
  }
}

d3_selectionPrototype.overlap = function(opacity,fn) {
  if (this[0].length > 1) {
    var i = 0;
    this.each(function() {
      if (typeof opacity === 'object') {
        if (typeof opacity[i] !== 'undefined') {
          d3.select(this).overlap(opacity[i],fn);  
          i++;          
        }
      } else {
        d3.select(this).overlap(opacity,fn);  
      }
    })
  } else {
    if (typeof opacity === 'number') {
      if (this.node().clone) {
        this.node().clone.remove();
      }
      var parent = this.node().parentNode;
      var cur = this.node().cloneNode(true);
      var clone = parent.appendChild(cur);
      this.node().clone = d3.select(clone)
        .style('opacity',opacity)
        .classed('overlap-clone',true)
      this.node().clone.node().parent = this;
      if (fn) {
        this.node().clone.data(this.data())
        this.node().clone.call(fn)
      }
    } else if (typeof opacity === 'boolean' && opacity === false) {
      this.node().clone.remove();
    }
  }
  return this;
};

d3_selectionPrototype.popOut = function(arg,arg2) {
  style(this,'popOut',arg,undefined,arg2);
  return this;
};