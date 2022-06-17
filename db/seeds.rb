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

character_images = [
  'https://i.pinimg.com/originals/c7/f7/b2/c7f7b2e00646a1a1e1f625ec504e0530.jpg',
  'https://i.pinimg.com/474x/15/2f/ae/152fae1f947c5a6cc69213c0e44c4ba6.jpg',
  'https://i.pinimg.com/474x/dc/c5/29/dcc529ddfe413d62e77be948aa1ccbaa.jpg',
  'https://i.pinimg.com/originals/c1/7e/0a/c17e0a1467b8ea90f32b681015fe351b.jpg',
  'https://i.pinimg.com/originals/97/ba/37/97ba379d249f5139628fa9a42e55140b.png',
  'https://i.pinimg.com/474x/25/db/91/25db9125dd421502375b1db3530109bf.jpg',
  'https://i.pinimg.com/originals/c5/cb/d4/c5cbd4ac240bf7e7937851a9cb53da4e.jpg',
  'https://i.pinimg.com/originals/da/34/31/da343123d7e23bcdfdf2f4a207cfe7eb.jpg',
  'https://i.pinimg.com/736x/6f/46/34/6f46344fa378c5cf1c43d2024fff20bc.jpg',
  'https://i.pinimg.com/736x/9b/ce/40/9bce400b4660c1918b8e0c0eb725bfce.jpg',
  'https://i.pinimg.com/564x/5a/d1/a6/5ad1a6a09ba613d248d56a098c8792ad.jpg',
  'https://i.pinimg.com/736x/48/53/91/485391ab775f002594475afb2755ea73.jpg',
  'https://i.pinimg.com/736x/25/04/f6/2504f618ac3ee1230f2eadd3f9db2fa5.jpg',
  'https://i.pinimg.com/564x/95/2e/85/952e858c7b2938ab9a75313ff21c7a0c.jpg',
  'https://i.pinimg.com/736x/9c/85/a4/9c85a458e0b15010040e537afbaf28f2--character-portraits-character-art.jpg'
]

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
        image_url: character_images[rand(0...character_images.length)],
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