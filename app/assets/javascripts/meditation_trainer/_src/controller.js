MeditationTrainer.Controller = function(totalBreaths, statsView) {
  this.SPACEBAR_KEYCODE = 32;
  this.DEBUG_MODE = true;

  this.maxBreathCount = typeof(totalBreaths) == "undefined" ? 3 : 0

  this.activeGame = null;
  this.isInhaling = false;
  this.breathCount = 0;

  this.statsView = statsView;

  this._initializeSpacebarListener();
}

MeditationTrainer.Controller.prototype = {
  spacebarFired: function(event) {
    if (this._noGameActive()) {
      this._initializeGame();
    }

    if (!this.isInhaling && !this.isExhaling) {
      this._initializeFirstBreath();
      return;
    }

    this.isInhaling ?  this._pivotBreath() : this._endBreath();
  },

  _endBreath: function() {
    if (this.DEBUG_MODE) console.log('ending breath');
    this.currentBreath.finish();
    this.breathCount++;
    this.isExhaling = false;
    this._updateStatsView();
    if (this.breathCount == this.maxBreathCount) {
      if (this.DEBUG_MODE) console.log('game over');
    }
  },

  _pivotBreath: function() {
    if (this.DEBUG_MODE) console.log('pivoting breath');
    this.currentBreath.pivot();
    this.activeGame.addBreath(this.currentBreath)
    this.isInhaling = false;
    this.isExhaling = true;
  },

  _initializeFirstBreath: function() {
    if (this.DEBUG_MODE) console.log('creating breath');
    this.currentBreath = new MeditationTrainer.Breath();
    this.isInhaling = true;
    this.isExhaling = false;
  },

  _initializeGame: function() {
    if (this.DEBUG_MODE) console.log('creating game');
    this.activeGame = new MeditationTrainer.Game();
  },

  _updateStatsView: function() {
    this.statsView.draw(this.activeGame);
  },

  _noGameActive: function() {
    return !this.activeGame;
  },

  _initializeSpacebarListener: function() {
    $("body").on("keyup", function(jqEvent) {
      if (jqEvent.keyCode == this.SPACEBAR_KEYCODE) {
        this.spacebarFired(jqEvent);
      }
    }.bind(this));
  }
}
