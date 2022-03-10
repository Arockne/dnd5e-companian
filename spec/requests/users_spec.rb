require 'rails_helper'

RSpec.describe "Users", type: :request do
  before do
    User.create!(
      username: 'bob',
      email: 'bob@gmail.com',
      email_confirmation: 'bob@gmail.com', 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end

  describe "POST /signup" do
    context 'with valid user params' do
      let!(:user_params) do 
        { user: {
            username: 'ron', 
            email:'ron@gmail.com', 
            email_confirmation:'ron@gmail.com', 
            password:'test123', 
            password_confirmation:'test123'
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
          username: 'ron',
          email: 'ron@gmail.com'
        })
      end

      it 'returns a status code of 201 (created)' do
        post '/api/signup', params: user_params

        expect(response).to have_http_status(:created)
      end

      it 'saves the user id in the session' do
        post '/api/signup', params: user_params
        
        expect(session[:user_id]).to_not eql(nil)
        expect(session[:user_id]).to be_a(Integer)
        expect(session[:user_id]).to eql(User.last.id)
      end
    end

    context 'with invalid user params' do
      let!(:user_params) do
        { user: {
            username: 'ron', 
            email:'ron@gmail.com', 
            password:'test123'
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

    context 'with no password confirmation' do
      let!(:user_params) do
        { user: {
            username: 'ron', 
            email:'ron@gmail.com', 
            email_confirmation: 'ron@gmail.com',
            password:'test123'
          }
        }
      end

      it 'does not create a new user' do
        expect { post '/api/signup', params: user_params }.not_to change(User, :count)
      end

      it 'does not create a new user with wrong password confirmation' do
        user_params[:user][:password_confirmation] = 'notsame'
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
