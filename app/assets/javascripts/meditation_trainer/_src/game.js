MeditationTrainer.Game = function() {
  this.breaths = [];
}

MeditationTrainer.Game.prototype = {
  addBreath: function(breath) {
    this.breaths.push(breath);
  },

  breathCount: function() {
    return this.breaths.length;
  },

  longestInhale: function() {
    return this.breaths.sort(function(a,b) {
      return b.inhaleDuration() - a.inhaleDuration()
    })[0].inhaleDuration();
  },

  longestExhale: function() {
    return this.breaths.sort(function(a,b) {
      return b.exhaleDuration() - a.exhaleDuration()
    })[0].exhaleDuration();
  },

  longestCycle: function() {
    return this.breaths.sort(function(a,b) {
      return b.cycleDuration() - a.cycleDuration()
    })[0].cycleDuration();
  },

  averageInhale: function() {
    return this.breaths.reduce(function(memo, elem) {
      return memo += elem.inhaleDuration();
    }, 0) / this.breaths.length
  },

  averageExhale: function() {
    return this.breaths.reduce(function(memo, elem) {
      return memo += elem.exhaleDuration();
    }, 0) / this.breaths.length
  },

  averageCycle: function() {
    return this.breaths.reduce(function(memo, elem) {
      return memo += elem.cycleDuration();
    }, 0) / this.breaths.length
  },

  toJson: function() {
    return {
      longestInhale: this.longestInhale(),
      averageInhale: this.averageInhale(),
      longestExhale: this.longestExhale(),
      averageExhale: this.averageExhale()
    };
  }
}
