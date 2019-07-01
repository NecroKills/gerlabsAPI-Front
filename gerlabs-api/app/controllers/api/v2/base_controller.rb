class Api::V2::BaseController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken
  # include Swagger::Docs::Methods
end