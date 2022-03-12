require 'rails_helper'

RSpec.describe "Campaigns", type: :request do
  let!(:user_1) do 
    User.create!(
      username: 'arthur',
      email: 'arthur@camelot.com',
      email_confirmation: 'arthur@camelot.com', 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end
    
  let!(:user_2) do
    User.create!(
      username: 'bob',
      email: 'bob@gmail.com',
      email_confirmation: 'bob@gmail.com', 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end

  before do
    Campaign.create!(
      name: 'Knights of the Round Table', 
      setting: 'Somewhere in Camelot', 
      owner: user_1, 
      password: 'king', 
      password_confirmation: 'king'
    )
    Campaign.create!(
      name: 'Star Wards', 
      setting: 'In a hospital far far away', 
      owner: user_2, 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end

  describe "GET /index" do
    pending "add some examples (or delete) #{__FILE__}"
  end
end
