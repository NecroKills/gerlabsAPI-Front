FactoryGirl.define do
    factory :software do
        name { Faker::Lorem.sentence }
        version { Faker::Lorem.sentence }
    end
end