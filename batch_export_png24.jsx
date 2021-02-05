var docs = app.documents;
var exportOptions = new ExportOptionsPNG24();
exportOptions.transparency = false;
exportOptions.artBoardClipping = true;
exportOptions.verticalScale = 400;
exportOptions.horizontalScale = 400;
exportOptions.antiAliasing = true;
exportOptions.transparency = false;


for (var i = 0; i < docs.length; i++) {
        $.writeln(docs[i]);
        docs[i].exportFile(new File(docs[i].fullName + "batch"), ExportType.PNG24, exportOptions);
}

alert("Done.");