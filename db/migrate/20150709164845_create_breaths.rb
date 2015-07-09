class CreateBreaths < ActiveRecord::Migration
  def change
    create_table :breaths do |t|
      t.float :longestInhale
      t.float :longestExhale
      t.float :longestAverageInhale
      t.float :longestAverageExhale
    end
  end
end
