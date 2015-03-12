game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {
	/*setting up the title screen*/	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
		/*setting the key we need to press in order to start the game*/

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [10, 10, 300, 50, me.game.viewport.width, me.game.viewport.height]);
				this.font = new me.Font("Arial", 46, "purple");
				/*listing for the pointer to be down*/
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			draw: function(renderer){
				/*this where we set what is going to be printed out to the title screen and also setting the color of the text and what font the text is*/
				this.font.draw(renderer.getContext(), "PRESS f1-f4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "CURRENT EXP" + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
				this.font.draw(renderer.getContext(), "F1: INCREMENT GOLD PRODUCTION " + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 100);
				this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD " + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 15);
				this.font.draw(renderer.getContext(), "F3: INCREADE ATTACK DAMAGE " + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH " + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 250);
				/*stylizing the Press enter to play text. tellng you how to start the game*/	
			}
		})));

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	}
});