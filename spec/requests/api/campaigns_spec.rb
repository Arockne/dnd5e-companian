require 'rails_helper'

RSpec.describe "Api::Campaigns", type: :request do
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

  describe "GET /index" do
    context 'with logged in user' do
      before do
        post '/api/login', params: { username: user_1.username, password: user_1.password }
      end

      it 'returns all the campaigns with owner' do
        get '/api/campaigns'
        expect(response.body).to include_json([
          {
            id: a_kind_of(Integer),
            name: 'Knights of the Round Table',
            owner: {
              id: a_kind_of(Integer),
              username: user_1.username
            }
          },
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
      context 'as a member of the campaign' do
        it 'returns the campaign'
        it 'returns a status of 200 (Ok)'
      end
      context 'as the owner of the campaign' do
        it 'returns the campaign'
        it 'returns a status of 200 (Ok)'
      end
      context 'not affiliated with the campaign' do
        it 'returns the error messages'
        it 'returns a status of 401 (Unauthorized)'
      end
    end
    context 'without a logged in user' do
      it 'returns error messages'
      it 'returns a status of 401 (Unauthorized)'
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
              password: 'test123', 
              password_confirmation: 'test123'
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

      context 'with no password confirmation' do
        let(:campaign_params) do
          { 
            campaign: {
              name: 'The Throne of the king', 
              setting: 'A king sits upon a throne...', 
              password: 'test123', 
            }
          }
        end

        it 'does not create a campaign' do
          expect { post '/api/campaigns', params: campaign_params }.to_not change(Campaign, :count)
        end

        it 'returns a status of 422 (Unprocessable entity)' do
          post '/api/campaigns', params: campaign_params
          expect(response).to have_http_status(:unprocessable_entity)
        end
        
        it 'returns error messages' do
          post '/api/campaigns', params: campaign_params
          expect(response.body).to include_json({
            errors: a_kind_of(Array)
          })
        end
        
      end
    end

    context 'without logged in user' do
      let(:campaign_params) do
        { 
          campaign: {
            name: 'The Throne of the king', 
            setting: 'A king sits upon a throne...', 
            password: 'test123', 
            password_confirmation: 'test123'
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
          password: 'kingforever', 
          password_confirmation: 'kingforever'
        }
      }
    end

    let!(:invalid_params) do
      {
        campaign: {
          name: '', 
          setting: '', 
          password: '', 
          password_confirmation: 'kingforever'
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

        it 'returns a status of 204 (No Content)' do
          delete "/api/campaigns/#{campaign_1.id}"
          expect(response).to have_http_status(:no_content)
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
