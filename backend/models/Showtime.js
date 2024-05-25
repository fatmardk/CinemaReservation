class Comment {
    constructor(userId, movieId, comment) {
        this.userId = userId;
        this.movieId = movieId;
        this.comment = comment;
        this.createdAt = new Date();
    }
}

module.exports = Comment;
