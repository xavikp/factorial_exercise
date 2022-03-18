class ContactSerializer
  include FastJsonapi::ObjectSerializer
  attributes :first_name, :last_name, :phone_number, :email

  has_many :edits
end
