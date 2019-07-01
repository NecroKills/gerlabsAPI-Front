class Api::V2::DisciplineSerializer < ActiveModel::Serializer
  attributes :id, :name, :code, :course_id

  belongs_to :course
end
