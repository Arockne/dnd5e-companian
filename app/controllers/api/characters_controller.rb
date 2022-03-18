class Api::CharactersController < ApplicationController

  def index
    characters = current_user.characters
    render json: characters, status: :ok
  end

  def create
    membership = current_user.campaign_users.find_by(campaign_id: character_params[:campaign_id])
    owner = membership.nil? && current_user.owned_campaigns.find_by(id: character_params[:campaign_id])
    if membership || owner
      character = current_user.characters.new(character_params)
      if character.save
        render json: character, status: :created, serializer: CharacterShowSerializer
      else
        render json: { errors: character.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: ['Not Authorized'] }, status: :unauthorized
    end
  end

  private

  def character_params
    params.require(:character).permit(:name, :background, :race, :profession, :alignment, :experience, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :image_url, :campaign_id)
  end

end
