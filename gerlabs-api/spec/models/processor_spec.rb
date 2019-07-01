require 'rails_helper'

RSpec.describe Processor, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  let(:processor) { build(:processor) }

  it { is_expected.to respond_to(:name) }
end
