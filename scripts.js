var testRactive = new Ractive({
  el: '#container',
  template: '#template',
  data: {
    square: {
      left: "0px",
      top: "0px",
      squareGrabbed: false,
      resizeTop: false,
      width: "50px",
      height: "50px"
    },
    parseStyles: function(square) {
      var parsedStyles = [];
      for (var i = 0; i < Object.keys(square).length; i++) {
        var style = Object.keys(square)[i];
        parsedStyles.push(style + ":" + square[style]);
      }
      return parsedStyles.join(";");
    }
  }
});

testRactive.off("pickup").on("pickup", function(event) {
  testRactive.set("square.squareGrabbed", true);

  testRactive.set("square.mouse_x", event.original.clientX);
  testRactive.set("square.mouse_y", event.original.clientY);
});

testRactive.off("getMousePosition").on("getMousePosition", function(event) {
  if (testRactive.get("square.squareGrabbed")) {
    console.log(event);
    var draggedObject = testRactive.find("#square");
    if (draggedObject) {
      var old_mouse_x = testRactive.get("square.mouse_x");
      var old_mouse_y = testRactive.get("square.mouse_y");

      var new_mouse_x = event.original.clientX;
      var new_mouse_y = event.original.clientY;

      var object_x = draggedObject.offsetLeft;
      var object_y = draggedObject.offsetTop;

      var new_object_x = object_x + (new_mouse_x - old_mouse_x);
      var new_object_y = object_y + (new_mouse_y - old_mouse_y);

      testRactive.set("square.mouse_x", new_mouse_x);
      testRactive.set("square.mouse_y", new_mouse_y);

      // when top resize is active
      if (testRactive.get("square.resizeTop")) {

        testRactive.set("square.height", parseFloat(testRactive.get("square.height")) - (new_mouse_y - old_mouse_y) + "px");

        if (new_object_y > 0 && (new_object_y + draggedObject.clientHeight) <= event.node.clientHeight) {
          testRactive.set("square.top", new_object_y + "px");
        }

      } else if (testRactive.get("square.resizeBottom")) {

        testRactive.set("square.height", parseFloat(testRactive.get("square.height")) + (new_mouse_y - old_mouse_y) + "px");

        if (new_object_y > 0 && (new_object_y + draggedObject.clientHeight) <= event.node.clientHeight) {
          testRactive.set("square.top", (new_object_y - (new_mouse_y - old_mouse_y)) + "px");
        }

      } else if (testRactive.get("square.resizeLeft")) {

        testRactive.set("square.width", parseFloat(testRactive.get("square.width")) - (new_mouse_x - old_mouse_x) + "px");

        if (new_object_x > 0 && (new_object_x + draggedObject.clientWidth) <= event.node.clientWidth) {
          testRactive.set("square.left", new_object_x + "px");
        }

      } else if (testRactive.get("square.resizeRight")) {

        testRactive.set("square.width", parseFloat(testRactive.get("square.width")) + (new_mouse_x - old_mouse_x) + "px");

        if (new_object_x > 0 && (new_object_x + draggedObject.clientWidth) <= event.node.clientWidth) {
          testRactive.set("square.left", (new_object_x - (new_mouse_x - old_mouse_x)) + "px");
        }

      } else if (testRactive.get("square.resizeTopLeft")) {

        testRactive.set("square.width", parseFloat(testRactive.get("square.width")) - (new_mouse_x - old_mouse_x) + "px");
        
        testRactive.set("square.height", parseFloat(testRactive.get("square.height")) - (new_mouse_y - old_mouse_y) + "px");

        if (new_object_x > 0 && (new_object_x + draggedObject.clientWidth) <= event.node.clientWidth) {
          testRactive.set("square.left", new_object_x + "px");
        }
        
        if (new_object_y > 0 && (new_object_y + draggedObject.clientHeight) <= event.node.clientHeight) {
          testRactive.set("square.top", new_object_y + "px");
        }

      } else {

        if (new_object_x > 0 && (new_object_x + draggedObject.clientWidth) <= event.node.clientWidth) {
          testRactive.set("square.left", new_object_x + "px");
        }

        if (new_object_y > 0 && (new_object_y + draggedObject.clientHeight) <= event.node.clientHeight) {
          testRactive.set("square.top", new_object_y + "px");
        }

      }

    }
  }
});

testRactive.off("dropSquare").on("dropSquare", function(event) {
  testRactive.set("square.squareGrabbed", false);
  
  testRactive.set("square.resizeTop", false);
  testRactive.set("square.resizeBottom", false);
  testRactive.set("square.resizeLeft", false);
  testRactive.set("square.resizeRight", false);
  
  testRactive.set("square.resizeTopLeft", false);
  
});

testRactive.off("activateResizeTop").on("activateResizeTop", function(event) {
  testRactive.set("square.resizeTop", true);
});
testRactive.off("activateResizeBottom").on("activateResizeBottom", function(event) {
  testRactive.set("square.resizeBottom", true);
});
testRactive.off("activateResizeLeft").on("activateResizeLeft", function(event) {
  testRactive.set("square.resizeLeft", true);
});

testRactive.off("activateResizeRight").on("activateResizeRight", function(event) {
  testRactive.set("square.resizeRight", true);
});

testRactive.off("activateResizeTopLeft").on("activateResizeTopLeft", function(event) {
  testRactive.set("square.resizeTopLeft", true);
});

testRactive.off("mouseCancel").on("mouseCancel", function(event) {
  return false;
});