var testRactive = new Ractive({
  el: '#container',
  template: '#template',
  data: {
    square: {
      left: "0px",
      top: "0px",
      squareGrabbed: false,
      width: "50px",
      height: "50px",
      resize: false
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
      var resizeTarget = testRactive.get("square.resize");
      
      switch(resizeTarget) {
        
        case "top":
        
          testRactive.set("square.height", parseFloat(testRactive.get("square.height")) - (new_mouse_y - old_mouse_y) + "px");

          if (new_object_y > 0 && (new_object_y + draggedObject.clientHeight) <= event.node.clientHeight) {
            testRactive.set("square.top", new_object_y + "px");
          }
          
          break;
          
        case "bottom":
        
          testRactive.set("square.height", parseFloat(testRactive.get("square.height")) + (new_mouse_y - old_mouse_y) + "px");

          if (new_object_y > 0 && (new_object_y + draggedObject.clientHeight) <= event.node.clientHeight) {
            testRactive.set("square.top", (new_object_y - (new_mouse_y - old_mouse_y)) + "px");
          }
        
          break;
        
        case "left":
        
          testRactive.set("square.width", parseFloat(testRactive.get("square.width")) - (new_mouse_x - old_mouse_x) + "px");

          if (new_object_x > 0 && (new_object_x + draggedObject.clientWidth) <= event.node.clientWidth) {
            testRactive.set("square.left", new_object_x + "px");
          }
        
          break;
          
        case "right":
        
          testRactive.set("square.width", parseFloat(testRactive.get("square.width")) + (new_mouse_x - old_mouse_x) + "px");

          if (new_object_x > 0 && (new_object_x + draggedObject.clientWidth) <= event.node.clientWidth) {
            testRactive.set("square.left", (new_object_x - (new_mouse_x - old_mouse_x)) + "px");
          }
        
          break;
          
        case "top-left":
        
          testRactive.set("square.width", parseFloat(testRactive.get("square.width")) - (new_mouse_x - old_mouse_x) + "px");
          
          testRactive.set("square.height", parseFloat(testRactive.get("square.height")) - (new_mouse_y - old_mouse_y) + "px");

          if (new_object_x > 0 && (new_object_x + draggedObject.clientWidth) <= event.node.clientWidth) {
            testRactive.set("square.left", new_object_x + "px");
          }
          
          if (new_object_y > 0 && (new_object_y + draggedObject.clientHeight) <= event.node.clientHeight) {
            testRactive.set("square.top", new_object_y + "px");
          }
        
          break;
          
        case "top-right":
          break;
          
        case "bottom-right":
          break;
          
        case "bottom-left":
          break;
          
        default:
        
          if (new_object_x > 0 && (new_object_x + draggedObject.clientWidth) <= event.node.clientWidth) {
            testRactive.set("square.left", new_object_x + "px");
          }

          if (new_object_y > 0 && (new_object_y + draggedObject.clientHeight) <= event.node.clientHeight) {
            testRactive.set("square.top", new_object_y + "px");
          }
        
          break;
      }

    }
  }
});

testRactive.off("dropSquare").on("dropSquare", function(event) {
  testRactive.set("square.squareGrabbed", false);
  testRactive.set("square.resize", false);
  
});

testRactive.off("activateResize").on("activateResize", function(event, target) {
  testRactive.set("square.resize", target);
});

testRactive.off("mouseCancel").on("mouseCancel", function(event) {
  return false;
});