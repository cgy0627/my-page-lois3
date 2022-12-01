import "../css/Map.css";
import React, { useRef, useEffect, useState } from "react";

function Map() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const currentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          // console.log(
          //   `latitude : ${position.coords.latitude} longitude : ${position.coords.longitude}`
          // );
        },
        function (error) {
          console.error(error);
        }
      );
    } else {
      console.log("GPS를 지원하지 않습니다.");
    }
  };
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    // center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    center: new window.kakao.maps.LatLng(latitude, longitude), //지도의 현재 사용자 좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };

  const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스

  useEffect(() => {
    currentPosition();
    console.log(`latitude : ${latitude} + longitude : ${longitude}`);
    new window.kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
    // return () => {};
  }, [latitude, longitude]);
  return (
    <div
      className="map"
      style={{ width: "1000px", height: "500px" }}
      ref={container}
    ></div>
  );
}

export default Map;
