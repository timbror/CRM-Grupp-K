function loadJSON(file, callback) {

  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', file, false);
  xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {

          // .open will NOT return a value but simply returns undefined in async mode so use a callback
          callback(xobj.responseText);

      }
  }
  xobj.send(null);

}

function getJSON (file) {
  let result = null;
  // Call to function with anonymous callback
  loadJSON(file, function(response) {
      result = JSON.parse(response);
  });
  return result;
}
