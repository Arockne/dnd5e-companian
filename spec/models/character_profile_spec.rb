require 'rails_helper'

RSpec.describe CharacterProfile, type: :model do
  
  describe 'attributes' do
    [:age, :height, :weight, :eyes, :skin, :hair, :gender, :appearance, :backstory].each do |attr|
      it { is_expected.to respond_to(attr) }
    end
  end
end
