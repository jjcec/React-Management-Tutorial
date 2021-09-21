// const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
// const { connect } = require('http2');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const data = fs.readFileSync('./database.json');
// const conf = JSON.parse(data); // 환경설정 데이터 파싱해서 가져오기
// const mysql = require('mysql'); // mysql 라이브러리 불러와서 mysql변수에 담을 수 있도록

// const connection = mysql.createConnection({
//     host: conf.host,
//     user: conf.user,
//     password: conf.password,
//     port: conf.port,
//     database: conf.database
// });

// connection.connect();

// app.get('/api/customers', (req, res) => {
//     connection.query(
//         "SELECT * FROM customer",
//         (err, rows, fields) => {
//             res.send(rows);
//         }
//     )
// })

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/any',
            'name': '홍길동',
            'birthday': '210920',
            'gender': '남자',
            'job': '대학생'
          },
          {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '기일동',
            'birthday': '980214',
            'gender': '여자',
            'job': '프로그래머'
          },
          {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '호옹길',
            'birthday': '951212',
            'gender': '남자',
            'job': '디자이너'
          }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));