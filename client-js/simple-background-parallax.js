/**
 * Takes elements that have backgrounds and changes their background position attribute
 * based on what percentage of its screen life it has spent on the screen.
 */
class SimpleBackgroundParallax {
	/**
	 * 
	 * @param {string} elementSelector Describes which elements to control. ex '.parallax' or '.moving-background'
	 */
	constructor(elementSelector = '.parallax') {
		this.elementSelector = elementSelector
	}
	
	/**
	 * Adds listeners for scroll events so that the background 
	 * positions are automatically adjusted.
	 */
	start() {
		window.addEventListener('scroll', evt => {
			requestAnimationFrame(this._positionBackgrounds.bind(this))
		})
		window.addEventListener('resize', evt => {
			requestAnimationFrame(this._positionBackgrounds.bind(this))
		})
		this._positionBackgrounds()
	}

	_getAbsoluteCoordinates(elem) { // crossbrowser version
		let box = elem.getBoundingClientRect();

		let body = document.body;
		let docEl = document.documentElement;

		let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		let clientTop = docEl.clientTop || body.clientTop || 0;
		let clientLeft = docEl.clientLeft || body.clientLeft || 0;

		let top  = box.top +  scrollTop - clientTop;
		let left = box.left + scrollLeft - clientLeft;

		return { top: Math.round(top), left: Math.round(left) };
	}
	
	_setElementProperties(element, percentMovement) {
		if(element.tagName === 'IMG') {
			element.style['object-position'] = `center ${percentMovement}%`
		}
		else {
			element.style['background-position'] = `center ${percentMovement}%`
		}
	}
	
	_positionBackgrounds() {
		let nodes = document.querySelectorAll(this.elementSelector)
		nodes.forEach(element => {
			let box = element.getBoundingClientRect()
			let abs = this._getAbsoluteCoordinates(element)
			
			let firstSeenBoxTop = Math.min(window.innerHeight, abs.top)
			let lastSeenBoxTop = Math.max(- box.height, abs.top - document.body.offsetHeight + window.innerHeight)
			let range = firstSeenBoxTop - lastSeenBoxTop
			
			let where = firstSeenBoxTop - box.top
			
			let percentMovement = (where / range) * 100
			percentMovement = Math.max(0, Math.min(100, percentMovement))
			this._setElementProperties(element, percentMovement)
		})
	}
}

if(module) {
	module.exports = SimpleBackgroundParallax
}
