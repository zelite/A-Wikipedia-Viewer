function searchWiki(){
  var searchTerms = $("#search-bar").val();
  if(searchTerms){
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php?origin=*",
      data: {
        "action": "opensearch",
        "search": searchTerms,
        "format": "json"
      },
      type: "POST",
      headers: {"Api-User-Agent": "WikipediaViewerZelite/1.0"},
      success: populatePage,
      error: function(data){
        debugger;
        console.log(data);
      }
    });
  }

}

function populatePage(data){
  //first clear any previous results
    $("#search-results").empty();
  for(var i = 0; i < data[1].length; i++){
    //Build the components of each new div
    var title = $("<h1/>", {text: data[1][i]});
    var summary = $("<p/>", {text: data[2][i]});
    var link = $("<a/>", {href: data[3][i],
                            text: "Read article..."});

    //Populate with new results
  $("#search-results").append(
      $("<div/>", {class: "result"}).append(title, summary, link)
    );
  }
}

$(document).ready(
  $("#search-button").on("click", searchWiki)
);
