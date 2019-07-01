# spec/integration/pets_spec.rb
require 'swagger_helper'

describe 'Users API' do

  path '/api/v1/users' do

    post 'Creates a user' do
      tags 'Users'
      consumes 'application/json', 'application/xml'
      parameter email: :user, in: :body, schema: {
        type: :object,
        properties: {email:{ type: :string }, password:{ type: :string },
        password_confirmation: { type: :string }

        },
        required: [ 'email', 'password' ]
      }

      response '201', 'user created' do
        let(:user) { { email: 'teste@gmail.com', status: '123456' } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:user) { { email: 'foo' } }
        run_test!
      end
    end
  end

  path '/api/v1/users/{id}' do

    get 'Retrieves a user' do
      tags 'Users'
      produces 'application/json', 'application/xml'
      parameter email: :id, :in => :path, :type => :string

      response '200', 'email found' do
        schema type: :object,
          properties: {
            id: { type: :integer, },
            email: { type: :string },
            password: { type: :string },
            password: { type: :string }
          },
          required: [ 'id', 'email', 'password' ]

        let(:id) { User.create(email: 'teste@gmail.com', password: '123456').id }
        run_test!
      end

      response '404', 'user not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end