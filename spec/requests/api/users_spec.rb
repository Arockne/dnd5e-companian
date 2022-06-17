require 'rails_helper'

RSpec.describe "Api::Users", type: :request do
  before do
    User.create!(
      username: 'bob',
      email: 'bob@gmail.com',
      password: 'test1234'
    )
  end

  describe "GET /me" do
    context "with user logged in" do
      before do
        post "/api/login", params: { username: 'bob', password: 'test1234' }
      end

      it "returns the users data" do
        get "/api/me"
        expect(response.body).to include_json({
          id: a_kind_of(Integer),
          username: 'bob'
        })
      end

      it "returns a status of 200(ok)" do
        get "/api/me"
        expect(response).to have_http_status(:ok)
      end

    end

    context "with user not logged in" do
      it "returns the error messages" do
        get "/api/me"
        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end

      it "returns a status code of 401 (Unauthorized)" do
        get "/api/me"
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /signup" do
    context 'with valid user params' do
      let!(:user_params) do 
        { user: {
            username: 'ron', 
            email:'ron@gmail.com',
            password:'test1234'
          }
        }
      end

      it 'creates a new user' do
        expect { post '/api/signup', params: user_params }.to change(User, :count).by(1)
      end

      it 'returns the users data' do
        post '/api/signup', params: user_params

        expect(response.body).to include_json({
          id: a_kind_of(Integer),
          username: 'ron'
        })
      end

      it 'returns a status code of 201 (created)' do
        post '/api/signup', params: user_params

        expect(response).to have_http_status(:created)
      end

      it 'does not save the user id in the session' do
        post '/api/signup', params: user_params
        
        expect(session[:user_id]).to eql(nil)
      end
    end

    context 'with invalid user params' do
      let!(:user_params) do
        { user: {
            username: '', 
            email:'', 
            password:''
          }
        }
      end

      it 'does not create a new user' do
        expect { post '/api/signup', params: user_params }.not_to change(User, :count)
      end
      
      it 'does not save user id in session' do
        post '/api/signup', params: user_params

        expect(session[:user_id]).to eql(nil)
      end

      it 'returns the error messages' do
        post '/api/signup', params: user_params
        
        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end

      it 'returns a status code of 422 (Unproccessable Entity)' do
        post '/api/signup', params: user_params

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
