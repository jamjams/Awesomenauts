game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image:"player",
			/*telling the screen how much space to preserve*/
			width: 64,
			height: 64,
			/*spritewidth and height are passing us information. telling us the size of image*/
			spritewidth: "64",
			spriteheight: "64",
			getShpape: function(){
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
		//velocity represents current position
		this.body.setVelocity(5, 20);	
	},

	update: function(delta){
		if(me.input.isKeyPressed("right")){
			/*adds to the position of my x by the velocity defined above in 
			setVelocity() and multiplying it by me.time.tick.
			me.time.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x = me.timer.tick;
		}else{
			this.body.vel.x = 0;
		}
		this.body.update(delta);
		return true;
	}	

});
			