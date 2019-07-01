require 'rails_helper'

RSpec.describe Discipline, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  let(:discipline) { build(:discipline) }

  it { is_expected.to respond_to(:name) }
  it { is_expected.to respond_to(:code) }
  it { is_expected.to respond_to(:course_id) }
end
