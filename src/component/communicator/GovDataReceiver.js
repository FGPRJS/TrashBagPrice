export default class GovDataReceiver {
    constructor(){
        this.url = 'http://api.data.go.kr/openapi/tn_pubr_public_weighted_envlp_api'; /*URL*/

        this.baseQuery = new AppQueryMaker();
    }

    makeBaseQuery(){
        let newQuery = new AppQueryMaker();

        newQuery
        .appendConditionQuery('pageNo', 1)
        .appendConditionQuery('numOfRows', '105')
        .appendConditionQuery('type','json')
        
        return newQuery;
    }

    getData_Seoul(){
        let resultData = null;
        let newQuery = this.makeBaseQuery();

        newQuery.appendConditionQuery('CTPRVN_NM','서울특별시');

        fetch(url + newQuery.getResult())
        .then(response => 
            response.json()
        )
        .then(data => {
            resultData = data;
        })

        return data;
    }

    getData_North_Chungcheong(){

    }
}