FactoryGirl.define do
    factory :discipline do
        name { Faker::Lorem.sentence }
        code { Faker::Lorem.sentence }
        course
    end
end