class AddGenderToCharacter < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :gender, :string, default: ''
  end
end
