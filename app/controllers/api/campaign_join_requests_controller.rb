class Api::CampaignJoinRequestsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def create
    request = CampaignJoinRequest.create!(user: current_user, campaign_id: params[:campaign_id])
    render json: request, status: :ok  
  end

  private
  
  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found
    render json: { errors: 'The campaign you are requesting to join is not of this realm'}, status: :not_found
  end
end
