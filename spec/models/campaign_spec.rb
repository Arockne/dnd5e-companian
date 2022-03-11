require 'rails_helper'

RSpec.describe Campaign, type: :model do

  describe 'attributes' do
    it { is_expected.to respond_to(:owner) }
    it { is_expected.to respond_to(:name) }
    it { is_expected.to respond_to(:setting) }
    it { is_expected.to respond_to(:password_digest) }
  end

  describe 'validations' do
    it { is_expected.to have_secure_password }
    it { is_expected.to validate_presence_of(:password_confirmation) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(30) }
  end

end
