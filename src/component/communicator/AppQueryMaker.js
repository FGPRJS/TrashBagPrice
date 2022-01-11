export default class AppQueryMaker {
    constructor(){
        this.resultQuery = 
        '?' + 
        encodeURIComponent('serviceKey') + 
        '='+
        'WcEDPByqQrzxWt2k69nksx8Junf7GtDc8n8vGVgDz6hvbT8nvwZk4x1yYztNED3DD%2FD8%2BtiTcsKmkAUXUox%2BeQ%3D%3D'; /*Service Key*/
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