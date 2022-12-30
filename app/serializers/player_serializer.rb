class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :username, :characters

  def characters
    object.characters.select(:id, :name, :visible)
  end
end
