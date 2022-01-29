export default class AppQueryMaker {
    constructor(){
        const isDevServer = process.env.WEBPACK_DEV_SERVER;

        if(isDevServer){
            this.resultQuery = 
            '?' + 
            encodeURIComponent('serviceKey') + 
            '='+
            'WcEDPByqQrzxWt2k69nksx8Junf7GtDc8n8vGVgDz6hvbT8nvwZk4x1yYztNED3DD%2FD8%2BtiTcsKmkAUXUox%2BeQ%3D%3D'; /*Service Key*/
        
            this.url = 'http://api.data.go.kr/openapi/tn_pubr_public_weighted_envlp_api'; /*URL*/
        }
        else{
            this.resultQuery = "/request/?";
            this.url = '';
        }
        
    }

    static makeBaseQuery(){
        let newQuery = new AppQueryMaker();

        newQuery
        .appendConditionQuery('pageNo', 1)
        .appendConditionQuery('numOfRows', '105')
        .appendConditionQuery('type','json')
        
        return newQuery;
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