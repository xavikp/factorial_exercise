# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#

contacts = Contact.create([
    {
        first_name: "Xavier",
        last_name: "Val",
        phone_number: 11111111,
        email: "test@gmail.com"
    }
])
