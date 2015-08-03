/**
 * @file        Webgl filters
 * @author      Toth Limitada <contacto@toth.cl>
 * @copyright   2015 Toth Limitada
 * @license     {@link http://www.toth.cl}
 */

var FILTER = {
    'shader_fragment_windowLevel': 
        'precision lowp float; '+
        'varying vec2 vTextureCoord; '+
        'uniform sampler2D uSampler; '+
        'uniform highp float uLowerBound; '+
        'uniform highp float uUpperBound; '+
        'uniform highp float uNegative; '+
        'uniform highp float uBrightness; '+
        'uniform highp float uContrast; '+
        'void main (void) { '+
            'vec4 pixelColor = texture2D (uSampler, vTextureCoord); '+ 
            'highp float localizer = 0.0; '+
            'if (pixelColor.g == 1.0) { '+
                'if (pixelColor.r == 0.0 && pixelColor.b == 0.0) { '+
                    'localizer = 1.0; '+
                '} '+
            '} '+
            'if (localizer == 0.0) {'+
                'highp float intensity = pixelColor.r * (uUpperBound - uLowerBound) + uLowerBound; '+
                'highp float windowCenter = (1.0 - uBrightness / 1.0) * (255.0) + 0.0; '+
                'highp float windowWidth = (1.0 - uContrast / 1.0) * (255.0); '+
                'highp float lowerBound = windowWidth * (-0.5) + windowCenter; '+
                'highp float upperBound = windowWidth * (0.5) + windowCenter; '+
                'highp float rgb = (intensity - lowerBound) / (upperBound - lowerBound); '+
                'pixelColor.r = rgb; '+
                'pixelColor.g = rgb; '+
                'pixelColor.b = rgb; '+           
                'if (pixelColor.r > 1.0) { '+
                    'pixelColor.r = 1.0; '+
                '} else if(pixelColor.r < 0.0) { '+
                    'pixelColor.r = 0.0; '+
                '} '+
                'if (pixelColor.g > 1.0) { '+
                    'pixelColor.g = 1.0; '+
                '} else if (pixelColor.g < 0.0) { '+
                    'pixelColor.g = 0.0; '+
                '} '+
                'if (pixelColor.b > 1.0) { '+
                    'pixelColor.b = 1.0; '+
                '} else if (pixelColor.b < 0.0) { '+
                    'pixelColor.b = 0.0; '+
                '} '+                
            '} '+
            'if (uNegative > 0.0) { '+
                'pixelColor.r = 1.0 - pixelColor.r; '+
                'pixelColor.g = 1.0 - pixelColor.g; '+
                'pixelColor.b = 1.0 - pixelColor.b; '+
            '} '+
            'gl_FragColor = pixelColor; '+
        '}',
    'shader_fragment_brightnessContrast': 
        'precision lowp float; '+
        'varying vec2 vTextureCoord; '+
        'uniform sampler2D uSampler; '+
        'uniform highp float uNegative; '+
        'uniform highp float uMultiplier; '+
        'uniform highp float uAdder; '+
        'void main (void) { '+
            'vec4 pixelColor = texture2D (uSampler, vTextureCoord); '+ 
            'highp float localizer = 0.0; '+
            'if (pixelColor.g == 1.0) { '+
                'if (pixelColor.r == 0.0 && pixelColor.b == 0.0) { '+
                    'localizer = 1.0; '+
                '} '+
            '} '+
            'if (localizer == 0.0) {'+         
                'pixelColor.r = pixelColor.r * uMultiplier + uAdder; '+
                'pixelColor.g = pixelColor.g * uMultiplier + uAdder; '+
                'pixelColor.b = pixelColor.b * uMultiplier + uAdder; '+          
                'if (pixelColor.r > 1.0) { '+
                    'pixelColor.r = 1.0; '+
                '} else if(pixelColor.r < 0.0) { '+
                    'pixelColor.r = 0.0; '+
                '} '+
                'if (pixelColor.g > 1.0) { '+
                    'pixelColor.g = 1.0; '+
                '} else if (pixelColor.g < 0.0) { '+
                    'pixelColor.g = 0.0; '+
                '} '+
                'if (pixelColor.b > 1.0) { '+
                    'pixelColor.b = 1.0; '+
                '} else if (pixelColor.b < 0.0) { '+
                    'pixelColor.b = 0.0; '+
                '} '+                
            '} '+
            'if (uNegative > 0.0) { '+
                'pixelColor.r = 1.0 - pixelColor.r; '+
                'pixelColor.g = 1.0 - pixelColor.g; '+
                'pixelColor.b = 1.0 - pixelColor.b; '+
            '} '+
            'gl_FragColor = pixelColor; '+
        '}'    
};