import { Core } from "../../../core";

/**
 * 
 */
export class LayoutUtils {

	/**
	 * [setDesksBoundaries description]
	 * @param  {Integer} desksInScreen  [description]
	 * @param  {Object} panelLayoutSize [description]
	 * @param  {Number} operation       [description]
	 * @return {Boolean}                [description]
	 */
	static setDesksBoundaries(desksInScreen, panelLayoutSize, event) {
		let desksInScreenBackup = desksInScreen,
			desksSizes = null,
			desksInContainer,
            setLargeDeskBound = false,
            deskSizeIsFine = false,
            countLoop = 0;
		
		while( !deskSizeIsFine && countLoop < 10 ) {
			desksInContainer = desksInScreen;

			if ( Core.Utils.isPrimeNumber( desksInScreen ) && desksInScreen !== 1 && desksInScreen !== 2 ) {            
	            desksInContainer = desksInScreen - 1;  

	            setLargeDeskBound = true;  
			} 	

			desksSizes = this.setSizeForDesksBoundaries( desksInScreen, desksInContainer, panelLayoutSize );

			if ( ( desksSizes[1].width > Core.MIN_DESK_SIZE && desksSizes[1].height > Core.MIN_DESK_SIZE ) ||
				  event === undefined ) {
				deskSizeIsFine = true;
			} else {
				setLargeDeskBound = false;
			}

			if ( event !== undefined ) {
				desksInScreen += event.options.operation;				
			}

			if ( countLoop === 8 ) {
				desksInScreen = desksInScreenBackup - 1;
			}

			countLoop++;			
		}		

    	new Core.Layout.DesksBoundaries.Bounding(...desksSizes, desksInContainer).initBoundaries();

    	return setLargeDeskBound;
	}

	/**
	 * [setSizeForDesksBoundaries description]
	 * @param  {Integer} desksInScreen    [description]
	 * @param  {Integer} desksInContainer [description]
	 * @param  {Object} panelLayoutSize   [description]
	 * @return {Object}                   [description]
	 */
	static setSizeForDesksBoundaries(desksInScreen, desksInContainer, panelLayoutSize) {
		let columns, rows, largeDeskWidth;  

		if ( desksInScreen === 1 ) {
			[columns, rows] = [1, 1];
		} else if ( desksInScreen === 2 ) {
			[columns, rows] = [2, 1];
		} else if ( desksInScreen === 3 ) {
			[columns, rows] = [1, 2];
		} else if ( desksInScreen > 3 ) {
			[columns, rows] = Core.Utils.getTheCoupleOfFactorsWidthLowerDiff( desksInContainer );
		}

		if ( desksInScreen === desksInContainer ) {
			largeDeskWidth = 0;
		} else {
			largeDeskWidth = Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.width * 0.4 );			
		}
		
		return [
			{
				width: Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.width - largeDeskWidth ),
				height: Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.height )
			},
			{
				width: Core.Utils.getNumberWithTwoDecimalsTruncated( ( panelLayoutSize.width - largeDeskWidth ) / columns ),
				height: Core.Utils.getNumberWithTwoDecimalsTruncated( panelLayoutSize.height / rows )
			} 
		];
	}

	/**
	 * [addLargeDeskToDeskBoundaries description]
	 * @param  {Integer} desksInScreen  [description]
	 * @param  {Array} desksBoundaries  [description]
	 * @param  {Object} panelLayoutSize [description]
	 * @return {Array}                  [description]
	 */
	static addLargeDeskToDesksBoundaries(desksInScreen, desksBoundaries, panelLayoutSize) {
		let columns, rows, deskBound = Core.Utils.boundToFloat( desksBoundaries[0] );

    	if ( desksInScreen === 3 ) {
    		[columns, rows] = [1, 2];
    	} else if ( desksInScreen > 3 ) {
    		[columns, rows] = Core.Utils.getTheCoupleOfFactorsWidthLowerDiff( desksInScreen - 1 );
    	}

    	desksBoundaries.push(Core.Utils.boundToString({
    		width: panelLayoutSize.width - ( deskBound.width * columns ),
    		height: deskBound.height * rows,
    		left: deskBound.width * columns,
    		top: 0
    	}));

    	return desksBoundaries;
    }

    /**
     * [resizeDesksBoundaries description]
     * @param  {Array} desksBoundaries      [description]
     * @param  {Object} panelLayoutSize     [description]
     * @param  {Object} lastPanelLayoutSize [description]
     * @return {Object}                     [description]
     */
    static resizeDesksBoundaries(desksBoundaries, panelLayoutSize, lastPanelLayoutSize) {
    	let panelLayoutSizeChangeRatio = {
    		width: panelLayoutSize.width / lastPanelLayoutSize.width,
    		height: panelLayoutSize.height / lastPanelLayoutSize.height
    	};

		for ( let i = 0; i < desksBoundaries.length; i++ ) {
            let deskBound = Core.Utils.boundToFloat( desksBoundaries[i] ); 

			desksBoundaries[i] = Core.Utils.boundToString({
				width: deskBound.width * panelLayoutSizeChangeRatio.width,
				height: deskBound.height * panelLayoutSizeChangeRatio.height,
				left: deskBound.left * panelLayoutSizeChangeRatio.width,
				top: deskBound.top * panelLayoutSizeChangeRatio.height
			});
		}

		return desksBoundaries;
    }

    /**
     * [mergeDesksBoundaries description]
     * @param  {Array} desksBoundaries [description]
     * @param  {Object} desksSelected  [description]
     * @return {Boolean|Object}        [description]
     */
    static mergeDesksBoundaries(desksBoundaries, desksSelected) {
    	let firstDeskSelected = Core.Utils.boundToFloat( desksSelected[ Object.keys( desksSelected )[0] ] ),
  			lastDeskSelected = Core.Utils.boundToFloat( desksSelected[ Object.keys( desksSelected )[1] ] ),
  			newDeskBound = {},  			
  			newDesksBoundaries = [],
  			newDeskBoundAdded = false,
  			desksIntersected = false;

  		if ( firstDeskSelected.left <= lastDeskSelected.left ) {
  			newDeskBound.left = firstDeskSelected.left;
  			newDeskBound.width = lastDeskSelected.left + lastDeskSelected.width - newDeskBound.left;
  		} else {
  			newDeskBound.left = lastDeskSelected.left;
  			newDeskBound.width = firstDeskSelected.left + firstDeskSelected.width - newDeskBound.left;
  		}

  		if ( firstDeskSelected.top <= lastDeskSelected.top ) {
  			newDeskBound.top = firstDeskSelected.top;
  			newDeskBound.height = lastDeskSelected.top + lastDeskSelected.height - newDeskBound.top;
  		} else {
  			newDeskBound.top = lastDeskSelected.top;
  			newDeskBound.height = firstDeskSelected.top + firstDeskSelected.height - newDeskBound.top;
  		}  		

  		newDeskBound = Core.Utils.boundToString( newDeskBound );

  		for ( let i = 0; i < desksBoundaries.length; i++ ) {
  			if ( desksBoundaries[i].left === newDeskBound.left && desksBoundaries[i].top === newDeskBound.top ) {
  				newDesksBoundaries.push( newDeskBound );
  				newDeskBoundAdded = true;
  			} else if ( !Core.Utils.isInsideOfBox( newDeskBound, desksBoundaries[i] ) ) {
                newDesksBoundaries.push( desksBoundaries[i] );                

                if ( Core.Utils.isIntersectionOfBox( newDeskBound, desksBoundaries[i] ) ) {
                	desksIntersected = true;

                	break;
                }
            }
  		}

  		if ( newDeskBoundAdded && !desksIntersected ) {
  			return newDesksBoundaries;		
  		}  

  		return false;		
    }

    /**
     * [desksResizablesDetection description]
     * @param  {Object} mouseCoords     [description]
     * @param  {Array} desksBoundaries  [description]
     * @param  {Object} panelLayoutSize [description]
     * @return {Boolean|Object}         [description]
     */
    static desksResizablesDetection(mouseCoords, desksBoundaries, panelLayoutSize) {
    	let columns = { desksBoundariesToResize: { oneSide: {}, otherSide: {} }, nextBoundaries: {} },
    		rows = { desksBoundariesToResize: { oneSide: {}, otherSide: {} }, nextBoundaries: {} };

        for ( let i = 0; i < desksBoundaries.length; i++ ) {
            let deskBound = Core.Utils.boundToFloat( desksBoundaries[i] ),
            	isDeskResizable;

            isDeskResizable = this.getDeskToResize( 
            	deskBound, 
            	mouseCoords.left, 
            	deskBound.left, 
            	panelLayoutSize.width 
        	);

            if ( isDeskResizable ) {
            	rows.desksBoundariesToResize.oneSide[i] = isDeskResizable.deskBound;
            	rows.nextBoundaries[i] = isDeskResizable.nextBound;
            }

            isDeskResizable = this.getDeskToResize( 
            	deskBound, 
            	mouseCoords.left, 
            	deskBound.left + deskBound.width, 
            	panelLayoutSize.width 
        	);

            if ( isDeskResizable ) {
            	rows.desksBoundariesToResize.otherSide[i] = isDeskResizable.deskBound;
            }

            isDeskResizable = this.getDeskToResize( 
            	deskBound, 
            	mouseCoords.top, 
            	deskBound.top, 
            	panelLayoutSize.height 
        	);

            if ( isDeskResizable ) {
            	columns.desksBoundariesToResize.oneSide[i] = isDeskResizable.deskBound;
            	columns.nextBoundaries[i] = isDeskResizable.nextBound;
            }

            isDeskResizable = this.getDeskToResize( 
            	deskBound, 
            	mouseCoords.top, 
            	deskBound.top + deskBound.height, 
            	panelLayoutSize.height 
        	);

            if ( isDeskResizable ) {
            	columns.desksBoundariesToResize.otherSide[i] = isDeskResizable.deskBound;
            }
        }

        columns.boundLimits = this.getBoundLimits( 
        	desksBoundaries, 
        	columns.desksBoundariesToResize, 
        	"top", 
        	"height" 
    	); 
        
        rows.boundLimits = this.getBoundLimits( 
        	desksBoundaries, 
        	rows.desksBoundariesToResize, 
        	"left", 
        	"width" 
    	);

        if ( Object.keys( columns.desksBoundariesToResize.oneSide ).length > 0 
        	 || Object.keys( rows.desksBoundariesToResize.oneSide ).length > 0 ) {
        	return {
        		columns, 
        		rows
        	}
        }

        return false;
    }

    /**
     * [getDeskToResize description]
     * @param  {Object} deskBound  [description]
     * @param  {Number} mouseCoord [description]
     * @param  {Number} bound      [description]
     * @param  {Number} maxSize    [description]
     * @return {Boolean|Object}    [description]
     */
    static getDeskToResize(deskBound, mouseCoord, bound, maxSize) {
    	if ( mouseCoord >= ( bound - 10 ) && mouseCoord <= ( bound + 10 ) && bound > 0 && bound < maxSize ) {
            return {
            	deskBound,
            	nextBound: {
            		width: deskBound.left + deskBound.width,
					height: deskBound.top + deskBound.height
            	}
        	};      
        } 

        return false;
    }

    static getBoundLimits(desksBoundaries, desksBoundariesToResize, minBound, maxBound) {
    	if ( Object.keys( desksBoundariesToResize.oneSide ).length > 0 ) {
    		let bound = desksBoundariesToResize.oneSide[Object.keys( desksBoundariesToResize.oneSide )[0]],
	    		diffBound = {},
	    		boundLimits = {};

	    	for ( let i = 0; i < desksBoundaries.length; i++ ) {
	    		let deskBound = Core.Utils.boundToFloat( desksBoundaries[i] );

	    		if ( bound[minBound] > deskBound[minBound] ) {
	    			if ( diffBound[minBound] === undefined || 
	    				 diffBound[minBound] > bound[minBound] - deskBound[minBound] ) {
	    				diffBound[minBound] = bound[minBound] - deskBound[minBound];
	    				boundLimits[minBound] = deskBound[minBound] + Core.MIN_DESK_SIZE;
	    			}
	    		}

	    		if ( bound[minBound] < deskBound[minBound] + deskBound[maxBound] ) {
	    			let newDiffBound = deskBound[minBound] + deskBound[maxBound] - diffBound[minBound];

	    			if ( diffBound[maxBound] === undefined || 
	    				 diffBound[maxBound] > newDiffBound ) {
	    				diffBound[maxBound] = newDiffBound;
	    				boundLimits[maxBound] = deskBound[minBound] + deskBound[maxBound] - Core.MIN_DESK_SIZE;
	    			}
	    		}
	    	}

	    	return boundLimits;
    	}  

    	return false;  	
    }

    /**
     * [getDesksBoundariesResized description]
     * @param  {Object} mouseCoords    [description]
     * @param  {Array} desksBoundaries [description]
     * @param  {Object} desksToResize  [description]
     * @return {Object}                [description]
     */
    static getDesksBoundariesResized(mouseCoords, desksBoundaries, desksToResize) {
    	desksBoundaries = this.setDesksBoundariesResized(
    		mouseCoords,
    		desksBoundaries,
    		desksToResize.rows.desksBoundariesToResize,
    		desksToResize.rows.nextBoundaries,
    		desksToResize.rows.boundLimits,
			["left", "width"]
		);

		desksBoundaries = this.setDesksBoundariesResized(
    		mouseCoords,
    		desksBoundaries,
    		desksToResize.columns.desksBoundariesToResize,
    		desksToResize.columns.nextBoundaries,
    		desksToResize.columns.boundLimits,
			["top", "height"]
		);

    	return desksBoundaries;
    }

    /**
     * [setDesksBoundariesResized description]
     * @param  {Object} mouseCoords    [description]
     * @param  {Array} desksBoundaries [description]
     * @param  {Array} dataForResize   [description]
     * @return {Object}                [description]
     */
    static setDesksBoundariesResized(mouseCoords, desksBoundaries, ...dataForResize) {
    	let desksBoundariesToResize = dataForResize[0],
    		nextBoundaries = dataForResize[1],
    		boundLimits = dataForResize[2],
    		bound = dataForResize[3];

		for ( let i in desksBoundariesToResize.oneSide ) {
			desksBoundaries[i] = Core.Utils.boundToFloat( desksBoundaries[i] );

        	if ( mouseCoords[bound[0]] > boundLimits[bound[1]] ) {                		
        		desksBoundaries[i][bound[1]] = nextBoundaries[i][bound[1]] - desksBoundaries[i][bound[0]];
        		desksBoundaries[i][bound[0]] = boundLimits[bound[1]];
        	} else if ( mouseCoords[bound[0]] < boundLimits[bound[0]] ) {
        		desksBoundaries[i][bound[1]] = nextBoundaries[i][bound[1]] - boundLimits[bound[0]];
        		desksBoundaries[i][bound[0]] = boundLimits[bound[0]];
        	} else {
        		desksBoundaries[i][bound[1]] = nextBoundaries[i][bound[1]] - mouseCoords[bound[0]];                	 
        		desksBoundaries[i][bound[0]] = mouseCoords[bound[0]];    
        	}  

        	desksBoundariesToResize.oneSide[i] = desksBoundaries[i];

        	desksBoundaries[i] = Core.Utils.boundToString( desksBoundaries[i] );
		}

		for ( let i in desksBoundariesToResize.otherSide ) {
			desksBoundaries[i] = Core.Utils.boundToFloat( desksBoundaries[i] );

            if ( mouseCoords[bound[0]] > boundLimits[bound[1]] ) {
        		desksBoundaries[i][bound[1]] = boundLimits[bound[1]] - desksBoundaries[i][bound[0]];
        	} else if ( mouseCoords[bound[0]] < boundLimits[bound[0]] ) {
        		desksBoundaries[i][bound[1]] = boundLimits[bound[0]] - desksBoundaries[i][bound[0]];
        	} else {
        		desksBoundaries[i][bound[1]] = mouseCoords[bound[0]] - desksBoundaries[i][bound[0]];                		
        	}  

        	desksBoundariesToResize.otherSide[i] = desksBoundaries[i];

        	desksBoundaries[i] = Core.Utils.boundToString( desksBoundaries[i] );
		}

        return desksBoundaries;
    }
}