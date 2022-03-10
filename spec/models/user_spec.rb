require 'rails_helper'

RSpec.describe User, type: :model do

  describe 'attributes' do
    it { is_expected.to respond_to(:username) }
    it { is_expected.to respond_to(:email) }
    it { is_expected.to respond_to(:password_digest) }
  end

  describe 'validations' do
    it { is_expected.to have_secure_password }
    it { is_expected.to validate_presence_of(:username)}
    it { is_expected.to validate_uniqueness_of(:username).case_insensitive }
  end
end
