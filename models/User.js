const PasswordUtils = require('../utils/PasswordUtils');

class User {
    /**
     * Creates a user
     * @param id The identifier of the user
     * @param login The login of the user
     * @param password The password of the user, only used to generate a hash
     *                 Must only be specified on user creation !!
     */
    constructor(id, login, password) {
        this.id = id;
        this.login = login;

        if(password !== undefined)
            this.password = password;
    }
}

module.exports = User;