game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
/*loading the backgrounde tiles and the meta tiles to the map*/
{name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
{name: "meta-tiles", type: "image", src: "data/img/meta-tiles.png"},
{name: "player", type:"image", src: "data/img/orcSpear.png"},
{name: "tower", type:"image", src: "data/img/tower_round.svg.png"},	
{name: "creep1", type:"image", src: "data/img/brainmonster.png"},
{name: "exp-screen", type:"image", src: "data/img/loadpic.png"},
{name: "title-screen", type:"image", src: "data/img/awesomenauts title screen.png"},
{name: "gold-screen", type:"image", src: "data/img/spend.png"},
{name: "gloopcreep", type:"image", src: "data/img/gloop.png"},	
{name: "load-screen", type:"image", src: "data/img/loadpic.png"},
{name: "new-screen", type:"image", src: "data/img/newpic.png"},
	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
/*loading the level 1 map*/
{name: "level01", type: "tmx", src: "data/map/awesomenauts.tmx"},
	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	
{name: "blankSpace", type: "audio", src: "data/bgm/"},
	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];
