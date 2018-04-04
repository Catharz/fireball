var g_resources = [
    // images
    {
        name: "iso-64x64-building",
        type: "image",
        src: "/game/iso-64x64-building.png"
    },
    {
        name: "iso-64x64-outside",
        type: "image",
        src: "/game/iso-64x64-outside.png"
    },
    {
        name: "player",
        type: "image",
        src: "/game/Blank_Sprite_Sheet_4_2_by_KnightYamato.png"
    },
    // TMX maps
    {
        name: "iso-64x64-building",
        type: "tsx",
        src: "/game/iso-64x64-building.json"
    },
    {
        name: "iso-64x64-outside",
        type: "tsx",
        src: "/game/iso-64x64-outside.json"
    },
    {
        name: "level_1",
        type: "tmx",
        src: "/game/level_1.json"
    }
];

var game = {

    /**
     * initlization
     */
    onload: function() {

        // init the video
        // if (!me.video.init((window.innerWidth / 3), (window.innerHeight / 3) - 12, {
        //         wrapper: "jsapp",
        //         // renderer: me.video.WEBGL, // For some reason this breaks the scaling
        //         antiAlias: true,
        //         doubleBuffering: true,
        //         scale: me.device.getPixelRatio() * 3
        //     })) {
        //     alert("Your browser does not support HTML5 canvas.");
        //     return;
        // }

        if (!me.video.init(window.innerWidth / 2, window.innerHeight / 2 - 12, {
            wrapper: "jsapp",
            renderer: me.video.WEBGL, // For some reason this breaks the scaling
            antiAlias: true,
            doubleBuffering: true,
            scale: "auto",
            scaleMethod: "fit"
        })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // setup the player
        me.game.data = {};

        // set all ressources to be loaded
        me.loader.preload(g_resources, this.loaded.bind(this));
    },


    /**
     * callback when everything is loaded
     */
    loaded: function() {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // set the fade transition effect
        me.state.transition("fade", "#FFFFFF", 250);

        // register our objects entity in the object pool
        me.pool.register("mainPlayer", game.PlayerEntity);
        game.PlayerEntity.animation = "walk_south";

        // switch to PLAY state
        me.state.change(me.state.PLAY);
    },



    /**
     *
     * change the current level
     * using the listbox current value in the HTML file
     */
    changelevel: function() {

        var level = "level_1";
        // var level_id = document.getElementById("level_name").value;

        // switch (level_id) {
        // case "1":
        //     level = "level_1";
        //     break;
        // case "2":
        //     level = "level_2";
        //     break;
        // default:
        //     return;
        // };

        // load the new level
        me.levelDirector.loadLevel(level);
    }

}; // game

game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init: function(x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        // disable gravity
        this.body.gravity = 0;

        // walking & jumping speed
        this.body.setVelocity(2.5, 2.5);
        this.body.setFriction(0.4, 0.4);

        // set the display around our position
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);

        // enable keyboard
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        // also use aswd
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.W, "up");
        me.input.bindKey(me.input.KEY.S, "down");

        // the main player spritesheet
        var texture = new me.video.renderer.Texture({
                framewidth: 32,
                frameheight: 32
            },
            me.loader.getImage("player")
        );

        // create a new sprite object
        this.renderable = texture.createAnimationFromName([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
            12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
            24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
            36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47
        ]);
        // define an additional basic walking animation
        this.renderable.addAnimation("walk_south", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        this.renderable.addAnimation("walk_west", [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
        this.renderable.addAnimation("walk_east", [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]);
        this.renderable.addAnimation("walk_north", [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]);

        this.animation = "walk_south";
        this.renderable.setCurrentAnimation("walk_south");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 0.5);

    },

    /**
     * update the entity
     */
    update: function(dt) {
        if (me.input.isKeyPressed("left")) {
            // update the entity velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.animation = "walk_west";
        } else if (me.input.isKeyPressed("right")) {
            // update the entity velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.animation = "walk_east";
        } else {
            this.body.vel.x = 0;
        }
        if (me.input.isKeyPressed("up")) {
            // update the entity velocity
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
            this.animation = "walk_north";
        } else if (me.input.isKeyPressed("down")) {
            // update the entity velocity
            this.body.vel.y += this.body.accel.y * me.timer.tick;
            this.animation = "walk_south";
        } else {
            this.body.vel.y = 0;
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        if (!this.renderable.isCurrentAnimation(this.animation)) {
            this.renderable.setCurrentAnimation(this.animation);
        }

        // check if we moved (an "idle" animation would definitely be cleaner)
        if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
            this._super(me.Entity, "update", [dt]);
            return true;
        }
    },

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision: function(response, other) {
        // Make all other objects solid
        return true;
    }
});

game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // load a level
        me.levelDirector.loadLevel("level_1");

        // display a basic tile selector
        me.game.world.addChild(new(me.Renderable.extend({
            /** Constructor */
            init: function() {
                // reference to the main layer
                this.refLayer = me.game.world.getChildByName("layer1")[0];

                // call the parent constructor using the tile size
                this._super(me.Renderable, 'init', [0, 0,
                    this.refLayer.tilewidth / 2,
                    this.refLayer.tileheight
                ]);

                this.anchorPoint.set(0, 0);

                // configure it as floating
                this.floating = true;

                // create a corresponding diamond polygon shape with an isometric projection
                this.diamondShape = this.clone().toPolygon().toIso();

                // currently selected tile
                this.currentTile = null;

                // simple font to display tile coordinates
                this.font = new me.Font("Arial", 10, "#FFFFFF");
                this.font.textAlign = "center";

                // dirty flag to enable/disable redraw
                this.dirty = false;

                this.isKinematic = false;

                // subscribe to pointer and viewport move event
                this.pointerEvent = me.event.subscribe("pointermove", this.pointerMove.bind(this));
                this.viewportEvent = me.event.subscribe(me.event.VIEWPORT_ONCHANGE, this.viewportMove.bind(this));
            },
            /** pointer move event callback */
            pointerMove: function(event) {
                var tile = this.refLayer.getTile(event.gameWorldX, event.gameWorldY);
                if (tile && tile !== this.currentTile) {
                    // get the tile x/y world isometric coordinates
                    this.refLayer.getRenderer().tileToPixelCoords(tile.col, tile.row, this.diamondShape.pos);
                    // convert thhe diamon shape pos to floating coordinates
                    me.game.viewport.worldToLocal(
                        this.diamondShape.pos.x,
                        this.diamondShape.pos.y,
                        this.diamondShape.pos
                    );
                    // store the current tile
                    this.currentTile = tile;
                };
            },
            /** viewport move event callback */
            viewportMove: function(pos) {
                // invalidate the current tile when the viewport is moved
                this.currentTile = null;
            },
            /** Update function */
            update: function(dt) {
                return (typeof(this.currentTile) === "object");
            },
            /** draw function */
            draw: function(renderer) {
                if (this.currentTile) {
                    // draw our diamond shape
                    renderer.save();
                    renderer.setColor("#FF0000");
                    renderer.drawShape(this.diamondShape);

                    renderer.setColor("#FFFFFF");
                    // draw the tile col/row in the middle
                    this.font.draw(
                        renderer,
                        "( " + this.currentTile.col + "/" + this.currentTile.row + " )",
                        this.diamondShape.pos.x,
                        (this.diamondShape.pos.y + (this.currentTile.height / 2) - 8)
                    );
                    renderer.restore();
                }
            }
        })));

        // register on mouse event
        me.input.registerPointerEvent("pointermove", me.game.viewport, function(event) {
            me.event.publish("pointermove", [event]);
        }, false);
    },

    /**
     *  action to perform on state change
     */
    onDestroyEvent: function() {
        // unsubscribe to all events
        me.event.unsubscribe(this.pointerEvent);
        me.event.unsubscribe(this.viewportEvent);
        me.input.releasePointerEvent("pointermove", me.game.viewport);
    }
});

//bootstrap :)
me.device.onReady(function() {
    game.onload();
});
