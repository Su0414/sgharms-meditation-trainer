MeditationTrainer.PromptView = function(selector) {
  this.$sel = $(selector);
}

MeditationTrainer.PromptView.prototype.draw = function(data) {
  this.$sel.text(data);
}
