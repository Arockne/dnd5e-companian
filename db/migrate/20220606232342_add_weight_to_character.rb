class AddWeightToCharacter < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :weight, :string, default: ''
  end
end
