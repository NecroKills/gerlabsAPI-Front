require 'rails_helper'

RSpec.describe VideoCard, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  let(:video_card) { build(:video_card) }

  it { is_expected.to respond_to(:name) }
  it { is_expected.to respond_to(:memory_gpu) }
end
