class Bookmark {
    data = new Set();
    
    add(new_value){
        this.data.add(new_value);
        console.log("Current Data : ");
        console.log(this.data);
    }
    remove(target){
        this.data.delete(target);
        console.log("Current Data : ");
        console.log(this.data);
    }
    updateCookie(){
        let result = "";
        for(let d of this.data){
            console.log("update this cookie : ");
            console.log(d);
            result += d + ",";
        }
        result = "bookmark=" + result;
        console.log(result);
        document.cookie = result
    }
    readCookie(){
        let cookie = document.cookie;

        let bookmarkString = cookie.split('; ')
        .find(row => row.startsWith('bookmark'))
        .split('=')[1];

        this.data = new Set(bookmarkString.split(','));

        return this.data
    }
}

let bookmark = new Bookmark();
export default bookmark;