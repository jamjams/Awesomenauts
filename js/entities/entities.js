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
		this.type = "PlayerEntity";
		this.health = game.data.playerHealth;
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		this.facing = "right";
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.dead = false;
		this.lastAttack = new Date().getTime();
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
		this.now = new Date().getTime();


		if (this.health <= 0){
			this.dead = true;
			this.pos.x = 10;
			this.pos.y = 0;
			this.health = game.data.playerHealth;
		}


		if(me.input.isKeyPressed("right")){
			/*adds to the position of my x by the velocity defined above in 
			setVelocity() and multiplying it by me.time.tick.
			me.time.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			this.flipX(true);
		}else if(me.input.isKeyPressed("left")){
			  

			this.body.vel.x -=this.body.accel.x * me.timer.tick;
			this.facing = "left";
			this.flipX(false);
/*adding the jump function*/
}else if (me.input.isKeyPressed('jump')) {
	if (!this.body.jumping && !this.body.falling) {
		/*set current vel to the maximim defined value
		gravity will do the rest*/
		this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
		/*set the jumping flag*/
		this.body.jumping = true;
	}
}else{
		this.body.vel.x = 0;
	}

	if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
				/*console.log(!this.renderable.isCurrentAnimation("attack"));*/
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

	loseHealth: function(damage){
		this.health = this.health - damage;
		console.log(this.health);
	},
/*setting what is going to happen tothe player when it gets to the enemy base and also setting our own methods*/
	collideHandler: function(response){
		if(response.b.type==='EnemyBaseEntity'){
			var xdif = this.pos.x - reponse.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;
			
/*what is going to happen when we are cgetting near the enemy base from the left*/
			if(ydif<-40 && xdif< 70 && xdif>-35){ 
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;

			}
			else if(xdif>35 && this.facing==='right' && xdif<0){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;
			}else if(xdif<70 && this.facing==='left' && xdif>0){
				this.body.vel.x = 0;
				this.body.vel.x = this.pos.x +1;
			}

			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
				console.log("tower Hit");
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
			}
		}
		else if(response.b.type==='EnemyCreep'){
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;
			/*keeping the enemy from going through the base*/
			if (xdif>0){
				/*pushing the player to the right if the x dif is greater than zero*/
				tihs.pos.x = this.pos.x + 1;
				if(this.facing==="left"){
					this.body.vel.x - 0;
				}
				/*keeping track of which the player is facing*/
			}
			else
			{
				/*we can not do damage to the creep*/
				/*cant walk through the creep no matter what direction we are coming from*/
				this.pos.x = this.pos.x - 1;
				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttack
				/*making sure that we can only kill the creep if the player is facing it*/
				&& (Math.abs(ydif) <=40) && (((xdif>0) && this.facing ==="left") || ((xdif<0) && this.facing==="right"))){
				
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
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
		this.health = game.data.playerHealth;
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

	loseHealth: function(damage){
		this.health = this.health - damage;
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
		this.health = game.data.enemyBaseHealth;
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

	},

	loseHealth: function(){
		this.health--;
	}
});
/*setting the properties for the enemy creep and setting the actions for it also*/
game.EnemyCreep = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "creep1",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",
			getShape: function(){
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}
		}]);
		this.health = game.data.enemyCreepHealth;
		this.alwaysUpdate = true;
		/*this.attacking lets us know if the enemy is currently attacking*/
		this.attacking = false;
		/*keeps traack of when our creep last attacked anything*/
		this.lastAttacking = new Date().getTime();
		/*keep track of the last time our creep hit anything*/
		this.lastHit = new Date().getTime()
		this.now = new Date().getTime();
		this.body.setVelocity(3,20);
		this.type = "EnemyCreep";
		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
	},

	update: function(delta){
		console.log(this.health);
		if (this.health <= 0) {
			me.game.world.removeChild(this);
		};


/*making the creeps move across the screen*/
		this.now = new Date().getTime();
		
		this.body.vel.x -= this.body.accel.x  * me.timer.tick;

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);




		this._super(me.Entity, "update", [delta]);
		return true;
	},

	collideHandler: function(response){
		if(response.b.type==='PlayerBaseEntity'){
			this.attacking=true;
			/*this.lastAttacking=this.now;*/
			this.body.vel.x = 0;
			/*keeps moving the creep to the right to maintain its position*/
			this.pos.x = this.pos.x + 1;
			/*checks that it has been at least 1 second since this creep hit a base*/
			if((this.now-this.lastHit >=1000)){
				/*updates the lasthit timer*/
				this.lastHit = this.now;
				/*makes the player base call its loseHealth functin and passes it a damage of 1*/
				response.b.loseHealth(game.data.enemyCreepAttack);
			}
		}else if(response.b.type==='PlayerEntity'){
			var xdif = this.pos.x - response.b.pos.x;

			this.attacking=true;
			/*this.lastAttacking=this.now;*/
			/*keeps moving the creep to the right to maintain its position*/
			if(xdif>0){
				
				this.pos.x = this.pos.x + 1;
				this.body.vel.x = 0;
			}
			
			this.pos.x = this.pos.x + 1;
			/*checks that it has been at least 1 second since this creep hit something*/
			if((this.now-this.lastHit >=1000) && xdif>0){
				/*updates the lasthit timer*/
				this.lastHit = this.now;
				/*makes the player call its loseHealth functin and passes it a damage of 1*/
				response.b.loseHealth(1);
			}
		}
	}

});
/*setting the timer for when the creep will spawn and attack the player.*/
game.GameManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();

		this.alwaysUpdate = true;
	},

	update: function(){
		this.now = new Date().getTime();

		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			this.lastCreep = this.now;
			var creep = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creep, 5);
		}
		return true;
	}
});
