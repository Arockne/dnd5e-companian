class Api::CharactersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  before_action :authorize_character_action, only: [:create, :show]

  def index
    characters = current_user.characters
    render json: characters, status: :ok
  end

  def show
    character = campaign.characters.find(params[:id])
    if !campaign_owner? && !character.visible && character.user != current_user
      return render json: { errors: ['Not Authorized'] }, status: :unauthorized 
    end
    render json: character, status: :ok, serializer: CharacterShowSerializer
  end

  def create
    character = current_user.characters.create!(character_params)
    render json: character, status: :created, serializer: CharacterShowSerializer
  end

  private

  def character_params
    params.permit(:name, :background, :race, :profession, :alignment, :experience, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :image_url, :visible, :campaign_id)
  end
  
  def campaign
    @campaign ||= params[:campaign_id] && Campaign.find(params[:campaign_id])
  end

  def membership
    @membership ||= current_user.campaign_users.find_by(campaign: campaign)
  end

  def campaign_owner?
    campaign.owner == current_user unless campaign.nil?
  end

  def authorize_character_action
    render json: { errors: ['Not Authorized'] }, status: :unauthorized unless membership || campaign_owner?
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found
    render json: { errors: ['The character you were looking for does not exist']}, status: :not_found
  end

end
