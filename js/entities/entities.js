game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) {
		this.setSuper();
		this.setPlayerTimers();
		this.setAttributes();
		this.type = "PlayerEntity";
		this.setFlags();
		/*velocity represents current position*/
		
		/*following the player on the screen*/
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		this.addAnimation();
		/*when the action is done, the sprite tat is equal to the number is put into play*/
		this.renderable.setCurrentAnimation("idle");
	},
	/**/
	setSuper: function(){
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
	},

	setPlayerTimers: function(){
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime();
	},

	setAttributes: function(){
		this.health = game.data.playerHealth;
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		this.attack = game.data.playerAttack;
	},

	setFlags: function(){
		/*keeps track of which direction your character is going*/
		this.facing = "right";
		this.dead = false;
		this.attacking = false;
	},

	addAnimation: function(){
		this.renderable.addAnimation("idle", [78]);
		/*the image number are olny used when the action "walk" is played*/
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		/*this is the current animatio when no keys are pressed. the sprite is idle and standing still.*/
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
		
	},


	update: function(delta){
		this.now = new Date().getTime();

		this.dead = checkIfDead();

		this.checkKeyPressedAndMove();
	
		this.setAnimation();
		
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
			 Ereturn true;
	},

	checkIfDead: function(){
		if (this.health <= 0){
			return true;
		}
		return false;
	},

	checkKeyPressedAndMove: function(){
		if(me.input.isKeyPressed("right")){
			this.moveRight();
		}else if(me.input.isKeyPressed("left")){
			  this.moveLeft();
/*adding the jump function*/
		}else if (me.input.isKeyPressed('jump')) {
		if (!this.body.jumping && !this.body.falling) {
		this.jump();
		}
		}else{
		this.body.vel.x = 0;
		}

		this.attacking = me.input.isKeyPressed("attack");

	},

	moveRight: function(){
		/*adds to the position of my x by the velocity defined above in 
			setVelocity() and multiplying it by me.time.tick.
			me.time.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			this.flipX(true);
	},


	moveLeft: function(){
		this.body.vel.x -=this.body.accel.x * me.timer.tick;
		this.facing = "left";
		this.flipX(false);
	},

jump: function(){
	/*set current vel to the maximim defined value
	gravity will do the rest*/
	this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
	/*set the jumping flag*/
	this.body.jumping = true;
},

setAnimation: function(){
	if(this.attacking){
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
},

	loseHealth: function(damage){
		this.health = this.health - damage;
		console.log(this.health);
	},
/*setting what is going to happen tothe player when it gets to the enemy base and also setting our own methods*/
	collideHandler: function(response){
		if(response.b.type==='EnemyBaseEntity'){
			this.collideWithEnemyBase(response);
		}
		else if(response.b.type==='EnemyCreep'){
			this.collideWithEnemyCreep(response)''
		}
	},

	collideWithEnemyBase: function(response){
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;
			
/*what is going to happen when we are cgetting near the enemy base from the left*/
			if(ydif<-40 && xdif< 70 && xdif>-35){ 
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;

			}
			else if(xdif>-35 && this.facing==='right' && (xdif<0)){
				this.body.vel.x = 0;
			}else if(xdif<70 && this.facing==='left' && (xdif>0)){
				this.body.vel.x = 0;
			}

			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
				console.log("tower Hit");
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
			}
	},

	collideWithEnemyCreep: function(response){
		var xdif = this.pos.x - response.b.pos.x;
		var ydif = this.pos.y - response.b.pos.y;

		this.stopMovement(xdif);

		if(this.checkAttack(xdif, ydif)){

		},
			
	},

	stopMovement: function(xdif){
					/*keeping the enemy from going through the base*/
		if (xdif>0){
			/*pushing the player to the right if the x dif is greater than zero*/
				if(this.facing==="left"){
					this.body.vel.x - 0;
				}
				/*keeping track of which the player is facing*/
			}
			else
			{
				/*we can not do damage to the creep*/
				/*cant walk through the creep no matter what direction we are coming from*/
				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}
	},

	checkAttack: function(xdif, ydif){
		if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttack
				/*making sure that we can only kill the creep if the player is facing it*/
				&& (Math.abs(ydif) <=40) && (((xdif>0) && this.facing ==="left") || ((xdif<0) && this.facing==="right"))){
				
				this.lastHit = this.now;
				/*if the creeps health is less than pur attack, execute the code in our if statement */
				 
				 return true;
			}
	}
});