class Movie {
    constructor(name, duration, genre, director, leadActors, country) {
        this.name = name;
        this.duration = duration;
        this.genre = genre;
        this.director = director;
        this.leadActors = leadActors;
        this.country = country;
        this.rating = 0;
        this.totalRatings = 0;
    }
}

module.exports = Movie;
