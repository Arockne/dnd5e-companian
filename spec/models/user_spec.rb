require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) do 
    User.create!(
      username: 'bob', 
      email: 'bob123@bob.com', 
      email_confirmation: 'bob123@bob.com', 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end

  subject(:duplicate_user) do
    User.create!(
      username: 'bob', 
      email: 'bob123@bob.com', 
      email_confirmation: 'bob123@bob.com', 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end
  
  describe "user validations" do
    context "Invalid User" do
      it "raises exception when creating user with no data" do
        expect { User.create!() }.to raise_exception ActiveRecord::RecordInvalid
      end
      it "raises exception when username is empty" do
        expect { User.create!(username: '') }.to raise_exception ActiveRecord::RecordInvalid
      end
      it "raises exception when username or email has been taken" do
        expect(duplicate_user).to raise_exception ActiveRecord::RecordInvalid
      end
    end
  end
end
