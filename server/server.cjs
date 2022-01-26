const path = require('path');
const express = require('express');
const { httpGet } = require('./httpGet.cjs');

let app = express();

const port = 8080;

let resultQuery = 
'?' + 
encodeURIComponent('serviceKey') + 
'='+
'WcEDPByqQrzxWt2k69nksx8Junf7GtDc8n8vGVgDz6hvbT8nvwZk4x1yYztNED3DD%2FD8%2BtiTcsKmkAUXUox%2BeQ%3D%3D'; /*Service Key*/

const url = "http://api.data.go.kr/openapi/tn_pubr_public_weighted_envlp_api"; /*URL*/


app.use(express.static(path.join(__dirname, '../dist')));
app.set('port', process.env.PORT || port);

app.get('/request', (req, res) => {

  let pageNo = req.query.pageNo;
  let numOfRows = req.query.numOfRows;
  let type = req.query.type;
  let CTPRVN_NM = req.query.CTPRVN_NM;
  let SIGNGU_NM = req.query.SIGNGU_NM;

  resultQuery += "&pageNo=" + pageNo
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



