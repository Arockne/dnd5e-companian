class Api::CharacterProfilesController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def update
    character_profile = CharacterProfile.find(params[:id])
    if character_profile.character.user == current_user
      character_profile.update!(character_profile_params)
      render json: character_profile, status: :ok
    else
      render json: { errors: ['Not Authorized'] }, status: :unauthorized
    end
  end

  private

  def character_profile_params
    params.require(:character_profile).permit(:age, :height, :weight, :eyes, :skin, :hair, :gender, :appearance, :backstory)
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
