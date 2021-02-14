var doc = app.activeDocument;

var things_r = doc.pathItems;
var things = [];

var last_color = null; // keep track of last color to know when to add a new layer
var layer_number = -1; // the layer group number


// reverse the list because Illustrator likes it that way.
for (var i = things_r.length - 1; i >= 0; i--) {
    things.push(things_r[i]);
}

for (var i = 0; i < things.length; i++) {
    var thing_color;
    var thing = things_r[i];
    var old_layer = thing.layer.name;

    if (thing.stroked) {
        thing_color = thing.strokeColor;
    } else if (thing.filled) {
        thing_color = thing.fillColor;
    } else {
        // no colour given, skip
        continue;
    }

    // yes I know this is bad code, no I will not write it better.
    if (i == 0) {
        layer_number++;
    } else {
        if (thing_color.typename == "RGBColor") {
            if (thing_color.red != last_color.red || thing_color.green != last_color.green || thing_color.blue != last_color.blue) {
                layer_number++;
            }
        } else if (thing_color.typename == "CMYKColor") {
            if (thing_color.cyan != last_color.cyan || thing_color.magenta != last_color.magenta || thing_color.yellow != last_color.yellow || thing_color.black != last_color.black) {
                layer_number++;
            }
        }
    }

    // update the new item colour
    last_color = thing_color;

    var j;
    // try to see if that layer exists
    for (j = 0; j < doc.layers.length; j++) {
        if (doc.layers[j].name == layer_number) {
            // layer found, add item to it
            thing.move(doc.layers[j], ElementPlacement.PLACEATEND);
            break;
        }
    }

    if (j == doc.layers.length) {
        // layer did not exist, add it
        var new_layer = doc.layers.add(ElementPlacement.PLACEATEND);
        new_layer.name = layer_number;
        // move item to that layer
        thing.move(new_layer, ElementPlacement.PLACEATEND);
    }


    // remove the empty layer
    for (j = 0; j < doc.layers.length; j++) {
        var targetLayer = doc.layers[j];
        if (targetLayer.name == old_layer && targetLayer.pathItems.length <= 0) {
            doc.layers[j].remove();
            break; // remove at most 1 layer each time.
        }
    }



}