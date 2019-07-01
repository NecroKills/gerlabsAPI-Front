FactoryGirl.define do
    factory :video_card do
        name { Faker::Lorem.sentence }
        memory_gpu { Faker::Lorem.sentence }
    end
end