class Post {
    constructor(url, description, author) {
        this.image = url;
        this.description = description;
        this.date = Date.now();
        this.likes = [];
        this.comments = [];
        this.id = Post.maxId;
        Post.maxId++;
        this.author = author;
    }
    static maxId = 1;
}

export default Post;


