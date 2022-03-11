require 'rails_helper'

RSpec.describe Campaign, type: :model do
  
  describe 'attributes' do
    it { is_expected.to respond_to(:owner) }
    it { is_expected.to respond_to(:name) }
    it { is_expected.to respond_to(:setting) }
  end

end
