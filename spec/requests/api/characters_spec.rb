require 'rails_helper'

RSpec.describe "Api::Characters", type: :request do
  let!(:owner) do 
    User.create!(
      username: 'arthur',
      email: 'arthur@camelot.com',
      email_confirmation: 'arthur@camelot.com', 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end

  let(:player_1) do
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
      owner: owner, 
      password: 'king', 
      password_confirmation: 'king'
    )
  end

  let!(:character_1) do
    Character.create!(
      name: 'Rocko',
      background: 'Noble',
      race: 'Dwarf',
      profession: 'Fighter',
      alignment: 'Neutral',
      experience: 0,
      strength: (rand(1..6) * 3),
      dexterity: (rand(1..6) * 3),
      constitution: (rand(1..6) * 3),
      intelligence: (rand(1..6) * 3),
      wisdom: (rand(1..6) * 3),
      charisma: (rand(1..6) * 3),
      user: player_1,
      campaign: campaign_1
    )
  end


  describe "GET /index" do
    context 'when a user is logged in' do
      before do
        post '/api/login', params: { username: player_1.username, password: player_1.password }  
      end

      it 'returns the user\'s characters' do
        get "/api/characters"
        expect(response.body).to include_json([character_1])
      end

      it 'has a status of 200 (Ok)' do
        get "/api/characters"
        expect(response).to have_http_status(:ok)
      end
    end
    context 'when a user is not logged in' do
      it 'returns the error messages' do
        get "/api/characters"
        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end
      it 'returns a status of 401 (Unauthorized)' do
        get "/api/characters"
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
