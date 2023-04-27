# Simple Background Parallax

Takes elements that have backgrounds and changes their background position attribute
based on what percentage of its screen life it has spent on the screen.

This is a litle bit more complicated than just using the elements position relative to
the viewport. Something like a top banner starts out at the top of the screen, so to get 
all of the background image to show, the code must take into account that the whole travel of
the background needs to happen when the screen scrolls just the height of the banner.

That is, the code needs to know when is the first scroll position of the document that an 
element can be seen and what is the last scroll position that the element can be seen, and 
adjust the background movement for that range.

## Install

```
npm i simple-background-parallax
```

## Usage

```
const SimpleBackgroundParallax = require('simple-background-parallax')

let sbp = new SimpleBackgroundParallax('.parallax')
sbp.start()
```

The parameter passed on creation is the node selector for which elements to adjust.

The `start()` function adds listeners for scroll events so that the background 
positions are automatically adjusted.


## Note

This code assumes the elements will be styled with `background-size: cover`. It propobaly
works if you don't but won't have the parallax effect you may be looking for.

Also, any element which has a taller aspect ration than it's background won't see any
parallax effect, but it also won't look broken. 

An example is available in the "public" directory of the package.
