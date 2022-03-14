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
        post '/api/login', params: { username: user_1.username, password: user_1.password}
      end
      
      context 'joining a campaign' do
        context 'with correct password' do
          let(:campaign_user_params) { { campaign: { campaign_id: campaign_1.id, password: campaign_1.password } } }

          it 'increases the amount of CampaignUsers by one' do
            expect { post '/api/campaign_users', params: campaign_user_params }.to change(CampaignUser, :count).by(1)
          end

          it 'returns the CampaignUser' do
            post '/api/campaign_users', params: campaign_user_params
            expect(response.body).to include_json({
              id: a_kind_of(Integer),
              user_id: user_1.id,
              campaign_id: campaign_1.id
            })
          end
          it 'returns a status of 201 (Created)' do
            post '/api/campaign_users', params: campaign_user_params
            expect(response).to have_http_status(:created)
          end
        end
        context 'with incorrect password' do
          let(:incorrect_campaign_user_params) { { campaign: { campaign_id: campaign_1.id, password: 'thisisnotthepasswordyouarelookingfor' } } }

          it 'returns a status of 401 (Unauthorized)' do
            post '/api/campaign_users', params: incorrect_campaign_user_params
            expect(response).to have_http_status(:unauthorized)
          end

          it 'returns error messsages' do
            post '/api/campaign_users', params: incorrect_campaign_user_params
            expect(response).to include_json({
              errors: a_kind_of(Array)
            })
          end
        end
      end

      context 'joining a campaign already a member of' do
        let(:campaign_user_params) { { campaign: { campaign_id: campaign_1.id, password: campaign_1.password } } }
        it 'returns a status of 403 (Forbidden)' do
          post '/api/campaign_users', params: campaign_user_params
          post '/api/campaign_users', params: campaign_user_params
          expect(response).to have_http_status(:forbidden)
        end
        it 'returns error messages' do
          post '/api/campaign_users', params: campaign_user_params
          post '/api/campaign_users', params: campaign_user_params
          expect(response.body).to include_json({
            errors: a_kind_of(Array)
          })
        end
      end

      context 'joining a campaign that does not exist' do
        let(:campaign_user_params) { { campaign: { campaign_id: 0, password: 'campaigndoesnotexist' } } }

        it 'returns a status of 404 (Not Found)' do
          post '/api/campaign_users', params: campaign_user_params
          expect(response).to have_http_status(:not_found)  
        end

        it 'returns error messages' do
          post '/api/campaign_users', params: campaign_user_params
          expect(response.body).to include_json({
            errors: a_kind_of(Array)
          })
        end
      end
    end
    
    context 'without logged in user' do
      let(:campaign_user_params) { { campaign: { campaign_id: campaign_1.id, password: campaign_1.password } } }

      it 'returns a status of 401 (Unauthorized)' do
        post '/api/campaign_users', params: campaign_user_params
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns error messsages' do
        post '/api/campaign_users', params: campaign_user_params
        expect(response).to include_json({
          errors: a_kind_of(Array)
        })
      end
    end
  end
end
