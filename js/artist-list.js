//초기화 시 실행할 내용들
var pageNum = 1;
getArtists(pageNum);

// 더 보기 버튼을 눌렀을 때 동작
$('#btnMoreArtists').click(function(){
  clickMoreArtistsButton();
});

function clickMoreArtistsButton () {
  pageNum += 1;
  getArtists(pageNum);
}

function getArtists(pageNum){
    axios.get('http://localhost:8000/api/artist/',{params:{page:pageNum}})
      .then(function (response) {
      //ul.artist-list
        var artistListElement =$('.artist-list');
        // 응답의 artist 정보목록
        var artists = response.data.results;
        console.log(artists);

        for (var i = 0; i < artists.length; i++) {
            // var currentArtist=artists[i];
            var curArtist=artists[i]
            // console.log(artists[i]);
            var curArtistItemElement =$('#artist-item-template').clone();

            curArtistItemElement.find('.artist-name').text(curArtist.name);
            curArtistItemElement.find('.artist-img-profile').attr('src', curArtist.img_profile)
            artistListElement.append(curArtistItemElement);
        }
        // console.log(response.data.next)
        if(response.data.next == null)
        {
          $('#btnMoreArtists').css("display","none");
        }

      }
    )
    .catch(function (error) {
    console.log(error);

    }
  );
};
