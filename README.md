# D3 fork
all changes in src/selection/bubble.js

# Overlapping areas visualisation 
https://gist.github.com/Jedius/5419480
```

d3.select('.line')
	.strokeWidth(5) // set stroke width
	.strokeColor('aqua') // set stroke color

d3.select('.area')
	.fill('green') // set area color
	.fillOpacity(0.8) // set area opacity

// overlap elements
element = svg.select(".element:nth-child(3)")
opacity = 0.8
element.overlap(opacity) // if opacity not set, element will be on bottom position. 'false' argument instead of opacity will disable overlap

// set background color
d3.select('svg').bColor('aqua');

d3.selectAll('text')
	.font('Arial') // set font-family
	.fontSize('10px') // set font-size
	.fill('green') // set font color

d3.select('g')
	.hide() // hide element
	.show() // show element

d3.select(".arc text")
    .move('50px','-85px') // move label on pie
    .text('hello') // change label

d3.selectAll('.nodes').collapse(0.2) // collapse selected elements

```