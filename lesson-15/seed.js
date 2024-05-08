// seed.js
"use strict";

/**
 * Listing 15.9 (p. 224)
 * 새로운 데이터 생성
 */
// 모듈 가져오기
const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");
// 데이터베이스 연결 설정

mongoose.connect(
  "mongodb+srv://ut-node:WvwxUOCR1qtX1i2T@ut-node.shy2gcv.mongodb.net/?retryWrites=true&w=majority&appName=UT-node",
  { useNewUrlParser: true }
);

mongoose.connection;

// subscribers 배열 생성 (5개 이상)
var subscribers = [
  {
    name: "AAA",
    email: "AAA@naver.com",
    phoneNumber: "01011111111",
  },
  {
    name: "BBB",
    email: "BBB@gmail.com",
    phoneNumber: "01022222222",
  },
  {
    name: "CCC",
    email: "CCC@nate.com",
    phoneNumber: "01033333333",
  },
  {
    name: "DDD",
    email: "DDD@nate.com",
    phoneNumber: "01044444444",
  },
  {
    name: "EEE",
    email: "EEE@nate.com",
    phoneNumber: "01055555555",
  }
];

// 기존 데이터 제거
Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscribers delelted!");
  });

var commands = [];

// 프라미스 생성을 위한 구독자 객체 루프
subscribers.forEach(s => {
  commands.push(
    Subscriber.create({
      name: s.name,
      email: s.email,
      phoneNumber: s.phoneNumber
    })
  );
});

// 프라미스 생성 후 로깅 작업
Promise.all(commands)
  .then((r) => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(e => {
    console.log(`Error: ${e}`);
  });