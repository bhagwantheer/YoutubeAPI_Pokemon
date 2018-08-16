var nextPageToken, prevPageToken;
let reachLastPage = false;
$(function() {
	$('#youtubeForm').submit(function(e) {
		e.preventDefault();
		$('.videoContainer').hide();
		$('.puserInput-items').addClass("hidden");
		search();
		$('#youtubeForm').append("<div class=\"buttons\"><div><button type=\"button\" id=\"prevPageButton\">Prev Page </button></div><div><button type=\"button\" id=\"nextPageButton\">Next Page </button></div></div>");
		//$('#youtubeForm').append("<div><button type=\"button\" id=\"prevPageButton\">Prev Page </button></div>");
	});
});

function search(PageToken) {
	var pokemonSearch = $('.puserText').val();
	$.ajax({
		url: 'https://www.googleapis.com/youtube/v3/search',
		dataType: 'json',
		data: {
			type: 'videos',
			q: pokemonSearch,
			maxResults: 5,
			part: 'snippet',
			key: 'AIzaSyBNF4MDFA61ZrZGQQLdfXj1HqCni6g75qQ',
			pageToken: nextPageToken
		},
		type: 'GET',
		success: function(data) {
			searchResponse(data);
		}
	});
}

function searchResponse(data) {
	nextPageToken = data.nextPageToken;
	prevPageToken = data.prevPageToken;
	$.each(data.items, function(index, item) {
		var channelTitle = item.snippet.channelTitle;
		var video_id = item.id.videoId;
		var videoUrl = "https://www.youtube.com/watch?v=" + video_id;
		var imgURL = item.snippet.thumbnails.default.url;
		var link = `<li><a href='${videoUrl}'><img src="${imgURL}"></a><h3>${channelTitle}</h3></li>`;
		//var link=`<li><a href='${videoUrl}'><img src="${imgURL}"></a></li>`;
		$('.puserInput-items').hide();
		$('.videoContainer').show();
		$('.videoContainer').append(link);
		//$('.videoContainer').append(channelTitle);
	});
	$('#nextPageButton').off('click').on('click', function(e) {
		nextPageToken = data.nextPageToken;
		console.log(nextPageToken);
		search(nextPageToken);
		if (reachLastPage == true) {
			console.log("no more pages left");
		}
	});
	$('#prevPageButton').off('click').on('click', function(e) {
		prevPageToken = data.prevPageToken;
		console.log(prevPageToken);
		search(prevPageToken);
	});
}
