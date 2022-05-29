class CreateCharacters < ActiveRecord::Migration[6.1]
  def change
    create_table :characters do |t|
      t.string :name, default: ""
      t.string :background, default: ""
      t.string :race, default: ""
      t.string :profession, default: ""
      t.string :alignment, default: ""
      t.integer :experience, default: 0
      t.integer :strength, default: 3
      t.integer :dexterity, default: 3
      t.integer :constitution, default: 3
      t.integer :intelligence, default: 3
      t.integer :wisdom, default: 3
      t.integer :charisma, default: 3
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :campaign, null: false, foreign_key: true

      t.timestamps
    end
  end
end
