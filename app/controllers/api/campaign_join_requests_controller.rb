class Api::CampaignJoinRequestsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  before_action :authorize_join_request, only: [:create]

  def create
    request = CampaignJoinRequest.create!(user: current_user, campaign_id: params[:campaign_id])
    render json: request, status: :ok  
  end

  private

  def render_unprocessable_entity(invalid)
    byebug
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def authorize_join_request
    render json: { errors: ['Cannot request to join as the owner'] }, status: :unprocessable_entity if campaign_owner?
  end

  def campaign
    @campaign ||= Campaign.find(params[:campaign_id])
  end

  def campaign_owner?
    current_user == campaign.owner
  end

  def render_not_found
    render json: { errors: 'The campaign you are requesting to join is not of this realm'}, status: :not_found
  end
end
