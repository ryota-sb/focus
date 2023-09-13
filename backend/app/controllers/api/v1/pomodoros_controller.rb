class Api::V1::PomodorosController < ApplicationController
  def create
    pomodoro = Pomodoro.new(pomodoro_params)

    if pomodoro.save
      render json: pomodoro
    else
      render json: pomodoro.errors, status: :unprocessable_entity
    end
  end

  private

  def pomodoro_params
    params.require(:pomodoro).permit(:date)
  end
end
