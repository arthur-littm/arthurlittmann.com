// MATTER.JS
function launchMatterJs() {

  var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  var myCanvas = document.getElementById('world'),
    Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
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
      showAngleIndicator: false,
      wireframes: false,
      background: 'transparent',
    }
  });

  Render.run(render);



  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // add bodies
  var stack = Composites.stack(50, 185, 14, 10, 10, 0, function(x, y) {
      return Bodies.circle(x, y, 20);
  });

  World.add(world, [
    // walls
    // Bodies.rectangle(400, 0, 800, 10, { isStatic: true }), // top
    Bodies.rectangle(400, 600, 800, 5, { isStatic: true, render: {
       fillStyle: 'transparent',
       lineWidth: 0
      }
    }), // bottom
    // Bodies.rectangle(800, 300, 50, 0, { isStatic: true }), // right
    // Bodies.rectangle(0, 300, 50, 600, { isStatic: true }), // left
    stack
  ]);

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
      min: { x: 0, y: 0 },
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
