require 'rails_helper'

RSpec.describe "Api::CharacterProfiles", type: :request do
  describe "PATCH /update" do
    context 'when a user is logged in' do
      context 'as the creator of the character' do
        it 'returns the updated character'
        it 'returns a status of 200 (Ok)'
      end
      context 'not the creator of the character' do
        it 'returns error messages'
        it 'returns a status of 401 (Unauthorized)'
      end
    end
    context 'when a user is not logged in' do
      it 'returns error messages'
      it 'returns a 401 (Unauthorized)'
    end
  end
end
