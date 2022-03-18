# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

contact_seed = Contact.create([{
                            first_name: "Xavier",
                            last_name: "Val",
                            phone_number: 123456789,
                            email: "test@gmail.com"
                          }])

Edit.create([{
                 date: "none",
                 previous_first_name: "test",
                 previous_last_name: "test",
                 previous_phone_number: 000000000,
                 previous_email: "test@gmail.com",
                 history: "",
                 contact: contact_seed[0]
               }])
