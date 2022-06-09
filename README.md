# D&D 5e Companion

D&D 5e Companion is a campaign management system to manage players and resources

## To get started:

**This application assumes that bundler, npm, ruby, rails, and postgresql is installed**

```sh
bundle install
rails db:create db:migrate db:seed
npm install --prefix client
```

## Ruby Version:

- ruby-2.7.4

## Future Feature Implementations:

- Live Campaign Log
- Add navigation to dropdown in phone view
- Campaign Search Page
  - Add owner of campaign to card
    - Add the ability to message owner
      - when this gets added, need to change how to select a specific card
  - Isolate campaigns in search to campaigns that are not affiliated with current user
    - This includes:
      - Currrent campaigns user has not joined
      - Current campaigns user does not own
- Implement server search pagination for campaigns
- User's Characters
  - Search
    - will create query based on search parameters
  - Server side pagination to load more when user scrolls down
    - Will render from most recent created


## Bugs that need to be stomped

## Deployment Instructions

## System Dependencies:

## Configuration
