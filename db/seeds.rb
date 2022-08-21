# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts 'seeding file 🌱'

campaign_images = [
  'https://www.designyourway.net/art/wp-content/uploads/2019/06/berube-jonathan-berube-art-director-matte-192-700x374.jpg',
  'https://wallpaperaccess.com/full/2037483.jpg',
  'https://miro.medium.com/max/1400/1*k1x6oDDEtXdQeKTAKQsSbQ.jpeg',
  'https://www.muddycolors.com/wp-content/uploads/2020/04/ua300hjpvmr41.jpg',
  'https://pbs.twimg.com/media/E5rB6LbWQAE5b0d.jpg',
  'https://external-preview.redd.it/5f02pd12CiIAQHr3hj9L6gESI7WeUpsfyhQ4cI7OgnQ.png?width=640&crop=smart&auto=webp&s=ed4d6ed41339c68dd909916da1ba8a6ebb506461',
  'https://art.ngfiles.com/images/229000/229658_llamareaper_fantasy-landscape.png?f1356652657',
  'https://assets.3dtotal.com/y.vt1hz1.image.7x7.jpg',
  'https://cdnb.artstation.com/p/assets/images/images/003/788/949/large/michael-kelly-lakemeadow-landscapes-recovered.jpg?1477501230',
  'https://cdn.pixabay.com/photo/2020/05/26/03/40/landscape-5221290_960_720.jpg',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b820606f-568b-47e2-9d16-a9deabcf5dc8/dd0fkat-53aee846-5e36-4458-9232-db73e9d63406.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4MjA2MDZmLTU2OGItNDdlMi05ZDE2LWE5ZGVhYmNmNWRjOFwvZGQwZmthdC01M2FlZTg0Ni01ZTM2LTQ0NTgtOTIzMi1kYjczZTlkNjM0MDYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ei8j2RDEKqVO75mD5a-OERJyJ5xpJZpzppLwIQ3Af60',
  'https://w0.peakpx.com/wallpaper/295/546/HD-wallpaper-dark-fantasy-landscape-2-3d-dark-forces-abstract-scary-dark-fantasy.jpg',
  'https://cdna.artstation.com/p/assets/images/images/001/206/348/4k/david-edwards-kenden-001.jpg?1442195813',
  'https://i.pinimg.com/originals/b6/5a/ed/b65aed4b877b033bb4292301ad82d9c8.jpg',
  'https://wallpaperaccess.com/full/143741.jpg',
  'https://www.teahub.io/photos/full/321-3219809_ice-tower-dark-fantasy-landscape-art.jpg',
  'https://cdna.artstation.com/p/assets/images/images/050/201/306/large/james-abels-dark-fantasytimetoarchitecture-1-1-upscaled-art-scale-6-00x.jpg?1654280200',
  'https://wallpaperforu.com/wp-content/uploads/2020/07/space-wallpaper-2007071541573-scaled.jpg'
]

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

user_1 = User.create(
  username: 'bob', 
  email: 'bob@gmail.com', 
  password: 'test1234'
)
user_2 = User.create(
  username: 'karen', 
  email: 'karen@gmail.com',
  password: 'test1234'
)
user_3 = User.create(
  username: 'sam', 
  email: 'sam@gmail.com',
  password: 'test1234'
)

user_4 = User.create(
  username: 'test',
  email: 'test@gmail.com',
  password: 'test1234'
)

users = [user_1, user_2, user_3]

puts 'Creating campaigns'

campaign_1 = Campaign.create!(
  name: 'Knights of the Round Table', 
  image_url: campaign_images[rand(0...campaign_images.length)],
  setting: 'Somewhere in Camelot', 
  owner: user_1, 
  password: 'test1234',
)

campaign_2 = Campaign.create!(
  name: 'Star Wards', 
  image_url: campaign_images[rand(0...campaign_images.length)],
  setting: 'In a hospital far far away', 
  owner: user_2, 
  password: 'test1234',
)

user_1.campaign_users.create!(campaign: campaign_2)

(1..35).each do
  setting = []
  10.times do
    setting.push(Faker::Quotes::Shakespeare.unique.hamlet_quote)
  end
  Faker::Quotes::Shakespeare.unique.clear
  campaign = Campaign.create(
    name: Faker::Games::ElderScrolls.unique.city, 
    image_url: campaign_images[rand(0...campaign_images.length)],
    setting: setting.join(' '), 
    owner: users[rand(0..2)], 
    password: 'test1234',
  )
  filtered_users = users.filter { |user| user.username != campaign.owner.username }
  filtered_users.each_entry { |user| user.campaign_users.create!(campaign: campaign)}
end

puts 'Creating join requests'
campaign_1.campaign_join_requests.create(user: user_4)

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
    filtered_users = users.filter { |user| user.username != campaign.owner.username && campaign.campaign_users.find_by(user_id: user.id) }
    
    if filtered_users.empty?
      next
    end

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
        klass: Faker::Games::DnD.klass,
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

puts 'Creating campaigns without players'

20.times do 
  setting = []
  8.times do
    setting.push(Faker::Quotes::Shakespeare.unique.king_richard_iii_quote)
  end
  Campaign.create(
    name: Faker::Games::Zelda.location, 
    image_url: campaign_images[rand(0...campaign_images.length)],
    setting: setting.join(' '),
    owner: users[rand(0..2)], 
    password: 'test1234',
  )
  Faker::Quotes::Shakespeare.unique.clear
end

puts 'Finished seeding 🌹'