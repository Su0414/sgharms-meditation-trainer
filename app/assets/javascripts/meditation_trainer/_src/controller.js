MeditationTrainer.Controller = function(totalBreaths, statsView, promptView) {
  this.SPACEBAR_KEYCODE = 32;
  this.DEBUG_MODE = true;

  this.maxBreathCount = typeof(totalBreaths) == "undefined" ? 3 : totalBreaths;

  this.activeGame = null;
  this.isInhaling = false;
  this.breathCount = 0;

  this.statsView = statsView;
  this.promptView = promptView;

  this._initializeSpacebarListener();
  this._initializeDisplay();
}

MeditationTrainer.Controller.prototype = {
  spacebarFired: function(event) {
    if (this._noGameActive()) {
      this._initializeGame();
    }

    if (!this.isInhaling && !this.isExhaling) {
      this._initializeFirstBreath();
      this._prompt("Inhale");
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
    this._recordBreath();
    if (this.breathCount == this.maxBreathCount) {
      if (this.DEBUG_MODE) console.log('game over');
    }
  },

  _recordBreath: function() {
    $.ajax('/breaths', {
      type: 'POST',
      data: { record: this.activeGame.toJson() }
    }).then(function(json) {
      this._update_system_stats(json)
    }.bind(this));
  },

  _update_system_stats: function(json) {
    $('#longest-inhale-duration-ever').text(json.longestInhale);
    $('#average-inhale-duration-ever').text(json.longestExhale);
    $('#longest-exhale-duration-ever').text(json.longestAverageInhale);
    $('#average-exhale-duration-ever').text(json.longestAverageExhale);
  },

  _pivotBreath: function() {
    if (this.DEBUG_MODE) console.log('pivoting breath');
    this._prompt("Exhale");
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
  },

  _prompt: function(message) {
    this.promptView.draw(message);
  },

  _initializeDisplay: function() {
    this._prompt("Begin to breathe deeply. When you feel ready to begin, press Space at the end of an exhale.");
    $.ajax("/breaths/show_record")
    .then(function(json) {
      this._update_system_stats(json);
    }.bind(this));
  }
}
