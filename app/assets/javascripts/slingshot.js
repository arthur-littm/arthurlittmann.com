// MATTER.JS
function launchSlingshot() {

  var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  var myCanvas = document.getElementById('world'),
    Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Composites = Matter.Composites,
    Events = Matter.Events,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

  var engine = Engine.create(),
    world = engine.world;

  var render = Render.create({
    canvas: myCanvas,
    engine: engine,
    options: {
        width: screenWidth,
        height: 600,
        background: 'transparent',
        showVelocity: true,
        wireframes: false,
    }
  });


  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // add bodies
  // var cradle = Composites.newtonsCradle(230, 300, 7, 30, 200);
  //   World.add(world, cradle);
  //   Body.translate(cradle.bodies[0], { x: -180, y: -100 });
  var ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true }),
    rockOptions = { density: 0.004 },
    rock = Bodies.polygon(170, 450, 8, 20, rockOptions),
    anchor = { x: 170, y: 450 },
    elastic = Constraint.create({
      pointA: anchor,
      bodyB: rock,
      stiffness: 0.05
    });

    var pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 25, 40);
      });

    World.add(engine.world, [ground, pyramid, rock, elastic]);

    Events.on(engine, 'afterUpdate', function() {
      if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
        rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
        World.add(engine.world, rock);
        elastic.bodyB = rock;
      }
    });


  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
      }
    });
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);


  World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 50 },
    max: { x: 800, y: 600 }
  });

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function() {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    }
  };

}
