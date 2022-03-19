class Api::CharactersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  before_action :authorize_character_action, only: [:create]

  def index
    characters = current_user.characters
    render json: characters, status: :ok
  end

  def create
    character = current_user.characters.create!(character_params)
    render json: character, status: :created, serializer: CharacterShowSerializer
  end

  private

  def character_params
    params.permit(:name, :background, :race, :profession, :alignment, :experience, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :image_url, :campaign_id)
  end
  
  def campaign
    @campaign ||= params[:campaign_id] && Campaign.find(params[:campaign_id])
  end

  def membership
    @membership ||= current_user.campaign_users.find_by(campaign: campaign)
  end

  def owner?
    campaign.owner == current_user unless campaign.nil?
  end

  def authorize_character_action
    render json: { errors: ['Not Authorized'] }, status: :unauthorized unless membership || owner?
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
