import { Rect } from "./Rect";

/**
 * 
 */
export class Node {

    /**
     * [constructor description]
     */
    constructor() {
        this.left = null;
        this.right = null;
        this.rect = null;
        this.filled = false;
    }

    /**
     * [addRect description]
     * @param  {Object} rect [description]
     * @return {Object}      [description]
     */
    addRect(rect) {
        if( this.left != null ) {
            return this.left.addRect( rect ) || this.right.addRect( rect );
        }

        if( this.filled ) {
            return null;
        }

        if( !rect.fitsIn( this.rect ) ) {
            return null;
        }

        if( rect.sameSizeAs( this.rect ) ) {
            this.filled = true;
            return this;
        }

        this.left = new Node();
        this.right = new Node();

        let widthDiff = this.rect.width - rect.width,
            heightDiff = this.rect.height - rect.height,
            current = this.rect;
    
        if( widthDiff > heightDiff ) {
            this.left.rect = new Rect( current.left, current.top, rect.width, current.height );
            this.right.rect = new Rect( current.left + rect.width, current.top, current.width - rect.width, current.height );
        } else {
            this.left.rect = new Rect( current.left, current.top, current.width, rect.height );
            this.right.rect = new Rect( current.left, current.top + rect.height, current.width, current.height - rect.height );
        }

        return this.left.addRect( rect );
    }
}