import data from './data.js';

class Post {
    constructor(url, description, author) {
        this.id = data.posts[data.posts.length - 1].id + 1;
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
