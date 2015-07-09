MeditationTrainer.StatsView = function() {
}

MeditationTrainer.StatsView.prototype.draw = function(ds) {
  $('#longest-inhale-duration').text(ds.longestInhale());
  $('#average-inhale-duration').text(ds.averageInhale());
  $('#longest-exhale-duration').text(ds.longestExhale());
  $('#average-exhale-duration').text(ds.averageExhale());
  $('#longest-cycle-duration').text(ds.longestCycle());
  $('#average-cycle-duration').text(ds.averageCycle());
}

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
      if (!this.isExhaling) {
        console.log('creating breath');
        this.currentBreath = new MeditationTrainer.Breath();
        this.isInhaling = true;
        this.isExhaling = false;
      } else {
        console.log('ending breath');
        this.currentBreath.finish();
        this.isExhaling = false;
      }

      if (this.breathCount == this.maxBreathCount) {
        console.log('game over');
      }
    } else if (this.isInhaling) {
      console.log('pivoting breath');
      this.currentBreath.pivot();
      this.activeGame.addBreath(this.currentBreath)
      this.isInhaling = false;
      this.isExhaling = true;
      this.breathCount++;
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
