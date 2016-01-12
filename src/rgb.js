(function(undefined) {
    
    pix.module('rgb', {
        
        add: function add( img ) {
            if (!this.rgba) this.getData();
            
            var ctx = this.pix('context');
            var imageData = (img) ? ctx.getImageData(0, 0, img.width, img.height) : this.original.data;
            var i = 0;
            var len = this.rgba.data.length;
            
            for (; i < len; i+=4) {
                this.rgba.data[i] += imageData[i];
                this.rgba.data[i+1] += imageData[i+1];
                this.rgba.data[i+2] += imageData[i+2]; 
            }
        },
        
        substract: function substract( img ) {
            if (!this.rgba) this.getData();
            
            var ctx = this.pix('context');
            var imageData = (img) ? ctx.getImageData(0, 0, img.width, img.height) : this.original.data;
            var i = 0;
            var len = this.rgba.data.length;
            
            for (; i < len; i+=4) {
                this.rgba.data[i] -= imageData[i];
                this.rgba.data[i+1] -= imageData[i+1];
                this.rgba.data[i+2] -= imageData[i+2]; 
            }
        },
        
        invert: function invert() {
            if (!this.rgba) this.getData();
            
            var i = 0;
            var len = this.rgba.data.length;
            
            for (; i < len; i+=4) {
                this.rgba.data[i] = 255 - this.rgba.data[i];
                this.rgba.data[i+1] = 255 - this.rgba.data[i+1];
                this.rgba.data[i+2] = 255 - this.rgba.data[i+2]; 
            }
        },
        
        apply: function apply() {
            if (!this.rgba) return;
            
            var ctx = this.pix('context');
            ctx.putImageData(this.rgba, 0, 0);
            
        },
        
        getData: function getData() {
            if (!this.rgba) {
                var ctx = this.pix('context');
                var img = this.pix('image');
                var matrix = this.pix('matrix');
                
                this.rgba = ctx.getImageData(0, 0, img.width, img.height);
                this.original = {
                    width: this.rgba.width,
                    height: this.rgba.height,
                    data: this.rgba.data.slice(0)
                };
            }
            
            return this.rgba;
        }
        
    });
    
})();