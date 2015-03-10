game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {
	/*setting up the title screen*/	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
		/*setting the key we need to press in order to start the game*/

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [270, 240, 300, 50, me.game.viewport.width, me.game.viewport.height]);
				this.font = new me.Font("Arial", 46, "purple");
				/*listing for the pointer to be down*/
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			draw: function(renderer){
				/*this where we set what is going to be printed out to the title screen and also setting the color of the text and what font the text is*/
				this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
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