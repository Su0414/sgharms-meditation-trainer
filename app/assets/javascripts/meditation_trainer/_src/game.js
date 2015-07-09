MeditationTrainer.Game = function() {
  this.breaths = [];
}

MeditationTrainer.Game.prototype = {
  addBreath: function(breath) {
    this.breaths.push(breath);
  }
}
