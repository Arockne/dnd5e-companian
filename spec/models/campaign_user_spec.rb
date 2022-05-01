require 'rails_helper'

RSpec.describe CampaignUser, type: :model do
  let(:campaign_owner) do
    User.create!(
      username: 'arthur',
      email: 'arthur@camelot.com',
      password: 'test123'
    )
  end
  
  let(:other_user) do
    User.create!(
      username: 'bob',
      email: 'bob@gmail.com',
      password: 'test123'
    )
  end

  let(:campaign) do
    Campaign.create!(
      name: 'Knights of the Round Table', 
      setting: 'Somewhere in Camelot', 
      owner: campaign_owner, 
      password: 'king', 
      password_confirmation: 'king'
    )
  end

  subject(:user_campaign) { CampaignUser.create(user: other_user, campaign: campaign)}
  
  describe 'attributes' do
    it { is_expected.to respond_to(:user) }
    it { is_expected.to respond_to(:campaign) }
  end

  describe 'validations' do
    it { is_expected.to validate_uniqueness_of(:user_id).scoped_to(:campaign_id)}
  end

  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:campaign) }
  end

end
