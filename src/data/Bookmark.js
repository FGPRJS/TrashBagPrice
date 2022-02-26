import EventBus from "../event/EventBus.js";

class Bookmark {
    data = [];
    
    add(new_value){
        this.data.push(new_value);
    }
    findIndex(target){
        const index = this.data.indexOf(target);
        return index;
    }
    has(target){
        if(this.findIndex(target) > -1){
            return true;
        }
        else{
            return false;
        }
    }
    remove(target){
        const index = this.findIndex(target);
        if(index > -1){
            this.data.splice(index, 1);
        }
    }
    updateCookie(){
        let result = "";
        for(let d of this.data){
            result += d + ",";
        }
        result = "bookmark=" + result;
        document.cookie = result;
        EventBus.dispatch("BookmarkUpdate",{data:this.data});
    }
    readCookie(){
        let cookie = document.cookie;
        let bookmarkString = "";

        let bookmarkStrings = cookie.split('; ')
        .find(row => row.startsWith('bookmark'))

        if(bookmarkStrings != undefined){
            bookmarkStrings = bookmarkStrings.split('=');
            bookmarkString = bookmarkStrings[1];
        }
        this.data = bookmarkString.split(',');

        return this.data;
    }
}

let bookmark = new Bookmark();
export default bookmark;