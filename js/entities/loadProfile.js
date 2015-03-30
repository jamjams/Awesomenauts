game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {
	/*setting up the title screen*/	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); // TODO

		me.input.bindKey(me.input.KEY.B);
		me.input.bindKey(me.input.KEY.Q);
		me.input.bindKey(me.input.KEY.E);
		me.input.bindKey(me.input.KEY.W);
		me.input.bindKey(me.input.KEY.A);
		/*setting the key we need to press in order to start the game*/

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [10, 10, 300, 50, me.game.viewport.width, me.game.viewport.height]);
				this.font = new me.Font("Arial", 26, "white");
				/*listing for the pointer to be down*/
			},

			draw: function(renderer){
				/*this where we set what is going to be printed out to the title screen and also setting the color of the text and what font the text is*/
				this.font.draw(renderer.getContext(), "ENTER YOUR USERNAME AND PASSWORD", this.pos.x, this.pos.y);
			}
		})));
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	}
});