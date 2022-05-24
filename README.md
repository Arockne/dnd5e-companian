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

## Bugs that need to be stomped

- Main Header
  - Create Campaign link when clicked on sometimes does not render
    - Examples:
      - If Redirected to another url the styling for the current button does not match up to the resource
        - For example, when creating a new campaign and its successful will redirect to home but the nav button does not update where they are
      - When clicking the link itself sometimes does not render the CampaignForm and the page redirects itself to home('/')

## Deployment Instructions

## System Dependencies:

## Configuration
