require 'rails_helper'

RSpec.describe 'Video Card API' do
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


    describe 'GET /video_cards' do
        context 'Listando todas placas de vídeos' do
            before do
                create_list(:video_card, 5)
                get '/video_cards', params: {}, headers: headers
            end

            it 'returns status code 200' do
                expect(response).to have_http_status(200)
            end

            it 'returns 5 video_cards from database' do
                expect(json_body[:data].count).to eq(5)
            end      
        end
    end

    describe 'GET /video_cards/:id' do
        let(:video_card) { create(:video_card) }

        before { get "/video_cards/#{video_card.id}", params: {}, headers: headers }

        it 'returns status code 200' do
            expect(response).to have_http_status(200)
        end

        it 'returns the json for video_card' do
            expect(json_body[:data][:attributes][:name]).to eq(video_card.name)
        end
    end

    describe 'POST /video_cards' do
        before do
            post '/video_cards', params: { video_card: video_card_params }.to_json, headers: headers
        end

        context 'when the params are valid' do
            let(:video_card_params) { attributes_for(:video_card) }

            it 'returns status code 201' do
                expect(response).to have_http_status(201)
            end

            it 'saves the video_card in the database' do
                expect( VideoCard.find_by(name: video_card_params[:name]) ).not_to be_nil
            end

            it 'returns the json for created video_card' do
                expect(json_body[:data][:attributes][:name]).to eq(video_card_params[:name])
            end  
        end
    end

    describe 'DELETE /video_cards/:id' do
        let!(:video_card) { create(:video_card) }
    
        before do
          delete "/video_cards/#{video_card.id}", params: {}, headers: headers
        end
    
        it 'returns status code 204' do
          expect(response).to have_http_status(204)
        end
    
        it 'removes the video_card from the database' do
          expect { VideoCard.find(video_card.id) }.to raise_error(ActiveRecord::RecordNotFound)
        end
      end
end