class Api::CharactersController < ApplicationController

  def index
    characters = current_user.characters
    render json: characters, status: :ok
  end

  def create
    
  end

  private

  def character_params
    params.require(:character).permit(:name, :background, :race, :profession, :alignment, :experience, :strength, :dexterity, :constitution, :intelligence, :wisdom, :image_url)
  end

end
