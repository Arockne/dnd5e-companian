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
  password: 'test123'
)
user_2 = User.create(
  username: 'karen', 
  email: 'karen@gmail.com',
  password: 'test123'
)
user_3 = User.create(
  username: 'sam', 
  email: 'sam@gmail.com',
  password: 'test123'
)

users = [user_1, user_2, user_3]

puts 'Creating campaigns'

campaign_1 = Campaign.create!(
  name: 'Knights of the Round Table', 
  setting: 'Somewhere in Camelot', 
  owner: user_1, 
  password: 'test123',
)

campaign_2 = Campaign.create!(
  name: 'Star Wards', 
  setting: 'In a hospital far far away', 
  owner: user_2, 
  password: 'test123',
)

user_1.campaign_users.create!(campaign: campaign_2)

(1..50).each do
  campaign = Campaign.create(
    name: Faker::Games::ElderScrolls.city, 
    setting: Faker::Lorem.paragraphs(number: 20).join(' '), 
    owner: users[rand(0..2)], 
    password: 'test123',
  )
  filtered_users = users.filter { |user| user.username != campaign.owner.username }
  filtered_users.each_entry { |user| user.campaign_users.create!(campaign: campaign)}
end

def roll_stat()
  dice = []
  dice_amount = 4
  dice_amount.times do 
    dice << rand(1..6)
  end
  dice.sort.drop(1).sum
end

puts 'Creating characters'

(1..50).each do
  Character.create(
    name: Faker::Name.unique.name,
    background: Faker::Games::DnD.background,
    race: Faker::Games::DnD.race,
    profession: Faker::Games::DnD.klass,
    alignment: Faker::Games::DnD.alignment,
    strength: roll_stat,
    dexterity: roll_stat,
    constitution: roll_stat,
    intelligence: roll_stat,
    wisdom: roll_stat,
    charisma: roll_stat,
    user: user_1,
    campaign: campaign_2
  )
end

puts 'finished seeding 🌹'
