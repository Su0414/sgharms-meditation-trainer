class BreathsController < ApplicationController
  def create
    Breath.createFromParams(params[:record])
    render json: record
  end

  def show_record
    render json: record
  end

  private

    def record
      {
        longestInhale: Breath.longestInhale,
        longestExhale: Breath.longestExhale,
        longestAverageInhale: Breath.longestAverageInhale,
        longestAverageExhale: Breath.longestAverageExhale
      }
    end
end
