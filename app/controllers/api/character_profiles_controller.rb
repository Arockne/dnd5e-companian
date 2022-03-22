class Api::CharacterProfilesController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

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

  def render_not_found
    render json: { errors: ['The profile of the character you were looking for does not exist'] }, status: :not_found
  end
end
