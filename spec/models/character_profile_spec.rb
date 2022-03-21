require 'rails_helper'

RSpec.describe CharacterProfile, type: :model do
  
  describe 'attributes' do
    [:age, :height, :weight, :eyes, :skin, :hair, :gender, :appearance, :backstory].each do |attr|
      it { is_expected.to respond_to(attr) }
    end
  end

  describe 'validations' do
    it { is_expected.to validate_numericality_of(:age).is_greater_than(0) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:character) }
  end
end
