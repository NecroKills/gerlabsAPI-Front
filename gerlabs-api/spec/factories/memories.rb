FactoryGirl.define do
    factory :memory do
        name { Faker::Lorem.sentence }
    end
end