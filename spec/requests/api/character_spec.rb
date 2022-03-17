require 'rails_helper'

RSpec.describe "Api::Characters", type: :request do
  describe "GET /index" do
    context 'when a user is logged in' do
      it 'returns the user\'s characters'
      it 'has a status of 200 (Ok)'
    end
    context 'when a user is logged out' do
      it 'returns the error messages'
      it 'returns a status of 401 (Unauthorized)'
    end
  end
end
