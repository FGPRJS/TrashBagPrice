export default class AppQueryMaker {
    constructor(){
        this.resultQuery = 
        '?' + 
        encodeURIComponent('serviceKey') + 
        '='+
        'WcEDPByqQrzxWt2k69nksx8Junf7GtDc8n8vGVgDz6hvbT8nvwZk4x1yYztNED3DD%2FD8%2BtiTcsKmkAUXUox%2BeQ%3D%3D'; /*Service Key*/
    
        this.url = 'http://api.data.go.kr/openapi/tn_pubr_public_weighted_envlp_api'; /*URL*/
    }

    static makeBaseQuery(){
        let newQuery = new AppQueryMaker();

        newQuery
        .appendConditionQuery('pageNo', 1)
        .appendConditionQuery('numOfRows', '105')
        .appendConditionQuery('type','json')
        
        return newQuery;
    }

    temp(){
        let newQuery = AppQueryMaker.makeBaseQuery();

        console.log(LocationName[location]);

        newQuery.appendConditionQuery('CTPRVN_NM',LocationName[location]);

        fetch(newQuery.url + newQuery.getResult())
        .then(response => 
            response.json()
        )
        .then(data => {
            console.log(data);
        })
    }

    appendConditionQuery(target,value){
        this.resultQuery += '&';
        this.resultQuery += encodeURIComponent(target);
        this.resultQuery += '=';
        this.resultQuery += encodeURIComponent(value);

        return this;
    }

    getResult(){
        return this.resultQuery;
    }
}