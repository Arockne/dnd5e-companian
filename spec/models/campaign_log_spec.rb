require 'rails_helper'

RSpec.describe CampaignLog, type: :model do
  
  describe 'attributes' do
    it { is_expected.to respond_to(:color) }
    it { is_expected.to respond_to(:message) }
    it { is_expected.to respond_to(:campaign_id) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:color) }
    it { is_expected.to validate_presence_of(:message) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:campaign) }
  end
end
