require 'rails_helper'

RSpec.describe CampaignUser, type: :model do
  let(:campaign_owner) do
    User.create!(
      username: 'arthur',
      email: 'arthur@camelot.com',
      password: 'test1234'
    )
  end
  
  let(:other_user) do
    User.create!(
      username: 'bob',
      email: 'bob@gmail.com',
      password: 'test1234'
    )
  end

  let(:campaign) do
    Campaign.create!(
      name: 'Knights of the Round Table', 
      image_url: 'https://cdnb.artstation.com/p/assets/images/images/023/999/093/large/gregory-nunkovics-dark-fantasy-landscape.jpg?1580994868',
      setting: 'Somewhere in Camelot', 
      owner: campaign_owner, 
      password: 'king1234'
    )
  end

  subject(:user_campaign) { CampaignUser.create(user: other_user, campaign: campaign)}
  
  describe 'attributes' do
    it { is_expected.to respond_to(:user) }
    it { is_expected.to respond_to(:campaign) }
  end

  describe 'validations' do
    it { is_expected.to validate_uniqueness_of(:user_id).scoped_to(:campaign_id).with_message("is already a player of Knights of the Round Table")}
  end

  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:campaign) }
  end

end
