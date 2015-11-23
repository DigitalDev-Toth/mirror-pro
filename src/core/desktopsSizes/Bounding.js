require("babel-polyfill");
var co = require('co');

import { Rect } from "./Rect";
import { Node } from "./Node";

/**
 * 
 */
export class Bounding {

    /**
     * [constructor description]
     * @param  {Number} containerWidth  [description]
     * @param  {Number} containerHeight [description]
     * @param  {Number} desktopWidth    [description]
     * @param  {Number} desktopHeight   [description]     
     */
    constructor(containerWidth, containerHeight, desktopWidth, desktopHeight) {
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
        this.desktopWidth = desktopWidth;
        this.desktopHeight = desktopHeight;

        this.totalArea = this.containerWidth * this.containerHeight;
        this.filledArea = 0;

        this.startNode = new Node();
        this.startNode.rect = new Rect(0, 0, this.containerWidth, this.containerHeight);

        this.bounds = [];
    }

    /**
     * [getBounds description]
     * @return {Object} [description]
     */
    getBounds() {
        let a = setTimeout(this.runGenerator(this.iteration.bind( this )), 100);

        console.log(a);
    }

    /**
     * [iteration description]
     * @return {Object} [description]
     */
    *iteration() {
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

        if( this.totalArea - this.filledArea ) {
            yield setTimeout(this.runGenerator(this.iteration.bind( this )), 100);
        } else {
            return this.bounds;
        }
    }

    // A generator function runner
    runGenerator(generatorFunction) {

        // recursive next()
        let next = function (err, arg) {

            // if error - throw and error
            if (err) return it.throw(err);

            // cache it.next(arg) as result
            var result = it.next(arg);

            console.log(result);

            // are we done?
            if (result.done) return;

            // result.value should be our callback() function from the XHR request
            if (typeof result.value == 'function') {
                // call next() as the callback()
                result.value(next);
            } else {
                // if the response isn't a function
                // pass it to next()
                next(null, result.value);
            }
        }

        // create the iterator
        let it = generatorFunction();
        return next();
    }
}