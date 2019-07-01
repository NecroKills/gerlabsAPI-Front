require 'rails_helper'

RSpec.describe 'Memory API' do
    before { host! 'api.gerlabs.dev' }

    let!(:user) { create(:user) }
    let!(:auth_data) { user.create_new_auth_token }
    let(:headers) do
        {
            'Content-Type' => Mime[:json].to_s,
            'Accept' => 'application/vnd.gerlabs.v2',
            'access-token' => auth_data['access-token'],
            'uid' => auth_data['uid'],
            'client' => auth_data['client']
        }
    end


    describe 'GET /memories' do
        context 'Listando todas as memórias' do
            before do
                create_list(:memory, 5)
                get '/memories', params: {}, headers: headers
            end

            it 'returns status code 200' do
                expect(response).to have_http_status(200)
            end

            it 'returns 5 memories from database' do
                expect(json_body[:data].count).to eq(5)
            end      
        end
    end

    describe 'GET /memories/:id' do
        let(:memory) { create(:memory) }

        before { get "/memories/#{memory.id}", params: {}, headers: headers }

        it 'returns status code 200' do
            expect(response).to have_http_status(200)
        end

        it 'returns the json for memory' do
            expect(json_body[:data][:attributes][:name]).to eq(memory.name)
        end
    end

    describe 'POST /memories' do
        before do
            post '/memories', params: { memory: memory_params }.to_json, headers: headers
        end

        context 'when the params are valid' do
            let(:memory_params) { attributes_for(:memory) }

            it 'returns status code 201' do
                expect(response).to have_http_status(201)
            end

            it 'saves the memory in the database' do
                expect( Memory.find_by(name: memory_params[:name]) ).not_to be_nil
            end

            it 'returns the json for created memory' do
                expect(json_body[:data][:attributes][:name]).to eq(memory_params[:name])
            end  
        end
    end

    describe 'DELETE /memories/:id' do
        let!(:memory) { create(:memory) }
    
        before do
            delete "/memories/#{memory.id}", params: {}, headers: headers
        end
    
        it 'returns status code 204' do
            expect(response).to have_http_status(204)
        end
    
        it 'removes the memory from the database' do
            expect { Memory.find(memory.id) }.to raise_error(ActiveRecord::RecordNotFound)
        end
    end
end