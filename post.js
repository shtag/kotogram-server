class Post{
    constructor(url){
        this.image = url;
        this.date = Date.now();
        this.likes = [];
        this.comments = [];
    }
}

export default Post;