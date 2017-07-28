// MATTER.JS
function launchCandles() {

  var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  var myCanvas = document.getElementById('world'),
    Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World;

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

  var cradle = Composites.newtonsCradle(230, 300, 7, 30, 200);
    World.add(world, cradle);
    Body.translate(cradle.bodies[0], { x: -180, y: -100 });


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
