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

  describe "POST /users" do
    context 'with valid user params' do
      let!(:user_params) do 
        {
          username: 'ron', 
          email:'ron@gmail.com', 
          email_confirmation:'ron@gmail.com', 
          password:'test123', 
          password_confirmation:'test123'
        }
      end

      it 'creates a new user' do
        expect { post '/users', params: user_params }.to change(User, :count).by(1)
      end

      it 'returns the users data' do
        post '/users', params: user_params

        expect(response.body).to include_json({
          id: a_kind_of(Integer),
          username: 'ron',
          email: 'ron@gmail.com'
        })
      end

      it 'returns a status code of 201 (created)' do
        post '/users', params: user_params

        expect(response).to have_http_status(:created)
      end
    end
  end
end
