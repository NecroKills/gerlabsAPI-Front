require 'rails_helper'

RSpec.describe Software, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  let(:software) { build(:software) }

  it { is_expected.to respond_to(:name) }
  it { is_expected.to respond_to(:version) }
end
