class EditSerializer
  include FastJsonapi::ObjectSerializer
  attributes :date, :previous_first_name, :previous_last_name, :previous_phone_number, :previous_email, :history, :contact_id
end
