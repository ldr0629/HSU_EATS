const buttons = document.querySelectorAll(".restaurant-list");
const queryMap = document.querySelector("#map-container");
const mapQuitBtn = document.querySelector("#map-quit");
const mainContainer = document.querySelector(".wrapper");


for(const button of buttons) {
    button.addEventListener("click", function(event) {
        let restaurantPath = event.target.offsetParent;
        if(restaurantPath.classList.value !== "restaurant-list") {
            restaurantPath = restaurantPath.offsetParent;
        }

        const restaurantName = restaurantPath.childNodes[5].childNodes[1].innerText;
        const restaurantAddress = restaurantPath.attributes[1].value;
        document.body.style.overflow = "hidden";
        queryMap.classList.remove("invisible");
        mainContainer.classList.add("invisible");
        geocoding(restaurantName, restaurantAddress);
    })
}

function geocoding(name, address) {
    var addrVal = address;

    // 도로명 주소 -> 좌표 값 변환 
    naver.maps.Service.geocode({
        query: addrVal
    }, function(status, response) {
        if(status !== naver.maps.Service.Status.OK) {
            return alert("잘못된 접근입니다.");
        }

        var result = response.v2, // 검색 결과 컨테이너
            items = result.addresses; // 검색 결과 배열

        // 좌표 값 변수에 저장
        let x = parseFloat(items[0].x);
        let y = parseFloat(items[0].y);
        mapGenerator(name, String(y), String(x));
    })
}

// 위도, 경도 기반으로 맵 생성
function mapGenerator(name, la, lo) {
    var location = new naver.maps.LatLng(la, lo),
        map = new naver.maps.Map('map', {
            center: location,
            zoom: 19
        }),
        marker = new naver.maps.Marker({
            map: map,
            position: location
        });
    if(isMobile()) {
        var contentString = [
            '<div>',
            '   <h5>'+name+'</h5>',
            '</div>'
        ].join('');
    } else {
        var contentString = [
            '<div>',
            '   <h5>'+name+'</h5><br>',
            '   <a target="_blank" href="http://map.naver.com/search/양산동'+name+'">네이버 지도 바로 가기</a>',
            '</div>'
        ].join('');
    }

    var infoWindow = new naver.maps.InfoWindow({
        content: contentString,
        backgroundColor: "#eee",
        borderColor: "#A4A4A4",
        borderWidth: 2,
        disableAnchor:true,
        pixelOffset: new naver.maps.Point(0, -10)
    });

    naver.maps.Event.addListener(marker, "click", function() {
        if(infoWindow.getMap()) {
            infoWindow.close();
        } else {
            infoWindow.open(map, marker);
        }
    });

    mapQuitBtn.addEventListener("click", function() {
        if(infoWindow.getMap()) {
            infoWindow.close();
        }
        queryMap.classList.add("invisible");
        mainContainer.classList.remove("invisible");
        document.body.style.overflow = "visible";
    });
}
