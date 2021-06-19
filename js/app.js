// YOU WILL NEED TO ADD YOUR OWN API KEY IN QUOTES ON LINE 14, EVEN FOR THE PREVIEW TO WORK.
// GET YOUR API HERE https://console.developers.google.com/apis/api
// https://developers.google.com/youtube/v3/docs/playlistItems/list
// <iframe width="100%" height="100%" src="https://www.youtube.com/embed/CN0OTAkUD9c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//My playlists:
//PLtlw27LFl0AAqdzSWlCIeaUDM4z9OLolt 
//PLtlw27LFl0ACaM7m0I_A69g1DzZXA8oD6
//PLtlw27LFl0ACkxR5FujUm0WNB4DGLRk51
//PLtlw27LFl0ADg4PsloGQOxtIjmlOpbECO


$(function () {

    var key = 'YOUR KEY';
    var playlistId = 'PLtlw27LFl0ACkxR5FujUm0WNB4DGLRk51';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 12,
        playlistId: playlistId
    }

    //let run function on page load
    loadVideos()

    //create above function
    function loadVideos() {
        $.getJSON(URL, options, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;

            //run default video on load
            mainVideo(id);

            //run video list function
            videoList(data)
        });
    }

    //create default video on load
    function mainVideo(id) {
        $(".video_section").html(`
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          `)
    }

    //create video list function
    function videoList(data) {
        $.each(data.items, function (i, item) {
            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title.substring(0, 50);
            var title_ = title.length > 45 ? title + '...' : title;
            var vid = item.snippet.resourceId.videoId;

            //inset video in the div
            $(".video_thumb .row").append(`
                <div class="col-6 col-md-6, col-lg-3">
                    <div class="item" data-key="${vid}">
                        <div class="thumb_">
                            <img src="${thumb}" alt="${title}">
                        </div>
                        <div class="vid_desc">
                            <h4>${title_}</h4>
                        </div>
                    </div>
                </div>
               
            `)

        })
    }

    //click event and add video in main video 
    $(".video_thumb").on("click", ".item", function () {
        $(this).addClass("active").siblings().removeClass("active");
        var id = $(this).attr("data-key");
        mainVideo(id);

    });
    //thank you for watching
    //please subscribe my channel
});