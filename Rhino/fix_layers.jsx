var doc = app.activeDocument;

var things_r = doc.pathItems;
var things = [];


for (var i = things_r.length - 1; i >= 0; i--) {
    things.push(things_r[i]);
}

for (var i = 0; i < things.length; i++) {
    var string_path = things[i].layer.name.split("::");
    if (string_path.length > 1) {
        addToLayer(things[i], doc, string_path);
    }
}

function addToLayer(item, layer_obj, string_path) {

    if (string_path.length == 0) {
        var old_layer = item.layer.name;
        item.move(layer_obj, ElementPlacement.PLACEATEND);
        // remove the empty layer
        for (var i = 0; i  < doc.layers.length; i++) {
            var targetLayer = doc.layers[i];
            if (targetLayer.name ==old_layer) {
                doc.layers[i].remove();
            }
        }
        return;
    }
    var top_layer = string_path[0];
    for (var i = 0; i < layer_obj.layers.length; i++) {
        if (layer_obj.layers[i].name == top_layer) {
            // layer found, recursively add to it
            string_path.shift();
            return addToLayer(item, layer_obj.layers[i], string_path);
        }
    }
    
    // add this layer
    var new_layer = layer_obj.layers.add(ElementPlacement.PLACEATEND);
    new_layer.name = top_layer;
    string_path.shift();
    return addToLayer(item, new_layer, string_path);
}
