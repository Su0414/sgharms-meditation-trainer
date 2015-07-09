class Breath < ActiveRecord::Base
  def self.createFromParams(params)
    b = Breath.new
    b.attributes = { longestInhale: params[:longestInhale], longestExhale: params[:longestExhale], longestAverageInhale: params[:averageInhale], longestAverageExhale: params[:averageExhale] }
    b.save
    b
  end

  def self.longestInhale
    Breath.order(longestInhale: :desc).limit(1).first.longestInhale
  end

  def self.longestExhale
    Breath.order(longestExhale: :desc).limit(1).first.longestExhale
  end

  def self.longestAverageInhale
    Breath.order(longestAverageInhale: :desc).limit(1).first.longestAverageInhale
  end

  def self.longestAverageExhale
    Breath.order(longestAverageExhale: :desc).limit(1).first.longestAverageExhale
  end
end
