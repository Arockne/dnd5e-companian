class AddBackstoryToCharacter < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :backstory, :string, default: ''
  end
end
