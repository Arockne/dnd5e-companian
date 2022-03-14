require 'rails_helper'

RSpec.describe "Api::CampaignUsers", type: :request do
  let(:user_1) do 
    User.create!(
      username: 'arthur',
      email: 'arthur@camelot.com',
      email_confirmation: 'arthur@camelot.com', 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end
    
  let(:user_2) do
    User.create!(
      username: 'bob',
      email: 'bob@gmail.com',
      email_confirmation: 'bob@gmail.com', 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end

  let!(:campaign_1) do
    Campaign.create!(
      name: 'Knights of the Round Table', 
      setting: 'Somewhere in Camelot', 
      owner: user_1, 
      password: 'king', 
      password_confirmation: 'king'
    )
  end

  let!(:campaign_2) do
    Campaign.create!(
      name: 'Star Wards', 
      setting: 'In a hospital far far away', 
      owner: user_2, 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end

  describe 'POST /create' do
    context 'with logged in user' do
      before do
        post '/api/login' params: { username: user_1.username, password: user_1.password}
      end
      context 'joining a campaign' do
        context 'with correct password' do
          let(:campaign_user_params) { { campaign: { campaign_id: campaign_1.id } } }

          it 'increases the amount of CampaignUsers by one' do
            expect { post '/campaign_users', params: campaign_user_params }.to change(CampaignUser, :count).by(1)
          end

          it 'returns the CampaignUser' do
            post '/campaign_users', params: campaign_user_params
            expect(response.body).to include_json({
              id: a_kind_of(Integer),
              user_id: user_1.id,
              campaign_id: campaign_1.id
            })
          end
          it 'returns a status of 201 (Created)' do
            post '/campaign_users', params: campaign_user_params
            expect(response).to have_http_status(:created)
          end
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
