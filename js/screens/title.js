game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {
	/*setting up the title screen*/	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
		/*setting the key we need to press in order to start the game*/
		me.input.bindKey(me.input.KEY.ENTER, "start");

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
				this.font = new me.Font("Arial", 46, "white");
			},

			draw: function(renderer){
				/*this where we set what is going to be printed out to the title screen and also setting the color of the text and what font the text is*/
				this.font.draw(renderer.getContext(), "Awesomenauts!", 450, 130);
				/*stylizing the Press enter to play text. telling you how to start the game*/
				this.font.draw(renderer.getContext(), "Press ENTER to play!", 250, 530);
			}
		})));

		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
			/*when you start the game this what is going to happen*/
			if(action == "start"){
				me.state.change(me.state.PLAY);
			}
		});

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.event.unsubscribe(this.handler); // TODO
	}
});
