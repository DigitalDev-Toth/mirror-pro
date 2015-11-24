import { Core } from "../../core";
import { Rect } from "./Rect";
import { Node } from "./Node";

/**
 * 
 */
export class Bounding {

    /**
     * [constructor description]
     * @param  {Number} containerWidth        [description]
     * @param  {Number} containerHeight       [description]
     * @param  {Number} desktopWidth          [description]
     * @param  {Number} desktopHeight         [description]  
     * @param  {Number} desktopsInContainer   [description]    
     */
    constructor(containerWidth, containerHeight, desktopWidth, desktopHeight, desktopsInContainer) {
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
        this.desktopWidth = desktopWidth;
        this.desktopHeight = desktopHeight;

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