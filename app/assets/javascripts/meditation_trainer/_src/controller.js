MeditationTrainer.Game = function() {
}

MeditationTrainer.Game.prototype = {
  addBreath: function() {
  }
}

MeditationTrainer.Controller = function(totalBreaths) {
  this.SPACEBAR_KEYCODE = 32;
  this.maxBreathCount = typeof(totalBreaths) == "undefined" ? 3 : 0

  this.activeGame = null;
  this.isInhaling = false;
  this.breathCount = 0;

  this._initializeSpacebarListener();
}

MeditationTrainer.Controller.prototype = {
  spacebarFired: function(event) {
    if (this._noGameActive()) {
      console.log('creating game');
      this.activeGame = new MeditationTrainer.Game();
    }

    if (!this.isInhaling) {
      console.log('creating breath');
      this.currentBreath = new MeditationTrainer.Breath();
      this.isInhaling = true;
    } else if (this.isInhaling) {
      console.log('ending breath');
      this.currentBreath.finish();
      this.activeGame.addBreath(this.currentBreath)
      this.isInhaling = false;
      this.breathCount++;
    }

    if (this.breathCount == this.maxBreathCount) {
      console.log('game over');
    }
  },

  _noGameActive: function() {
    return !this.activeGame;
  },

  _initializeGame: function() {
  },

  _initializeSpacebarListener: function() {
    $("body").on("keyup", function(jqEvent) {
      if (jqEvent.keyCode == this.SPACEBAR_KEYCODE) {
        this.spacebarFired(jqEvent);
      }
    }.bind(this));
  }
}
