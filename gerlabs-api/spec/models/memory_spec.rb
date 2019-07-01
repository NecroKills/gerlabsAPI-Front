require 'rails_helper'

RSpec.describe Memory, type: :model do
  let(:memory) { build(:memory) }

  it { is_expected.to respond_to(:name) }
end
