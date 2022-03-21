require 'rails_helper'

RSpec.describe "Api::Characters", type: :request do
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

  let!(:visible_character) do
    Character.create!(
      name: 'Ally',
      background: 'Merchant',
      race: 'Orc',
      profession: 'Barbarian',
      alignment: 'Neutral',
      experience: 0,
      image_url: '',
      strength: (rand(1..6) * 3),
      dexterity: (rand(1..6) * 3),
      constitution: (rand(1..6) * 3),
      intelligence: (rand(1..6) * 3),
      wisdom: (rand(1..6) * 3),
      charisma: (rand(1..6) * 3),
      visible: true,
      user: user_3,
      campaign: campaign_3
    )
  end

  let!(:invisible_character) do
    Character.create!(
      name: 'Ally',
      background: 'Merchant',
      race: 'Orc',
      profession: 'Barbarian',
      alignment: 'Neutral',
      experience: 0,
      image_url: '',
      strength: (rand(1..6) * 3),
      dexterity: (rand(1..6) * 3),
      constitution: (rand(1..6) * 3),
      intelligence: (rand(1..6) * 3),
      wisdom: (rand(1..6) * 3),
      charisma: (rand(1..6) * 3),
      visible: false,
      user: user_3,
      campaign: campaign_3
    )
  end

  describe "GET /index" do
    context 'when a user is logged in' do
      before do
        post '/api/login', params: { username: user_2.username, password: user_2.password }  
      end

      it 'returns the user\'s characters' do
        get "/api/characters"
        expect(response.body).to include_json([
          {
            name: character_1.name,
            image_url: a_kind_of(String),
            profession: character_1.profession,
            campaign: a_kind_of(Hash)
          }
        ])
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

  describe 'POST /create' do
    let!(:character_params) do
      { 
        name: 'Tommy',
        background: 'Guild artisan',
        race: 'Human',
        profession: 'Monk',
        alignment: 'Lawful neutral',
        experience: 0,
        image_url: '',
        strength: (rand(1..6) * 3),
        dexterity: (rand(1..6) * 3),
        constitution: (rand(1..6) * 3),
        intelligence: (rand(1..6) * 3),
        wisdom: (rand(1..6) * 3),
        charisma: (rand(1..6) * 3),
      }
    end

    context 'when a user is logged in' do
      before do
        post "/api/login", params: { username: user_1.username, password: user_1.password }
      end

      context 'being member of the campaign' do
        before do
          CampaignUser.create(user: user_1, campaign: campaign_2)
        end

        it 'updates the amount of characters by one' do
          expect { post "/api/campaigns/#{campaign_2.id}/characters", params: character_params }.to change(Character, :count).by(1)
        end

        it 'returns the created character' do
          post "/api/campaigns/#{campaign_2.id}/characters", params: character_params
          expect(response.body).to include_json({
            name: 'Tommy',
            background: 'Guild artisan',
            race: 'Human',
            profession: 'Monk',
            alignment: 'Lawful neutral',
            experience: 0,
            image_url: '',
            strength: a_kind_of(Integer),
            dexterity: a_kind_of(Integer),
            constitution: a_kind_of(Integer),
            intelligence: a_kind_of(Integer),
            wisdom: a_kind_of(Integer),
            charisma: a_kind_of(Integer)
          })  
        end

        it 'returns a status of 201 (Created)' do
          post "/api/campaigns/#{campaign_2.id}/characters", params: character_params
          expect(response).to have_http_status(:created)
        end
      end

      context 'being the owner of the campaign' do
        it 'updates the amount of characters by one' do
          expect { post "/api/campaigns/#{campaign_1.id}/characters", params: character_params }.to change(Character, :count).by(1)
        end

        it 'returns the created character' do
          post "/api/campaigns/#{campaign_1.id}/characters", params: character_params
          expect(response.body).to include_json({
            name: 'Tommy',
            background: 'Guild artisan',
            race: 'Human',
            profession: 'Monk',
            alignment: 'Lawful neutral',
            experience: 0,
            image_url: '',
            strength: a_kind_of(Integer),
            dexterity: a_kind_of(Integer),
            constitution: a_kind_of(Integer),
            intelligence: a_kind_of(Integer),
            wisdom: a_kind_of(Integer),
            charisma: a_kind_of(Integer)
          })  
        end

        it 'returns a status of 201 (Created)' do
          post "/api/campaigns/#{campaign_1.id}/characters", params: character_params
          expect(response).to have_http_status(:created)
        end
      end

      context 'not being a member of the campaign' do
        it 'returns the error messages' do
          post "/api/campaigns/#{campaign_2.id}/characters", params: character_params
          expect(response.body).to include_json({
            errors: a_kind_of(Array)
          })
        end
  
        it 'returns a status of 401 (Unauthorized)' do
          post "/api/campaigns/#{campaign_2.id}/characters", params: character_params
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end

    context 'when a user is not logged in' do
      it 'returns the error messages' do
        post "/api/campaigns/#{campaign_2.id}/characters", params: character_params
        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end

      it 'returns a status of 401 (Unauthorized)' do
        post "/api/campaigns/#{campaign_2.id}/characters", params: character_params
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /show' do
    context 'when a user is logged in' do
      before do
        post '/api/login', params: { username: user_1.username, password: user_1.password }  
      end

      context 'being the creator of the character as a member' do
        before do
          CampaignUser.create(user: user_1, campaign: campaign_3) 
        end

        it 'returns the character' do
          get "/api/campaigns/#{character_2.campaign_id}/characters/#{character_2.id}"
          expect(response.body).to include_json({
            id: a_kind_of(Integer),
            name: character_2.name
          })
        end
        it 'returns a status of 200 (Ok)' do
          get "/api/campaigns/#{character_2.campaign_id}/characters/#{character_2.id}"
          expect(response).to have_http_status(:ok)
        end
      end
      
      context 'being the owner of the campaign' do
        it 'returns the character' do
          get "/api/campaigns/#{character_1.campaign_id}/characters/#{character_1.id}"
          expect(response.body).to include_json({
            id: a_kind_of(Integer),
            name: character_1.name
          })
        end
        it 'returns a status of 200 (Ok)' do
          get "/api/campaigns/#{character_1.campaign_id}/characters/#{character_1.id}"
          expect(response).to have_http_status(:ok)
        end
      end

      context 'being a member of the campaign' do
        before do
          CampaignUser.create(user: user_1, campaign: campaign_3) 
        end

        context 'the character allows visibility' do
          it 'returns the character' do
            get "/api/campaigns/#{visible_character.campaign_id}/characters/#{visible_character.id}"
            expect(response.body).to include_json({
              id: a_kind_of(Integer),
              name: visible_character.name
            })
          end
          it 'returns a status of 200 (Ok)' do
            get "/api/campaigns/#{visible_character.campaign_id}/characters/#{visible_character.id}"
            expect(response).to have_http_status(:ok)
          end
        end

        context 'the character does not allow visibility' do
          it 'returns the error messages' do
            get "/api/campaigns/#{invisible_character.campaign_id}/characters/#{invisible_character.id}"
            expect(response.body).to include_json({
              errors: a_kind_of(Array)
            })
          end

          it 'returns a status of 401 (Unauthorized)' do
            get "/api/campaigns/#{invisible_character.campaign_id}/characters/#{invisible_character.id}"
            expect(response).to have_http_status(:unauthorized)
          end
        end

        context 'the character does not exist' do
          it 'returns the error messages' do
            get "/api/campaigns/#{campaign_3.id}/characters/0"
            expect(response.body).to include_json({
              errors: a_kind_of(Array)
            })
          end

          it 'returns a status of 404 (Not Found)' do
            get "/api/campaigns/#{campaign_3.id}/characters/0"
            expect(response).to have_http_status(:not_found)
          end
        end
      end

      context 'not affiliated with the campaign' do
        it 'returns the error messages' do
          get "/api/campaigns/#{visible_character.campaign_id}/characters/#{visible_character.id}"
          expect(response.body).to include_json({
            errors: a_kind_of(Array)
          })
        end
        
        it 'returns a status of 401 (Unauthorized)' do
          get "/api/campaigns/#{visible_character.campaign_id}/characters/#{visible_character.id}"
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end
    
    context 'when a user is not logged in' do
      it 'returns the error messages' do
        get "/api/campaigns/#{character_1.campaign_id}/characters/#{character_1.id}"
        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end

      it 'returns a status of 401 (Unauthorized)' do
        get "/api/campaigns/#{character_1.campaign_id}/characters/#{character_1.id}"
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'PATCH /update' do
    let!(:character_params) do
      {
        name: 'Updatedname',
        background: 'Updatedbackground',
        race: 'Updatedrace',
        profession: 'Updatedprofession',
        alignment: 'Updatedalignment',
        experience: 999999999,
        image_url: '',
        strength: 18,
        dexterity: 18,
        constitution: 18,
        intelligence: 18,
        wisdom: 18,
        charisma: 18
      }
    end

    context 'when a user is logged in' do
      before do
        post '/api/login', params: { username: user_1.username, password: user_1.password }
      end

      context 'as the creator of the character' do
        before do
          CampaignUser.create!(user: user_1, campaign: campaign_3)
        end

        it 'returns the updated character' do
          patch "/api/campaigns/#{character_2.campaign_id}/characters/#{character_2.id}", params: character_params
          expect(response.body).to include_json({
            id: character_2.id,
            name: 'Updatedname',
            background: 'Updatedbackground',
            race: 'Updatedrace',
            profession: 'Updatedprofession',
            alignment: 'Updatedalignment',
            experience: 999999999,
            image_url: '',
            strength: 18,
            dexterity: 18,
            constitution: 18,
            intelligence: 18,
            wisdom: 18,
            charisma: 18
          })
        end

        it 'returns a status of 200 (Ok)' do
          patch "/api/campaigns/#{character_2.campaign_id}/characters/#{character_2.id}", params: character_params
          expect(response).to have_http_status(:ok)
        end
      end

      context 'as campaign owner' do
        it 'returns the updated character' do
          patch "/api/campaigns/#{character_1.campaign_id}/characters/#{character_1.id}", params: character_params
          expect(response.body).to include_json({
            id: character_1.id,
            name: 'Updatedname',
            background: 'Updatedbackground',
            race: 'Updatedrace',
            profession: 'Updatedprofession',
            alignment: 'Updatedalignment',
            experience: 999999999,
            image_url: '',
            strength: 18,
            dexterity: 18,
            constitution: 18,
            intelligence: 18,
            wisdom: 18,
            charisma: 18
          })
        end

        it 'returns a status of 200 (Ok)' do
          patch "/api/campaigns/#{character_1.campaign_id}/characters/#{character_1.id}", params: character_params
          expect(response).to have_http_status(:ok)
        end
      end

      context 'not affiliated with the campaign' do
        it 'returns error messages'
        it 'returns a status of 401 (Unauthorized)'
      end
    end
    context 'when a user is not logged in' do
      it 'returns error messages'
      it 'returns a status of 401 (Unauthorized)'
    end
  end

  describe 'DELETE /destroy' do
    context 'when a user is logged in' do
      before do
        post '/api/login', params: { username: user_1.username, password: user_1.password }  
      end

      context 'as the creator of the character' do
        before do
          CampaignUser.create(user: user_1, campaign_id: character_2.campaign_id) 
        end

        it 'decreases the amount of characters' do
          expect do
            delete "/api/campaigns/#{character_2.campaign_id}/characters/#{character_2.id}"
          end.to change(Character, :count).by(-1)
        end

        it 'returns the removed character' do
          delete "/api/campaigns/#{character_2.campaign_id}/characters/#{character_2.id}"
          expect(response.body).to include_json({
            id: character_2.id,
            name: character_2.name
          })
        end

        it 'returns a status of 200 (Ok)' do
          delete "/api/campaigns/#{character_2.campaign_id}/characters/#{character_2.id}"
          expect(response).to have_http_status(:ok)
        end
      end
      
      context 'as the campaign owner' do
        it 'decreases the amount of characters' do
          expect do
            delete "/api/campaigns/#{character_1.campaign_id}/characters/#{character_1.id}"
          end.to change(Character, :count).by(-1)
        end

        it 'returns the removed character' do
          delete "/api/campaigns/#{character_1.campaign_id}/characters/#{character_1.id}"
          expect(response.body).to include_json({
            id: character_1.id,
            name: character_1.name
          })
        end

        it 'returns a status of 200 (Ok)' do
          delete "/api/campaigns/#{character_1.campaign_id}/characters/#{character_1.id}"
          expect(response).to have_http_status(:ok)
        end
      end

      context 'as another member of the campaign' do
        before do
          CampaignUser.create(user: user_1, campaign: campaign_3)
        end
        
        it 'returns error messages' do
          delete "/api/campaigns/#{visible_character.campaign_id}/characters/#{visible_character.id}"
          expect(response.body).to include_json({
            errors: a_kind_of(Array)
          })
        end

        it 'returns a status of 401 (Unauthorized)' do
          delete "/api/campaigns/#{visible_character.campaign_id}/characters/#{visible_character.id}"
          expect(response).to have_http_status(:unauthorized)
        end
      end
        
      context 'not affiliated with the campaign' do
        it 'returns error messages' do
          delete "/api/campaigns/#{visible_character.campaign_id}/characters/#{visible_character.id}"
          expect(response.body).to include_json({
            errors: a_kind_of(Array)
          })
        end

        it 'returns a status of 401 (Unauthorized)' do
          delete "/api/campaigns/#{visible_character.campaign_id}/characters/#{visible_character.id}"
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end

    context 'when a user is not logged in' do
        it 'returns error messages' do
          delete "/api/campaigns/#{visible_character.campaign_id}/characters/#{visible_character.id}"
          expect(response.body).to include_json({
            errors: a_kind_of(Array)
          })
        end

        it 'returns a status of 401 (Unauthorized)' do
          delete "/api/campaigns/#{visible_character.campaign_id}/characters/#{visible_character.id}"
          expect(response).to have_http_status(:unauthorized)
        end
    end
  end
end
