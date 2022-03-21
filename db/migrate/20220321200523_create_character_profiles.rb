class CreateCharacterProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :character_profiles do |t|
      t.integer :age, default: 0
      t.string :height, default: ''
      t.string :weight, default: ''
      t.string :eyes, default: ''
      t.string :skin, default: ''
      t.string :hair, default: ''
      t.string :gender, default: ''
      t.text :appearance, default: ''
      t.text :backstory, default: ''
      t.belongs_to :character, null: false, foreign_key: true

      t.timestamps
    end
  end
end
