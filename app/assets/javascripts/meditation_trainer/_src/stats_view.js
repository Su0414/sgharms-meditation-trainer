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
