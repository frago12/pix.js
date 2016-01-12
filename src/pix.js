(function(undefined) {
    
    var pix = Object.create(null);
    
    var pix_canvas = null;
    var pix_context = null;
    var pix_image = null;
    var pix_modules = {};
    
    pix.create = function create( img, elementId ) {
        pix_image = img;
        
        createCanvas();
        
        var contatiner = document.getElementById(elementId);
        contatiner.appendChild( pix_canvas );
        
        // var m = this.matrix.init(img.width, img.height, pix_modules.rgb.getData());
        
        return Object.create(pix_modules);
    }
    
    pix.module = function module(name, config, alias) {
        if (!name || !config) return;
        
        Object.assign(config, {
            pix: requestObject
        });
        
        pix_modules[alias || name] = config;
    }
    
    pix.dataType = function dataType(name, obj) {
        if (!name || !obj) return;
        
        this[name] = obj;
    }
    
    function createCanvas() {
        pix_canvas = document.createElement('canvas');
        pix_context = pix_canvas.getContext('2d');
        
        pix_canvas.width = pix_image.width;
        pix_canvas.height = pix_image.height;
        
        pix_context.drawImage(pix_image, 0, 0);
    }
    
    function requestObject( name ) {
        switch(name) {
            case 'context':
                return pix_context;
            case 'canvas':
                return pix_canvas;
            case 'image':
                return pix_image;
            case 'matrix':
                return pix.matrix;
            default:
                return null;
        }
    }
    
    window.pix = pix;
})();