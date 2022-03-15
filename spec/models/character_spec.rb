require 'rails_helper'

RSpec.describe Character, type: :model do
  
  describe 'attributes' do
    it { is_expected.to respond_to(:name) }
    it { is_expected.to respond_to(:background) }
    it { is_expected.to respond_to(:race) }
    it { is_expected.to respond_to(:profession) }
    it { is_expected.to respond_to(:alignment) }
    it { is_expected.to respond_to(:experience) }
    it { is_expected.to respond_to(:strength) }
    it { is_expected.to respond_to(:dexterity) }
    it { is_expected.to respond_to(:constitution) }
    it { is_expected.to respond_to(:intelligence) }
    it { is_expected.to respond_to(:wisdom) }
    it { is_expected.to respond_to(:charisma) }
    it { is_expected.to respond_to(:campaign_user_id) }
    it { is_expected.to respond_to(:campaign_id) }
  end

end
