const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  let judgment = ''
  if (hand === cpu) {
    judgement = '引き分け';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1;
  } else {
    j;udgement = '負け';
  }
  total += 1; 

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/tyouhan", (req, res) => {
  let hands = req.query.hands;
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;
  console.log( {hands, win, total});
  const num = Math.floor( Math.random() * 2) + 1;
  let cpu = '';
  if( num==1 ){
   cpu = '半';
  }else if(num==2){
    cpu = '丁';
  }

  // ここに勝敗の判定を入れる
  let judgement = ''
  if (hands !== '半' && hands !== '丁') {
    judgement = '無効';  // 不正な入力を検出
  } else if (hands === cpu) {
    judgement = '勝ち';
    win += 1;
  } else if (
    (hands === '半' && cpu === '丁') || 
    (hands === '丁' && cpu === '半')
  ) {
    judgement = '負け';
  }
  
  total += 1; 

  const display = {
    your: hands,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'tyouhan', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
