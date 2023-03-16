import React from 'react';

export default function Main() {
  return (
    <main className="pt-12">
      <section className="w-screen bg-amber-50 h-screen overflow-x-scroll flex items-center justify-between">
        <div className="pl-44 max-md: pr-20">
          <h1 className="w-96 text-4xl font-bold pb-8 leading-tight">
            동네 이웃들과 함께하는 , <br />
            슬기로운 문情 생활
          </h1>
          <p>
            중고 거래부터 동네 정보까지 우리 함께 소통해요.
            <br />
            이웃간에 따뜻한 정을 느껴보아요.
          </p>
        </div>
        <img className="pr-44" src="images/Main/map.png" alt="mapImg" />
      </section>
      <section className="w-screen bg-white-50 h-screen overflow-x-scroll flex items-center justify-between">
        <img
          className="pl-44 max-md: pr-20"
          src="images/Main/chatting.png"
          alt="chattingImg"
        />
        <div className="pr-20">
          <h1 className="w-96 text-5xl font-bold pb-8 leading-tight">
            우리 동네 <br />
            안전 직거래 마켓
          </h1>
          <p>
            안정성과 신뢰성을 바탕으로
            <br />
            동네 주민들과 따뜻한 거래를 경험해요.
          </p>
        </div>
      </section>
      <section className="w-screen bg-green-50 h-screen overflow-x-scroll flex items-center justify-center">
        <div>
          <div className="pb-36">
            <h1 className="w-96 text-5xl font-bold pb-8 leading-tight">
              문情 생활
            </h1>
            <p>우리 동네의 다양한 소식들을 이웃들과 함께 나누어요.</p>
          </div>
          <div className="flex pl-40 max-md:flex-col">
            <div className="pr-32 max-md: pb-8">
              <img
                className="w-20 pb-6"
                src="images/Main/meeting.png"
                alt="meetingImg"
              />
              <h2 className="font-semibold  pb-2 text-lg">문情 생활 정보</h2>
              <p>관심사가 비슷한 이웃과 함께 소통해요</p>
            </div>
            <div className="pr-32 max-md: pb-8">
              <img
                className="w-20 pb-6"
                src="images/Main/question.png"
                alt="questionImg"
              />
              <h2 className="font-semibold pb-2 text-lg">문情 생활 질문</h2>
              <p>궁금한 게 있을 땐 이웃에게 물어보세요.</p>
            </div>
            <div>
              <img
                className="w-20 pb-6"
                src="images/Main/information.png"
                alt="informationImg"
              />
              <h2 className="font-semibold pb-2 text-lg">문情 생활 즐기기</h2>
              <p>
                맛집, 동네 정보 등 우리 동네 사람들이
                <br /> 이용하는 가게를 찾아보세요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
