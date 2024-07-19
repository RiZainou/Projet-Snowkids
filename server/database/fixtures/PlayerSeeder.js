const AbstractSeeder = require("./AbstractSeeder");

class PlayerSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "players", truncate: true, dependencies: [] });
  }

  run() {
    for (let i = 0; i < 16; i += 1) {
      const fakePlayer = {
        firstname: this.faker.person.firstName(),
        lastname: this.faker.person.lastName(),
        status: this.faker.word.adjective(),
        posts_id: this.faker.number.int({ min: 4, max: 6 }),
        teams_id: 2,

        refName: `user_${i}`,
      };

      this.insert(fakePlayer);
    }
  }
}

module.exports = PlayerSeeder;
