require 'rails_helper'

RSpec.describe 'Discipline API' do
    before { host! 'api.gerlabs.dev' }

    let!(:user) { create(:user) }
    let!(:course) { create(:course) }
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


    describe 'GET /disciplines' do
        context 'Listando todas as disciplinas' do
            before do
                create_list(:discipline, 5, course_id: course.id)
                get '/disciplines', params: {}, headers: headers
            end

            it 'returns status code 200' do
                expect(response).to have_http_status(200)
            end

            it 'returns 5 disciplines from database' do
                expect(json_body[:data].count).to eq(5)
            end      
        end
    end

    describe 'GET /disciplines/:id' do
        let(:discipline) { create(:discipline, course_id: course.id) }

        before { get "/disciplines/#{discipline.id}", params: {}, headers: headers }

        it 'returns status code 200' do
            expect(response).to have_http_status(200)
        end

        it 'returns the json for discipline' do
            expect(json_body[:data][:attributes][:name]).to eq(discipline.name)
        end
    end

    describe 'POST /disciplines' do
        before do
            post '/disciplines', params: { discipline: discipline_params }.to_json, headers: headers
        end

        context 'when the params are valid' do
            let(:discipline_params) { attributes_for(:discipline) }

            it 'returns status code 201' do
                expect(response).to have_http_status(201)
            end

            it 'saves the discipline in the database' do
                expect( Discipline.find_by(name: discipline_params[:name]) ).not_to be_nil
            end

            it 'returns the json for created discipline' do
                expect(json_body[:data][:attributes][:name]).to eq(discipline_params[:name])
            end  
        end
    end

    describe 'DELETE /disciplines/:id' do
        let!(:discipline) { create(:discipline, course_id: course.id) }
    
        before do
            delete "/disciplines/#{discipline.id}", params: {}, headers: headers
        end
    
        it 'returns status code 204' do
            expect(response).to have_http_status(204)
        end
    
        it 'removes the discipline from the database' do
            expect { Discipline.find(discipline.id) }.to raise_error(ActiveRecord::RecordNotFound)
        end
    end
end