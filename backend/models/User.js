class User {
    constructor(username, password, email, isAdmin = false) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.isAdmin = isAdmin;
    }
}

module.exports = User;
