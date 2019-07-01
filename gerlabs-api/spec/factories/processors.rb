FactoryGirl.define do
    factory :processor do
        name { Faker::Lorem.sentence }
    end
end