class CreateCharacters < ActiveRecord::Migration[6.1]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :background
      t.string :race
      t.string :profession
      t.string :alignment
      t.integer :experience
      t.smallint :strength
      t.smallint :dexterity
      t.smallint :constitution
      t.smallint :intelligence
      t.smallint :wisdom
      t.smallint :charisma
      t.belongs_to :campaign_user, null: false, foreign_key: true
      t.belongs_to :campaign, null: false, foreign_key: true

      t.timestamps
    end
  end
end
