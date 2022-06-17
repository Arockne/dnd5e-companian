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

(1..35).each do
  setting = []
  10.times do
    setting.push(Faker::Quotes::Shakespeare.unique.hamlet_quote)
  end
  campaign = Campaign.create(
    name: Faker::Games::ElderScrolls.unique.city, 
    setting: setting.join(' '), 
    owner: users[rand(0..2)], 
    password: 'test123',
  )
  filtered_users = users.filter { |user| user.username != campaign.owner.username }
  filtered_users.each_entry { |user| user.campaign_users.create!(campaign: campaign)}
  Faker::Quotes::Shakespeare.unique.clear
end

20.times do 
  setting = []
  8.times do
    setting.push(Faker::Quotes::Shakespeare.unique.king_richard_iii_quote)
  end
  Campaign.create(
    name: Faker::Games::Zelda.location, 
    setting: setting.join(' '),
    owner: users[rand(0..2)], 
    password: 'test123',
  )
  Faker::Quotes::Shakespeare.unique.clear
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

Campaign.all.each_entry do |campaign|
    filtered_users = users.filter { |user| user.username != campaign.owner.username }
    10.times do
      name = Faker::Name.unique.name
      appearance = []
      backstory = []
      
      10.times do
        appearance.push(Faker::Fantasy::Tolkien.unique.poem)
        backstory.push(Faker::ChuckNorris.unique.fact.gsub(/Chuck Norris|Chuck/i, name))
      end
      
      Faker::Fantasy::Tolkien.unique.clear
      Faker::ChuckNorris.unique.clear
  
      selected_user = filtered_users[rand(0...filtered_users.length)]
      character = Character.create(
        name: name,
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
        user: selected_user,
        campaign: campaign,
        age: rand(15..1000), 
        height: "#{rand(160...200)}cm", 
        weight: "#{rand(50...150)}kg", 
        eyes: Faker::Color.hex_color, 
        hair: Faker::Color.hex_color,
        skin: Faker::Color.hex_color,
        gender: 'Male', 
        appearance: appearance.join(' '), 
        backstory: backstory.join(' ')
      )
  end
end




puts 'finished seeding 🌹'