$(function(){
    searchFn();
    scrollFn();
	tooltipFn();
    //linkLeatedFn();
    // swiperFn();
});

//상단 검색영역
function searchFn(){
    var k;
    var temp;
    $(document).ready(function() {
        $(".headSch-input").keyup(function() {
            content = $(this).val();
            temp = $(".article-item:contains('" + content + "')");
        })
        $('.headSch-btn').click(function(){
            var offset = $(temp).offset(); //선택한 태그의 위치를 반환
            //animate()메서드를 이용해서 선택한 태그의 스크롤 위치를 지정해서 0.4초 동안 부드럽게 해당 위치로 이동함 
            $('html').animate({scrollTop : offset.top}, 200);
        });
    });

    $(".headSch-input").on("keyup",function(key){
        if(key.keyCode==13) {
            $('.headSch-btn').trigger('click');
        }
    });
}

//Top버튼 스크롤
function scrollFn(){
    $('.wrap').append('<div class="button-wrap moveTop"><button type="button" class="btn">TOP</button></div>');
    //scrollTop 이벤트
    $(window).scroll(function(){
        if($(this).scrollTop()>200){ //200px이상 내려갈시 나타남
            $('.moveTop').addClass('on');
        }else{
            $('.moveTop').removeClass('on');
        }
    })
    $('.moveTop button').click(function(){ //클릭시 top이동
        $('html, body').animate({scrollTop:0}, 200);
        return false;
    })
}

//툴팁, 팝오버
function tooltipFn(){
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
	$('.toolTip').hover(function(){
		let thisId = $(this).attr('data-id');
		// let thisDataId = $(this).attr('aria-describedby');
		// let tooltip = $('#' + thisDataId).addClass('customToolTip');
		$('.tooltip').toggleClass(thisId);
	})
}

//스크롤 인터렉션 : gnb 위치
function uxScrollSyc(){
	const HEADER = document.querySelector(".cg_schArea"); //top메뉴

	var prevScrollpos = 0,  //previous position
		currentScrollPos = 0, //current position
		navTopVal, // topFixWrap position
		headH, //GNB height
		navH; //topFixWrap height

	//header
	if ( HEADER ) {
		headH = HEADER.clientHeight;
		$("body").css("padding-top",headH+"px");
	};

	// GNB : 스크롤 연동 시작
	window.addEventListener("scroll", function(event){
		currentScrollPos = document.documentElement.scrollTop;
		//console.log ("이전 : "+ prevScrollpos +' / '+ "현재 : "+ currentScrollPos)
		if ( prevScrollpos > currentScrollPos ) { //위로 올릴때
			if ( HEADER ) {
				HEADER.style.top = "0";
			};
		} else { //아래로 내릴때
			if ( HEADER ) {
				HEADER.style.top = -headH+"px";
			};
		}
		if (currentScrollPos > 100 ) {
			if ( HEADER ) {
				HEADER.style.top = "-40px";
			};
		}
		//console.log ("이전 : "+ prevScrollpos +' / '+ "현재 : "+ currentScrollPos)
		prevScrollpos = currentScrollPos;
	});
	return prevScrollpos;
};

window.onload=function(){
	uxScrollSyc(); //페이지 인터렉션 실행
};