class Comment {
    constructor(text, author, id) {
        this.text = text;
        this.date = Date.now();
        this.likes = [];
        this.id = id;
        this.author = author;
    }
}

export default Comment;