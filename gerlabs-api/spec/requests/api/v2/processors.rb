require 'rails_helper'

RSpec.describe 'Processor API' do
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


    describe 'GET /processors' do
        context 'Listando todos os processadores' do
            before do
                create_list(:processor, 5)
                get '/processors', params: {}, headers: headers
            end

            it 'returns status code 200' do
                expect(response).to have_http_status(200)
            end

            it 'returns 5 processors from database' do
                expect(json_body[:data].count).to eq(5)
            end      
        end
    end

    describe 'GET /processors/:id' do
        let(:processor) { create(:processor) }

        before { get "/processors/#{processor.id}", params: {}, headers: headers }

        it 'returns status code 200' do
            expect(response).to have_http_status(200)
        end

        it 'returns the json for processor' do
            expect(json_body[:data][:attributes][:name]).to eq(processor.name)
        end
    end

    describe 'POST /processors' do
        before do
            post '/processors', params: { processor: processor_params }.to_json, headers: headers
        end

        context 'when the params are valid' do
            let(:processor_params) { attributes_for(:processor) }

            it 'returns status code 201' do
                expect(response).to have_http_status(201)
            end

            it 'saves the processor in the database' do
                expect( Processor.find_by(name: processor_params[:name]) ).not_to be_nil
            end

            it 'returns the json for created processor' do
                expect(json_body[:data][:attributes][:name]).to eq(processor_params[:name])
            end  
        end
    end

    describe 'DELETE /processors/:id' do
        let!(:processor) { create(:processor) }

        before do
            delete "/processors/#{processor.id}", params: {}, headers: headers
        end

        it 'returns status code 204' do
            expect(response).to have_http_status(204)
        end

        it 'removes the processor from the database' do
            expect { Processor.find(processor.id) }.to raise_error(ActiveRecord::RecordNotFound)
        end
    end
end