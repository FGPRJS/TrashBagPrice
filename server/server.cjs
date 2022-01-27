const path = require('path');
const express = require('express');
const { httpGet } = require('./httpGet.cjs');

let app = express();

let baseQuery = 
'?' + 
encodeURIComponent('serviceKey') + 
'='+
'WcEDPByqQrzxWt2k69nksx8Junf7GtDc8n8vGVgDz6hvbT8nvwZk4x1yYztNED3DD%2FD8%2BtiTcsKmkAUXUox%2BeQ%3D%3D'; /*Service Key*/

const url = "http://api.data.go.kr/openapi/tn_pubr_public_weighted_envlp_api"; /*URL*/


app.use(express.static(path.join(__dirname, '../dist')));
app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
  console.log("Express server listening");
});

app.get('/', (req, res) => {
  console.log("hello world!");
});

app.get('/request', (req, res) => {

  let pageNo = req.query.pageNo;
  let numOfRows = req.query.numOfRows;
  let type = req.query.type;
  let CTPRVN_NM = req.query.CTPRVN_NM;
  let SIGNGU_NM = req.query.SIGNGU_NM;

  let resultQuery = baseQuery 
  + "&pageNo=" + pageNo
  + "&numOfRows=" + numOfRows
  + "&type=" + type
  + "&CTPRVN_NM=" + CTPRVN_NM
  + "&SIGNGU_NM=" + SIGNGU_NM

  const result = url + resultQuery;

  console.log(result);

  httpGet(result).then((response) => {
    res.send(response);
  });
})


