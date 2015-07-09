class MeditateController < ApplicationController
  def index
  end

  def intro
  end

  def set_cycle
    session[:cycles] = params[:cycle]
    redirect_to :meditate_index
  end
end
