require 'rails_helper'

RSpec.describe CampaignLog, type: :model do
  
  describe 'attributes' do
    it { is_expected.to respond_to(:color) }
    it { is_expected.to respond_to(:message) }
    it { is_expected.to respond_to(:campaign_id) }
  end
end
