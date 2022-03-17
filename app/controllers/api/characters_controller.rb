class Api::CharactersController < ApplicationController

  def index
    characters = current_user.characters
    render json: characters, status: :ok
  end
end
