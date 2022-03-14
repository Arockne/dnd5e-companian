require 'rails_helper'

RSpec.describe "Api::CampaignUsers", type: :request do
  describe 'POST /create' do
    context 'with logged in user' do
      context 'joining a campaign' do
        context 'with correct password' do
          it 'increases the amount of CampaignUsers by one'
          it 'returns the CampaignUser'
          it 'returns a status of 201 (Created)'
        end
        context 'with incorrect password' do
          it 'returns a status of 401 (Unauthorized)'
          it 'returns error messsages'
        end
      end
      context 'joining a campaign already a member of' do
        it 'returns a status of 403 (Forbidden)'
        it 'returns error messages'
      end
    end
    context 'without logged in user' do
      it 'returns a status of 401 (Unauthorized)'
      it 'returns error messages'
    end
  end
end
