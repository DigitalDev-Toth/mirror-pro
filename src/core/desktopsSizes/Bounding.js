import { Core } from "../../core";
import { Rect } from "./Rect";
import { Node } from "./Node";

/**
 * 
 */
export class Bounding {

    /**
     * [constructor description]
     * @param  {Object} containerSize          [description]
     * @param  {Object} desktopSize            [description] 
     * @param  {Integer} desktopsInContainer   [description]    
     */
    constructor(containerSize, desktopSize, desktopsInContainer) {
        this.containerWidth = containerSize.width;
        this.containerHeight = containerSize.height;
        this.desktopWidth = desktopSize.width;
        this.desktopHeight = desktopSize.height;

        this.desktopsInContainer = desktopsInContainer;

        this.totalArea = this.containerWidth * this.containerHeight;
        this.filledArea = 0;

        this.startNode = new Node();
        this.startNode.rect = new Rect( 0, 0, this.containerWidth, this.containerHeight );

        this.bounds = [];
    }

    /**
     * [getBounds description]
     * @return {Object} [description]
     */
    initBounds() {
        this.iteration();
    }

    /**
     * [iteration description]
     * @return {Object} [description]
     */
    iteration() {
        let rect = new Rect( 0, 0, this.desktopWidth, this.desktopHeight ),
            node = this.startNode.addRect( rect );

        if( node ) {
            let bound = node.rect;

            this.bounds.push({
                width: `${ bound.width }px`,
                height: `${ bound.height }px`,
                left: `${ bound.left }px`,
                top: `${ bound.top }px`
            });

            this.filledArea += bound.width * bound.height;
        }

        if( this.desktopsInContainer === this.bounds.length ) {
            Core.VARS.desktopsSizes = this.bounds;
            Core.Events.CustomEvents.dispatchDesktopsBoundingFinish( window );

            return this.bounds;
        } else {
            setTimeout( this.iteration.bind( this ), 0 );
        }     
    }
}