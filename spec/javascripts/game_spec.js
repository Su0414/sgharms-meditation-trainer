describe("Game Model", function() {
  var game;

  beforeEach(function() {
    game = new MeditationTrainer.Game();
    game.addBreath(1)
  });

  it("adds a breath via the addBreath() method ", function() {
    expect(game.breathCount()).toBe(1);
  });

  it("adds a a thing i expect it to add", function() {
    expect(game.breaths).toContain(1);
  });

  xit("Some day I should do something awesome here.");
});
