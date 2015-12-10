import { Core } from "../../../core";
import { Rect } from "./Rect";
import { Node } from "./Node";

/**
 * 
 */
export class Bounding {

    /**
     * [constructor description]
     * @param  {Object} containerSize     [description]
     * @param  {Object} deskpSize         [description] 
     * @param  {Integer} desksInContainer [description]    
     */
    constructor(containerSize, deskSize, desksInContainer) {
        this.containerWidth = containerSize.width;
        this.containerHeight = containerSize.height;
        this.deskWidth = deskSize.width;
        this.deskHeight = deskSize.height;

        this.desksInContainer = desksInContainer;

        this.totalArea = this.containerWidth * this.containerHeight;
        this.filledArea = 0;

        this.startNode = new Node();
        this.startNode.rect = new Rect( 0, 0, this.containerWidth, this.containerHeight );

        this.bounds = [];
    }

    /**
     * [getBoundaries description]
     * @return {Object} [description]
     */
    initBoundaries() {
        this.iteration();
    }

    /**
     * [iteration description]
     * @return {Object} [description]
     */
    iteration() {
        let rect = new Rect( 0, 0, this.deskWidth, this.deskHeight ),
            node = this.startNode.addRect( rect );

        if( node ) {
            let bound = node.rect;

            this.bounds.push( Core.Utils.boundToString( bound ) );

            this.filledArea += bound.width * bound.height;
        }

        if( this.desksInContainer === this.bounds.length ) {
            Core.UI.desksBoundaries = this.bounds;
            Core.Events.CustomEvents.dispatchLayoutBoundariesFinish( window );

            return this.bounds;
        } else {
            setTimeout( this.iteration.bind( this ), 0 );
        }     
    }
}