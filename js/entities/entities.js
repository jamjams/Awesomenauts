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
			getShape: function(){
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
		/*velocity represents current position*/
		this.body.setVelocity(5, 20);
		/*when the action is done, the sprite that is equal to the number is put into play*/
		this.renderable.addAnimation("idle", [78]);
		/*the image number are olny used when the action "walk" is played*/
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		/*this is the current animatio when no keys are pressed. the sprite is idle and standing still.*/
		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta){
		if(me.input.isKeyPressed("right")){
			/*adds to the position of my x by the velocity defined above in 
			setVelocity() and multiplying it by me.time.tick.
			me.time.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(true);
			/*this is the current animation when the "right" key is pressed.*/
			
		}else{
			this.body.vel.x = 0;
		}
		
		if(this.body.vel.x !== 0) {
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}else{
			this.renderable.setCurrentAnimation("idle");
		}

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

});

game.PlayerBaseEntity = me.Entity.extend({
	init : function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height:100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				/*the how many pixels the rectangle is*/
				return {new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
	},

	update:function(delta){
		if(this.health<-0){
			this.broken = true;
		}
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;

	},

	onCollision: function()
}});

