const AbstractSeeder = require("./AbstractSeeder");

class PlayerSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "players", truncate: true, dependencies: [] });
  }

  run() {
    for (let i = 0; i < 32; i += 1) {
      const fakePlayer = {
        firstname: this.faker.person.firstName(),
        lastname: this.faker.person.lastName(),
        status: this.faker.word.adjective(),
        posts_id: this.faker.number.int({ min: 1, max: 3 }),
        teams_id: this.faker.number.int({ min: 1, max: 2 }),

        refName: `user_${i}`,
      };

      this.insert(fakePlayer);
    }
  }
}

module.exports = PlayerSeeder;
