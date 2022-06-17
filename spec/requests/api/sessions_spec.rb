require 'rails_helper'

RSpec.describe "Api::Sessions", type: :request do
  let!(:user) do
    User.create!(
      username: 'test_user',
      email: 'test@example.com',
      password: 'test1234'
    )
  end

  describe 'POST /api/login' do
    context 'with username and password' do
      let!(:session_params) { { username: user.username, password: user.password } }
      
      it 'returns the logged in user' do
        post '/api/login', params: session_params
        
        expect(response.body).to include_json({
          id: user.id,
          username: user.username
        })
      end

      it 'assigns user id to session' do
        post '/api/login', params: session_params
        
        expect(session[:user_id]).to eql(user.id)
      end

      it 'returns a status code of 201 (created)' do
        post '/api/login', params: session_params

        expect(response).to have_http_status(:created)
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

    context 'with invalid username' do
      let(:session_params) { { username: 'random', password: 'test123' }}

      it 'does not assign user id to session' do
        post '/api/login', params: session_params

        expect(session[:user_id]).to eql(nil)
      end

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

  describe 'DELETE /api/logout' do

    describe 'with a logged in user' do
      
      it 'destroys the session' do
        post '/api/login', params: { username: user.username, password: user.password }
        delete '/api/logout'
        expect(session[:user_id]).to eql(nil)
      end

      it 'returns status code of 204 (no content)' do
        post '/api/login', params: { username: user.username, password: user.password }
        delete '/api/logout'
        expect(response).to have_http_status(:no_content)
      end
    end

    describe 'without a logged in user' do
      
      it 'returns the error messages' do
        delete '/api/logout'
        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end

      it 'returns with a status code of 401 (unauthorized)' do
        delete '/api/logout'
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
