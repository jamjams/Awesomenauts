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
		this.facing = "right";
		/*following the player on the screen*/
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		/*when the action is done, the sprite tat is equal to the number is put into play*/
		this.renderable.addAnimation("idle", [78]);
		/*the image number are olny used when the action "walk" is played*/
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		/*this is the current animatio when no keys are pressed. the sprite is idle and standing still.*/
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
		this.renderable.setCurrentAnimation("idle");
	},



	update: function(delta){
		if(me.input.isKeyPressed("right")){
			/*adds to the position of my x by the velocity defined above in 
			setVelocity() and multiplying it by me.time.tick.
			me.time.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			this.flipX(true);
		}else if(me.input.isKeyPressed("left")){
			this.facing = "left";
			this.body.vel.x -=this.body.accel.x * me.timer.tick;
			this.flipX(false);
		
		}else{
			this.body.vel.x = 0;
		}

	if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){
		this.jumping = true;
		this.body.vel.y -=this.body.accel.y * me.timer.tick;
	}

	if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
				console.log(!this.renderable.isCurrentAnimation("attack"));
				/*sets the currents animation to attack and once that is over goes back to the idle animation*/
				this.renderable.setCurrentAnimation("attack", "idle");
				/*Makes it so that the next time we start this sequence we begin from the first animation,
				not whereever we left off when we switched to another animation*/
				this.renderable.setAnimationFrame();
			}
		}
		
		

		else if(this.body.vel.x !== 0) {
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}else{
			this.renderable.setCurrentAnimation("idle");
		}

		if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
				console.log(!this.renderable.isCurrentAnimation("attack"));
				/*sets the currents animation to attack and once that is over goes back to the idle animation*/
				this.renderable.setCurrentAnimation("attack", "idle");
				/*Makes it so that the next time we start this sequence we begin from the first animation,
				not whereever we left off when we switched to another animation*/
				this.renderable.setAnimationFrame();
			}
		}
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},
/*setting what is going to happen tothe player when it gets to the enemy base and also setting our own methods*/
	collideHandler: function(response){
		if(response.b.type==='EnemyBaseEntity'){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - reponse.b.pos.x;
			
/*what is going to happen when we are cgetting near the enemy base from the left*/
			if(ydif<-40 && xdif< 70 && xdif>-35){ 
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;

			}
			else if(xdif>35 && this.facing==='right' && xdif>0){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;
			}else if(xdif<70 && this.facing==='left' && xdif>0){
				this.body.vel.x = 0;
				this.body.vel.x = this.pos.x +1;
			}
		}
	}
});

/*seeting the player and enemy's bases*/
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
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		this.type = "PlayerBaseEntity";

		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");

	},

	update:function(delta){
		if(this.health<-0){
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;

	},

	onCollision: function(){

	}
});


game.EnemyBaseEntity = me.Entity.extend({
	init : function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height:100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				/*the how many pixels the rectangle is*/
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		this.type = "EnemyBaseEntity";
		/*fixing the two towers*/
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){
		if(this.health<-0){
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;

	},

	onCollision: function(){

	}
});

