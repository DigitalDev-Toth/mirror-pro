import { CONST } from "./const";

/**
 * [Utils description]
 * @type {Object}
 */
export let Utils = {

	/**
	 * [isWebGLSupported description]
	 * @return {Boolean} [description]
	 */
	isWebGLSupported() {
		let contextOptions = { stencil: true };

		try {
			if ( !window.WebGLRenderingContext ) {
				return false;
			}

			let canvas = document.createElement( "canvas" ),
				gl =	canvas.getContext( "webgl", contextOptions ) || 
						canvas.getContext( "experimental-webgl", contextOptions );

			return !!( gl && gl.getContextAttributes().stencil );
		} catch (e) {
			return false;
		}
	},

	/**
	 * [isCanvas2DSupported description]
	 * @return {Boolean} [description]
	 */
	isCanvas2DSupported() {
		try {
			if ( !window.CanvasRenderingContext2D ) {
				return false;
			}

			let canvas = document.createElement( "canvas" ),
				context = canvas.getContext( "2d" );
		
			return !!( canvas.getContext && context );
		} catch (e) {
			return false;
		}		
	},

	/**
	 * [browserDetection description]
	 * @return {String|Boolean} [description]
	 */
	browserDetection() {
		if ( navigator.userAgent.indexOf ( "Firefox" ) !== -1 ) {
        	return "firefox";        
    	} 
    	if ( navigator.userAgent.indexOf ( "MSIE" ) !== -1 || navigator.userAgent.indexOf( "rv:11" ) !== -1 ) {
        	return "msie";
    	} 
    	if ( navigator.userAgent.indexOf ( "Chrome" ) !== -1 ) {
        	return "chrome";
    	}
    	return false;
	},

	/**
	 * [isPrimeNumber description]
	 * @param  {Integer}  number [description]
	 * @return {Boolean}         [description]
	 */
	isPrimeNumber(number) {
    	for( let i = 2; i < number; i++ ) {
        	if ( number % i === 0 ) {
            	return false;
        	}
    	}
    	return number > 2;
    },

    /**
     * [getTheCoupleOfFactorsWidthLowerDiff description]
     * @param  {Integer} number [description]
     * @return {Array}          [description]
     */
    getTheCoupleOfFactorsWidthLowerDiff(number) {
		let factors = [],
			quotient = 0;

  		for( let i = 1; i <= number; i++ ) {
    		quotient = number / i;

    		if ( quotient === Math.floor( quotient ) ){
      			factors.push( i ); 
    		}
  		}

  		factors.shift();

  		let coupleOfFactors = [];

  		if ( factors.length > 1 ) {
  			for ( let i = 0; i < factors.length; i++ ) {
  				let factor1 = factors[i],
  					factor2 = number / factor1;

				if ( coupleOfFactors.length === 0 ) {
					coupleOfFactors.push( factor2 );
					coupleOfFactors.push( factor1 );
				} else if ( Math.abs( factor1 - factor2 ) < Math.abs( coupleOfFactors[0] - coupleOfFactors[1] ) ) {
					coupleOfFactors[0] = factor2;
					coupleOfFactors[1] = factor1;
				}
  			}
  		} else {
  			coupleOfFactors.push( factors[0] );
  			coupleOfFactors.push( 1 );
  		}

    	return coupleOfFactors;
    },

    /**
     * [getNumberWidthTwoDecimalsTruncate description]
     * @param  {Number} number [description]
     * @return {Float}        [description]
     */
    getNumberWithTwoDecimalsTruncated(number) {
    	if ( this.isFloat( number ) ) {
            number = number - 0.01;
    		number = number.toString();
        	number = number.slice( 0, ( number.indexOf( "." ) ) + 3 );            
    	}    	
        
        return Number( number );
    },

    /**
     * [isFloat description]
     * @param  {Number}  number [description]
     * @return {Boolean}        [description]
     */
    isFloat(number) {
    	return number === Number( number ) && number % 1 !== 0;
	},

    /**
     * [isInsideOfBox description]
     * @param  {Object}  box    [description]
     * @param  {Object}  inside [description]
     * @return {Boolean}        [description]
     */
    isInsideOfBox(box, inside) {
        box = this.boundToFloat( box );
        inside = this.boundToFloat( inside );

        return 	inside.left >= box.left && inside.left + inside.width <= box.left + box.width &&
                inside.top >= box.top && inside.top + inside.height <= box.top + box.height;
    },

    /**
     * [isIntersectionOfBox description]
     * @param  {Object}  box          [description]
     * @param  {Object}  intersection [description]
     * @return {Boolean}              [description]
     */
    isIntersectionOfBox(box, intersection) {
    	box = this.boundToFloat( box );
        intersection = this.boundToFloat( intersection );

        return 	intersection.left < box.left + box.width && 
           		box.left < intersection.left + intersection.width && 
           		intersection.top < box.top + box.height &&
           		box.top < intersection.top + intersection.height;
    },

    /**
     * [boundToFloat description]
     * @param  {Object} bound [description]
     * @return {Object}       [description]
     */
    boundToFloat(bound) {
        return {
            width: parseFloat( bound.width ),
            height: parseFloat( bound.height ),
            left: parseFloat( bound.left ),
            top: parseFloat( bound.top )
        };
    },

    /**
     * [boundToString description]
     * @param  {Object} bound [description]
     * @return {Object}       [description]
     */
    boundToString(bound) {
        return {
            width: `${ bound.width }px`,
            height: `${ bound.height }px`,
            left: `${ bound.left }px`,
            top: `${ bound.top }px`
        };
    }
};