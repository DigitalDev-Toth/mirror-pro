/**
 * 
 */
export class Rect {

	/**
	 * [constructor description]
	 * @param  {Number} left   [description]
	 * @param  {Number} top    [description]
	 * @param  {Number} width  [description]
	 * @param  {Number} height [description]
	 */
	constructor(left, top, width, height) {
		this.left = left;
	    this.top = top;
	    this.width = width;
	    this.height = height;
	}

	/**
	 * [fitsIn description]
	 * @param  {Object} outer [description]
	 * @return {Boolean}      [description]
	 */
	fitsIn(outer) {
		return outer.width >= this.width && outer.height >= this.height;
	}

	/**
	 * [sameSizeAs description]
	 * @param  {Object} other [description]
	 * @return {Boolean}      [description]
	 */
	sameSizeAs(other) {
		return this.width == other.width && this.height == other.height;
	}
}