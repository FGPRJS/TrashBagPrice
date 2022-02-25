class Bookmark {
    data = new Set();
    
    add(new_value){
        this.data.add(new_value);
    }
    remove(target){
        this.data.delete(target);
    }
    updateCookie(){
        let result = "";
        for(let d of this.data){
            result += d + ",";
        }
        result = "bookmark=" + result;
        document.cookie = result
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
        this.data = new Set(bookmarkString.split(','));

        return this.data;
    }
}

let bookmark = new Bookmark();
export default bookmark;