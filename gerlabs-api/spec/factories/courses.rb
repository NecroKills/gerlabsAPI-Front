FactoryGirl.define do
    factory :course do
        name { Faker::Lorem.sentence }
        code { Faker::Lorem.sentence }
    end
end