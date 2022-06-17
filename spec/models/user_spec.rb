require 'rails_helper'

RSpec.describe User, type: :model do

  describe 'valid user' do 
    it 'is valid with valid attributes' do
      expect(
        User.new(
          username: 'bob',
          email: 'bob@gmail.com',
          password: 'test1234'
        )
      ).to be_valid
    end
  end

  describe 'attributes' do
    it { is_expected.to respond_to(:username) }
    it { is_expected.to respond_to(:email) }
    it { is_expected.to respond_to(:password_digest) }
  end

  describe 'validations' do
    it { is_expected.to have_secure_password }
    it { is_expected.to validate_presence_of(:username)}
    it { is_expected.to validate_uniqueness_of(:username).case_insensitive }
    it { is_expected.to validate_length_of(:username).is_at_least(3)}
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
    it { is_expected.to validate_length_of(:password).is_at_least(8)}
  end

  describe 'associations' do
    it { is_expected.to have_many(:owned_campaigns).dependent(:destroy) }
    it { is_expected.to have_many(:campaign_users).dependent(:destroy) }
    it { is_expected.to have_many(:campaigns) }
    it { is_expected.to have_many(:characters).dependent(:destroy) }
  end
end
