require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let!(:user) do
    User.create!(
      username: 'test_user',
      email: 'test@example.com',
      email_confirmation: 'test@example.com',
      password: 'test123',
      password_confirmation: 'test123'
    )
  end

  describe 'POST /api/login' do
    context 'with username and password' do
      let!(:session_params) { { username: user.username, password: user.password } }
      
      it 'returns the logged in user' do
        post '/api/login', params: session_params
        expect(response).to include_json({
          id: a_kind_of(Integer),
          username: session_params.user
        })
      end

      it 'assigns user id to session' do
        post '/api/login', params: session_params
        expect(session[id]).to eql(user.id)
      end

      it 'returns a status code of 200 (ok)' do
        expect { post '/api/login', params: session_params }.to have_http_status(:ok)
      end
    end

    context 'with invalid password' do
      let(:session_params) { { username: user.username, password: 'testabc' } }

      it 'returns the error messages' do
        post '/api/login', params: session_params

        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end

      it 'returns a status code of 401(Unauthorized)' do
        post '/api/login', params: session_params

        expect(response).to have_http_status(:unauthorized)
      end
    end
    
  end
end
