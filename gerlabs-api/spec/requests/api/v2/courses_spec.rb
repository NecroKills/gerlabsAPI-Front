require 'rails_helper'

RSpec.describe 'Course API' do
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


    describe 'GET /courses' do
        context 'Listando todos os cursos' do
            before do
                create_list(:course, 5)
                get '/courses', params: {}, headers: headers
            end

            it 'returns status code 200' do
                expect(response).to have_http_status(200)
            end

            it 'returns 5 courses from database' do
                expect(json_body[:data].count).to eq(5)
            end      
        end
    end

    describe 'GET /courses/:id' do
        let(:course) { create(:course) }

        before { get "/courses/#{course.id}", params: {}, headers: headers }

        it 'returns status code 200' do
            expect(response).to have_http_status(200)
        end

        it 'returns the json for course' do
            expect(json_body[:data][:attributes][:name]).to eq(course.name)
        end
    end

    describe 'POST /courses' do
        before do
            post '/courses', params: { course: course_params }.to_json, headers: headers
        end

        context 'when the params are valid' do
            let(:course_params) { attributes_for(:course) }

            it 'returns status code 201' do
                expect(response).to have_http_status(201)
            end

            it 'saves the course in the database' do
                expect( Course.find_by(name: course_params[:name]) ).not_to be_nil
            end

            it 'returns the json for created course' do
                expect(json_body[:data][:attributes][:name]).to eq(course_params[:name])
            end  
        end
    end

    describe 'DELETE /courses/:id' do
        let!(:course) { create(:course) }
    
        before do
            delete "/courses/#{course.id}", params: {}, headers: headers
        end
    
        it 'returns status code 204' do
            expect(response).to have_http_status(204)
        end
    
        it 'removes the course from the database' do
            expect { Course.find(course.id) }.to raise_error(ActiveRecord::RecordNotFound)
        end
    end
end