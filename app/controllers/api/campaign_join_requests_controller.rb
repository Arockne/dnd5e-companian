class Api::CampaignJoinRequestsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def create
    request = CampaignJoinRequest.create!(user: current_user, campaign_id: params[:campaign_id])
    render json: request, status: :ok  
  end

  private
  
  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end
end
