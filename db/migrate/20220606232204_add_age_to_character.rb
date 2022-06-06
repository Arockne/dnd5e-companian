class AddAgeToCharacter < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :age, :integer, default: 1
  end
end
