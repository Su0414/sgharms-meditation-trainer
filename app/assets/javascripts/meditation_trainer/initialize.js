$(function() {
  mc = new MeditationTrainer.Controller(typeof(MAX_BREATH_CYCLES) == "undefined" ? 3 : MAX_BREATH_CYCLES,
                                        new MeditationTrainer.StatsView(),
                                        new MeditationTrainer.PromptView("#prompt-view p"))
});
