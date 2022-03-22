require 'rails_helper'

RSpec.describe "Api::CharacterProfiles", type: :request do
  let!(:user_1) do 
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

  let(:user_3) do
    User.create!(
      username: 'Jill',
      email: 'jill@gmail.com',
      email_confirmation: 'jill@gmail.com', 
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

  let!(:campaign_3) do
    Campaign.create!(
      name: 'Coderama', 
      setting: 'Code in the future...', 
      owner: user_2, 
      password: 'test123', 
      password_confirmation: 'test123'
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
      image_url: '',
      strength: (rand(1..6) * 3),
      dexterity: (rand(1..6) * 3),
      constitution: (rand(1..6) * 3),
      intelligence: (rand(1..6) * 3),
      wisdom: (rand(1..6) * 3),
      charisma: (rand(1..6) * 3),
      user: user_2,
      campaign: campaign_1
    )
  end
  let!(:character_profile_1) do
    CharacterProfile.create(character: character_1)
  end

  let(:character_2) do
    Character.create!(
      name: 'Gimly',
      background: 'Noble',
      race: 'Elf',
      profession: 'Wizard',
      alignment: 'Neutral good',
      experience: 0,
      image_url: '',
      strength: (rand(1..6) * 3),
      dexterity: (rand(1..6) * 3),
      constitution: (rand(1..6) * 3),
      intelligence: (rand(1..6) * 3),
      wisdom: (rand(1..6) * 3),
      charisma: (rand(1..6) * 3),
      user: user_1,
      campaign: campaign_3
    )
  end

  let!(:character_profile_2) do
    CharacterProfile.create(character: character_2)
  end

  describe "PATCH /update" do
    let!(:character_profile_params) do
      {
        character_profile: {
          age: 78,
          height: '300cm',
          weight: '500lb',
          eyes: 'brown',
          skin: 'grey',
          hair: 'bald',
          gender: 'male',
          appearance: 'some bald guy',
          backstory: 'an old shop keeper that sells things'
        }
      }
    end
    context 'when a user is logged in' do
      before do
        post '/api/login', params: { username: user_1.username, password: user_1.password }  
      end

      context 'as the creator of the character' do
        it 'returns the updated character profile' do
          patch "/api/campaigns/#{character_2.campaign_id}/characters/#{character_2.id}/character_profiles/#{character_profile_2.id}", params: character_profile_params
          expects(response.body).to include_json({
            id: a_kind_of(:id),
            age: 78,
            height: '300cm',
            weight: '500lb',
            eyes: 'brown',
            skin: 'grey',
            hair: 'bald',
            gender: 'male',
            appearance: 'some bald guy',
            backstory: 'an old shop keeper that sells things'
          })
        end

        it 'returns a status of 200 (Ok)' do
          patch "/api/campaigns/#{character_2.campaign_id}/characters/#{character_2.id}/character_profiles/#{character_profile_2.id}", params: character_profile_params
          expects(response).to have_http_status(:ok)
        end
      end

      context 'not the creator of the character' do
        it 'returns error messages' do
          patch "/api/campaigns/#{character_1.campaign_id}/characters/#{character_1.id}/character_profiles/#{character_profile_1.id}", params: character_profile_params
          expect(response.body).to include_json({
            errors: a_kind_of(Array)
          })
        end
        
        it 'returns a status of 401 (Unauthorized)' do
          patch "/api/campaigns/#{character_1.campaign_id}/characters/#{character_1.id}/character_profiles/#{character_profile_1.id}", params: character_profile_params
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end
    context 'when a user is not logged in' do
      it 'returns error messages'
      it 'returns a 401 (Unauthorized)'
    end
  end
end
