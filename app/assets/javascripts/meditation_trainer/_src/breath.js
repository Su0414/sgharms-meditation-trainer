MeditationTrainer.Breath = function() {
  this.startDate = new Date();
  this.pivotDate = null;
  this.endDate = null;
}

MeditationTrainer.Breath.prototype = {
  pivot: function(endDate) {
    this.pivotDate = new Date()
  },

  finish: function(endDate) {
    this.endDate = new Date()
  },

  inhaleDuration: function() {
    if (typeof(this.pivotDate) == "undefined") this.endDate(); // Prevent naughtiness
    return (this.pivotDate - this.startDate) / 1000;
  },

  exhaleDuration: function() {
    if (typeof(this.pivotDate) == "undefined") this.endDate(); // Prevent naughtiness
    return (this.endDate - this.pivotDate) / 1000;
  },

  cycleDuration: function() {
    if (typeof(this.endDate) == "undefined") this.endDate(); // Prevent naughtiness
    return (this.endDate - this.startDate) / 1000;
  }

}
