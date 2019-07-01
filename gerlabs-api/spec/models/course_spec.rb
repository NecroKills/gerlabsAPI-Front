require 'rails_helper'

RSpec.describe Course, type: :model do
  let(:course) { build(:course) }

  it { is_expected.to respond_to(:name) }
  it { is_expected.to respond_to(:code) }
end
