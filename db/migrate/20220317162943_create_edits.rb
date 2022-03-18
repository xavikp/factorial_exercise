# frozen_string_literal: true
class CreateEdits < ActiveRecord::Migration[7.0]
  def change
    create_table :edits do |t|
      t.string :date
      t.string :previous_first_name
      t.string :previous_last_name
      t.integer :previous_phone_number
      t.string :previous_email
      t.string :history
      t.belongs_to :contact, null: false, foreign_key: true, type: t.integer

      t.timestamps
    end
  end
end
