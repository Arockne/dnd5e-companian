require 'rails_helper'

RSpec.describe Campaign, type: :model do

  describe 'valid campaign' do
    let(:user) do
      User.create!(
        username: 'arthur',
        email: 'arthur@camelot.com',
        email_confirmation: 'arthur@camelot.com', 
        password: 'test123', 
        password_confirmation: 'test123'
      )
    end
    
    it 'with valid attributes' do
      expect(Campaign.new(
        name: 'Knights of the Round Table', 
        setting: 'Somewhere in Camelot', 
        owner: user, 
        password: 'king', 
        password_confirmation: 'king'
      )).to be_valid
    end
  end

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
