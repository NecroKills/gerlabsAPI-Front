class CreateDisciplines < ActiveRecord::Migration[5.0]
  def change
    create_table :disciplines do |t|
      t.string :name
      t.string :code
      t.references :course, foreign_key: true

      t.timestamps
    end
  end
end
