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
- Isolate campaigns in search to campaigns that are not affiliated with current user
- Implement server search pagination for campaigns

## Bugs that need to be stomped

- Campaign Settings
  - When a campaign is deleted the app should redirect to home.
  - If a user was to refresh the page it will redirect back to home
    - This is not the intended functionality
    - The reason for this is there is not a campaign stored in redux state on load
    - Need to change how redirects are working within application
      - May need to change all redirects to better reflect this change

## Deployment Instructions

## System Dependencies:

## Configuration
