require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) do 
    User.new(
      username: 'bob', 
      email: 'bob123@bob.com', 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end
  
  describe "user validations" do
    context "valid user" do
      it "saves user successfully" do
        expect(user.save).to eql true
      end
    end

    context "Invalid User" do
      it "raises exception when creating user with no data" do
        expect { User.create!() }.to raise_exception ActiveRecord::RecordInvalid
      end
      it "raises exception when username is empty" do
        expect { User.create!(username: '') }.to raise_exception ActiveRecord::RecordInvalid
      end
      it "returns false when creating a duplicate user" do
        user.save
        duplicate_user = user.dup
        expect(duplicate_user.valid?).to eql false
      end
      it "returns false when creating a user with a duplicate email" do
        user.save
        duplicate_user = user.dup
        duplicate_user.username = 'billy'
        expect(duplicate_user.valid?).to eql false
      end
      it "returns false when creating a user with a duplicate username" do
        user.save
        duplicate_user = user.dup
        duplicate_user.email = 'another@gmail.com'
        expect(duplicate_user.valid?).to eql false
      end
    end
  end

end
