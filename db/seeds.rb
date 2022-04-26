# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts 'seeding file 🌱'

user_1 = User.create(
  username: 'bob', 
  email: 'bob@gmail.com', 
  email_confirmation: 'bob@gmail.com', 
  password: 'test123',
  password_confirmation: 'test123'
)
user_2 = User.create(
  username: 'karen', 
  email: 'karen@gmail.com', 
  email_confirmation: 'karen@gmail.com', 
  password: 'test123',
  password_confirmation: 'test123'
)
user_3 = User.create(
  username: 'sam', 
  email: 'sam@gmail.com', 
  email_confirmation: 'sam@gmail.com', 
  password: 'test123',
  password_confirmation: 'test123'
)

puts 'finished seeding 🌹'
