// Import the repository modules responsible for handling data operations on the tables
const RoleRepository = require("./models/RoleRepository");
const TeamRepository = require("./models/TeamRepository");
const PostRepository = require("./models/PostRepository");
const UserRepository = require("./models/UserRepository");
const PlayerRepository = require("./models/PlayerRepository");

// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
tables.roles = new RoleRepository();
tables.teams = new TeamRepository();
tables.posts = new PostRepository();
tables.users = new UserRepository();
tables.players = new PlayerRepository();

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
