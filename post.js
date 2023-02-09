class Post {
    constructor(url, description, author) {
        this.id = Post.maxId;
        this.image = url;
        this.description = description;
        this.date = Date.now();
        this.likes = [];
        this.comments = [];
        Post.maxId++;
        this.author = author;
    }
    static maxId = 11;
}

export default Post;


