class AddHairToCharacter < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :hair, :string, default: ''
  end
end
