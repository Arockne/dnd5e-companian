require 'rails_helper'

RSpec.describe CampaignUser, type: :model do
  
  describe 'attributes' do
    it { is_expected.to respond_to(:user) }
    it { is_expected.to respond_to(:campaign) }
  end
  
end
