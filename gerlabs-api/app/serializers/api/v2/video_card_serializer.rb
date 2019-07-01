class Api::V2::VideoCardSerializer < ActiveModel::Serializer
  attributes :id, :name, :memory_gpu

end
