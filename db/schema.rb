# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_06_18_162337) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "campaign_logs", force: :cascade do |t|
    t.string "message", default: ""
    t.string "color", default: ""
    t.bigint "campaign_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["campaign_id"], name: "index_campaign_logs_on_campaign_id"
  end

  create_table "campaign_users", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "campaign_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["campaign_id"], name: "index_campaign_users_on_campaign_id"
    t.index ["user_id"], name: "index_campaign_users_on_user_id"
  end

  create_table "campaigns", force: :cascade do |t|
    t.string "name"
    t.text "setting"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
    t.string "image_url", default: ""
    t.index ["user_id"], name: "index_campaigns_on_user_id"
  end

  create_table "characters", force: :cascade do |t|
    t.string "name", default: ""
    t.string "background", default: ""
    t.string "race", default: ""
    t.string "alignment", default: ""
    t.integer "experience", default: 0
    t.integer "strength", default: 3
    t.integer "dexterity", default: 3
    t.integer "constitution", default: 3
    t.integer "intelligence", default: 3
    t.integer "wisdom", default: 3
    t.integer "charisma", default: 3
    t.bigint "user_id", null: false
    t.bigint "campaign_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "image_url", default: ""
    t.boolean "visible", default: false
    t.integer "age", default: 1
    t.string "height", default: ""
    t.string "weight", default: ""
    t.string "eyes", default: ""
    t.string "hair", default: ""
    t.string "gender", default: ""
    t.string "appearance", default: ""
    t.string "backstory", default: ""
    t.string "skin", default: ""
    t.string "klass", default: ""
    t.index ["campaign_id"], name: "index_characters_on_campaign_id"
    t.index ["user_id"], name: "index_characters_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "image_url", default: ""
  end

  add_foreign_key "campaign_logs", "campaigns"
  add_foreign_key "campaign_users", "campaigns"
  add_foreign_key "campaign_users", "users"
  add_foreign_key "campaigns", "users"
  add_foreign_key "characters", "campaigns"
  add_foreign_key "characters", "users"
end
