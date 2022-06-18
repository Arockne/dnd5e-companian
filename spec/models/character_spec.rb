require 'rails_helper'

RSpec.describe Character, type: :model do
  
  describe 'attributes' do
    it { is_expected.to respond_to(:name) }
    it { is_expected.to respond_to(:background) }
    it { is_expected.to respond_to(:race) }
    it { is_expected.to respond_to(:klass) }
    it { is_expected.to respond_to(:alignment) }
    it { is_expected.to respond_to(:experience) }
    it { is_expected.to respond_to(:strength) }
    it { is_expected.to respond_to(:dexterity) }
    it { is_expected.to respond_to(:constitution) }
    it { is_expected.to respond_to(:intelligence) }
    it { is_expected.to respond_to(:wisdom) }
    it { is_expected.to respond_to(:charisma) }
    it { is_expected.to respond_to(:visible) }
    it { is_expected.to respond_to(:user_id) }
    it { is_expected.to respond_to(:campaign_id) }
    [:age, :height, :weight, :eyes, :skin, :hair, :gender, :appearance, :backstory].each do |attr|
      it { is_expected.to respond_to(attr) }
    end
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:background) }
    it { is_expected.to validate_presence_of(:race) }
    it { is_expected.to validate_presence_of(:klass) }
    it { is_expected.to validate_presence_of(:image_url) }
    
    it do 
      is_expected.to validate_inclusion_of(:alignment).
      in_array([ 'Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil' ])
    end

    it { is_expected.to validate_numericality_of(:experience).is_greater_than_or_equal_to(0) }

    [:strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma].each do |ability_score|
      it { is_expected.to validate_numericality_of(ability_score).is_greater_than_or_equal_to(0).on(:update) }
      it { is_expected.to validate_numericality_of(ability_score).is_greater_than_or_equal_to(3).on(:create) }
      it { is_expected.to validate_numericality_of(ability_score).is_less_than_or_equal_to(30) }
    end

  end

  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:campaign) }
  end

end
