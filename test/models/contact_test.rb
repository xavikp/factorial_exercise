require "test_helper"

class ContactTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def test_db
    contacts = Contact.all
    a = ContactSerializer.new(contacts).serialized_json
    puts a
  end

  def get_info(id)
    contacts = Contact.all
  end

end
