require 'rails_helper'

RSpec.describe Campaign, type: :model do
  let(:user) do
    User.create!(
      username: 'arthur',
      email: 'arthur@camelot.com',
      password: 'test1234'
    )
  end
  before do
    Campaign.create(
      name: 'Knights of the Round Table', 
      image_url: 'https://cdnb.artstation.com/p/assets/images/images/023/999/093/large/gregory-nunkovics-dark-fantasy-landscape.jpg?1580994868',
      setting: 'Somewhere in Camelot', 
      owner: user, 
      password: 'king1234', 
    )
    Campaign.create(
      name: 'Star Wards', 
      image_url: 'https://cdnb.artstation.com/p/assets/images/images/023/999/093/large/gregory-nunkovics-dark-fantasy-landscape.jpg?1580994868',
      setting: 'In a hospital far far away...', 
      owner: user, 
      password: 'king1234', 
    )
  end

  describe 'valid campaign' do   
    it 'with valid attributes' do
      expect(Campaign.new(
        name: 'Star Track', 
        image_url: 'https://cdnb.artstation.com/p/assets/images/images/023/999/093/large/gregory-nunkovics-dark-fantasy-landscape.jpg?1580994868',
        setting: 'Voyage to many track and fields never seen before...', 
        owner: user, 
        password: 'king1234'
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
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(30) }
    it { is_expected.to validate_uniqueness_of(:name).case_insensitive}
    it { is_expected.to validate_presence_of(:image_url) }
    it { is_expected.to validate_length_of(:password).is_at_least(8) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:owner) }
    it { is_expected.to have_many(:campaign_users).dependent(:destroy) }
    it { is_expected.to have_many(:users) }
    it { is_expected.to have_many(:characters).dependent(:destroy) }
  end

end
