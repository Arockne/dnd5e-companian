class Api::CharactersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  
  before_action :authorize_create_action, only: [:create]
  before_action :authorize_show_action, only: [:show]
  before_action :authorize_update, only: [:destroy]
  
  def index
    characters = current_user.characters
    render json: characters, status: :ok
  end

  def show
    render json: character, status: :ok, serializer: CharacterShowSerializer
  end

  def create
    character = current_user.characters.create!(character_params)
    render json: character, status: :created, serializer: CharacterShowSerializer
  end

  def update
    if campaign_owner?
      character.update!(campaign_owner_update_character_params)
      render json: character, status: :ok, serializer: CharacterShowSerializer
    elsif character_creator?
      character.update!(creator_update_character_params)
      render json: character, status: :ok, serializer: CharacterShowSerializer
    else
      render json: { errors: ["Not Authorized"] }, status: :unauthorized
    end
  end

  def destroy
    character.destroy
    render json: character, status: :ok
  end

  private

  def character_params
    params.permit(:name, :background, :race, :profession, :alignment, :experience, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :image_url, :visible, :campaign_id)
  end

  def creator_update_character_params
    params.require(:character).permit(:name, :background, :race, :profession, :alignment, :experience, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :image_url, :visible)
  end

  def campaign_owner_update_character_params
    params.require(:character).permit(:name, :background, :race, :profession, :alignment, :experience, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma)
  end
  
  def campaign
    @campaign ||= params[:campaign_id] && Campaign.find(params[:campaign_id])
  end

  def membership
    @membership ||= current_user.campaign_users.find_by(campaign: campaign)
  end

  def character
    @character ||= campaign.characters.find(params[:id])
  end

  def campaign_owner?
    campaign.owner == current_user unless campaign.nil?
  end

  def character_creator?
    character.user == current_user
  end

  def authorize_show_action
    unless campaign_owner? || ( character.visible && membership ) || character_creator?
      return render json: { errors: ['Not Authorized'] }, status: :unauthorized 
    end
  end

  def authorize_create_action
    render json: { errors: ['Not Authorized'] }, status: :unauthorized unless membership || campaign_owner?
  end

  def authorize_update
    unless campaign_owner? || character_creator?
      render json: { errors: ["Not Authorized"] }, status: :unauthorized
    end
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found
    render json: { errors: ['The character you were looking for does not exist']}, status: :not_found
  end

end
