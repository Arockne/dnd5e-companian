require 'rails_helper'

RSpec.describe "Api::Campaigns", type: :request do
  let(:user_1) do 
    User.create!(
      username: 'arthur',
      email: 'arthur@camelot.com',
      password: 'test123'
    )
  end
    
  let(:user_2) do
    User.create!(
      username: 'bob',
      email: 'bob@gmail.com',
      password: 'test123'
    )
  end

  let!(:campaign_1) do
    Campaign.create!(
      name: 'Knights of the Round Table', 
      setting: 'Somewhere in Camelot', 
      owner: user_1, 
      password: 'king'
    )
  end

  let!(:campaign_2) do
    Campaign.create!(
      name: 'Star Wards', 
      setting: 'In a hospital far far away', 
      owner: user_2, 
      password: 'test123'
    )
  end

  describe "GET /index" do
    context 'with logged in user' do
      before do
        post '/api/login', params: { username: user_1.username, password: user_1.password }
      end

      it 'returns all the campaigns not including current user campaigns with owner' do
        get '/api/campaigns'
        expect(response.body).to include_json([
          {
            id: a_kind_of(Integer),
            name: 'Star Wards',
            owner: {
              id: a_kind_of(Integer),
              username: user_2.username
            }
          }
        ])
      end

      it 'returns a status of 200 (ok)' do
        get '/api/campaigns'
        expect(response).to have_http_status(:ok)
      end

    end

    context 'without logged in user' do
      it 'returns a status of 401 (Unauthorized)' do
        get '/api/campaigns'
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns error messages' do
        get '/api/campaigns'
        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end
    end
  end

  describe 'GET /show' do
    context 'with a logged in user' do
      before do
        post '/api/login', params: { username: user_1.username, password: user_1.password }
      end

      context 'as a member of the campaign' do
        before do
          CampaignUser.create!(user: user_1, campaign: campaign_2)
        end

        it 'returns the campaign' do
          get "/api/campaigns/#{campaign_2.id}"
          expect(response.body).to include_json({
            id: campaign_2.id,
            name: campaign_2.name,
            setting: campaign_2.setting,
            owner: {
              id: user_2.id,
              username: user_2.username
            }
          })
        end

        it 'returns a status of 200 (Ok)' do
          get "/api/campaigns/#{campaign_2.id}"
          expect(response).to have_http_status(:ok)
        end
      end

      context 'as the owner of the campaign' do
        it 'returns the campaign' do
          get "/api/campaigns/#{campaign_1.id}"
          expect(response.body).to include_json({
            id: campaign_1.id,
            name: campaign_1.name,
            setting: campaign_1.setting,
            owner: {
              id: user_1.id,
              username: user_1.username
            }
          })
        end

        it 'returns a status of 200 (Ok)' do
          get "/api/campaigns/#{campaign_1.id}"
          expect(response).to have_http_status(:ok)
        end
      end

      context 'not affiliated with the campaign' do
        it 'returns the error messages' do
          get "/api/campaigns/#{campaign_2.id}"
          expect(response.body).to include_json({
            errors: a_kind_of(Array)
          })
        end

        it 'returns a status of 401 (Unauthorized)' do
          get "/api/campaigns/#{campaign_2.id}"
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end

    context 'without a logged in user' do
      it 'returns error messages' do
        get "/api/campaigns/#{campaign_1.id}"
        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end
      it 'returns a status of 401 (Unauthorized)' do
        get "/api/campaigns/#{campaign_1.id}"
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST /create' do
    context 'with logged in user' do
      before do
        post '/api/login', params: { username: user_1.username, password: user_1.password }
      end

      context 'with correct params' do
        let(:campaign_params) do
          { 
            campaign: {
              name: 'The Throne of the king', 
              setting: 'A king sits upon a throne...', 
              password: 'test123'
            }
          }
        end
  
        it 'creates a new campaign' do
          expect { post '/api/campaigns', params: campaign_params }.to change(Campaign, :count).by(1)
        end
  
        it 'returns the campaign with owner' do
          post '/api/campaigns', params: campaign_params
          expect(response.body).to include_json({
            id: a_kind_of(Integer),
            name: 'The Throne of the king',
            owner: {
              id: a_kind_of(Integer),
              username: user_1.username
            }
          })
        end

        it 'returns a status of 201 (Created)' do
          post '/api/campaigns', params: campaign_params
          expect(response).to have_http_status(:created)
        end
      end
    end

    context 'without logged in user' do
      let(:campaign_params) do
        { 
          campaign: {
            name: 'The Throne of the king', 
            setting: 'A king sits upon a throne...', 
            password: 'test123'
          }
        }
      end

      it 'does not create a new campaign' do
        expect { post '/api/campaigns', params: campaign_params }.to_not change(Campaign, :count)
      end

      it 'returns a status of 401 (Unauthorized)' do
        get '/api/campaigns'
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns error messages' do
        get '/api/campaigns'
        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end
    end
  end

  describe 'PATCH /update' do
    let!(:campaign_params) do
      {
        campaign: {
          name: 'Knights of the SQUARE Table', 
          setting: 'THE BEST KINGDOM IN THE LAND NAMED CAMELOT', 
          password: 'kingforever'
        }
      }
    end

    let!(:invalid_params) do
      {
        campaign: {
          name: '', 
          setting: '', 
          password: ''
        }
      }
    end
    context 'when a user is logged in' do
      before do
        post '/api/login', params: { username: user_1.username, password: user_1.password }
      end

      context 'as the owner of the campaign' do
        context 'with valid params' do
          it 'returns the campaign with the changes' do
            patch "/api/campaigns/#{campaign_1.id}", params: campaign_params
            expect(response.body).to include_json({
              id: campaign_1.id,
              name: 'Knights of the SQUARE Table', 
              setting: 'THE BEST KINGDOM IN THE LAND NAMED CAMELOT'
            })
          end
  
          it 'returns a status of 200 (Ok)' do
            patch "/api/campaigns/#{campaign_1.id}", params: campaign_params
            expect(response).to have_http_status(:ok)
          end
        end

        context 'with invalid params' do
          it 'returns the error messages' do
            patch "/api/campaigns/#{campaign_1.id}", params: invalid_params
            expect(response.body).to include_json({
              errors: a_kind_of(Array)
            })
          end

          it 'returns a status of 422 (Unprocessable Entity)' do
            patch "/api/campaigns/#{campaign_1.id}", params: invalid_params
            expect(response).to have_http_status(:unprocessable_entity)
          end
        end
      end

      context 'not as the owner of the campaign' do
        it 'returns the error messages' do
          patch "/api/campaigns/#{campaign_2.id}", params: campaign_params
          expect(response.body).to include_json({
            errors: a_kind_of(Array)
          })
        end

        it 'returns a status of 401 (Unauthorized)' do
          patch "/api/campaigns/#{campaign_2.id}", params: campaign_params
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end

    context 'when a user is not logged in' do
      it 'returns the error messages' do
        patch "/api/campaigns/#{campaign_1.id}", params: campaign_params
        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end

      it 'returns a status of 401 (Unauthorized)' do
        patch "/api/campaigns/#{campaign_1.id}", params: campaign_params
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /campaigns/:id' do
  
    context 'with logged in user' do
      before do
        post '/api/login', params: { username: user_1.username, password: user_1.password }
      end

      context 'as the campaign owner' do
        it 'decreases the amount of campaigns' do
          expect { delete "/api/campaigns/#{campaign_1.id}" }.to change(Campaign, :count).by(-1)
        end

        it 'returns a status of 200 (Ok)' do
          delete "/api/campaigns/#{campaign_1.id}"
          expect(response).to have_http_status(:ok)
        end

        it 'returns nothing' do
          delete "/api/campaigns/#{campaign_1.id}"
          expect(response.body).to be_empty
        end
      end

      context 'with not being the campaign owner' do
        it 'returns a status of 401 (Unauthorized)' do
          delete "/api/campaigns/#{campaign_2.id}"
          expect(response).to have_http_status(:unauthorized)
        end

        it 'does not decrease the amount of campaigns' do
          expect { delete "/api/campaigns/#{campaign_2.id}" }.to_not change(Campaign, :count)
        end

        it 'returns the error messages' do
          delete "/api/campaigns/#{campaign_2.id}"
          expect(response.body).to include_json({
            errors: a_kind_of(Array)
          })
        end
      end
    end

    context 'without logged in user' do
      it 'returns a status of 401 (Unauthorized)' do
        delete "/api/campaigns/#{campaign_2.id}"
        expect(response).to have_http_status(:unauthorized)
      end

      it 'does not decrease the amount of campaigns' do
        expect { delete "/api/campaigns/#{campaign_2.id}" }.to_not change(Campaign, :count)
      end

      it 'returns the error messages' do
        delete "/api/campaigns/#{campaign_2.id}"
        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end
    end
  end
end
