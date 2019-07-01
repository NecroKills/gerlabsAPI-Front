class Api::V2::MemoriesController < Api::V2::BaseController
  before_action :authenticate_user!

  respond_to :json

  def index
		memories = Memory.all()
		render json: memories, status: 200
  end

  def show
    begin
      @memory = Memory.find(params[:id])
      respond_with @memory
    rescue
      head 404
    end
  end

  def create
    memory = Memory.new(memory_params)

    if memory.save
      render json: memory, status: 201
    else
      render json: { errors: memory.errors }, status: 422
    end
  end

  def update
    memory = Memory.find(params[:id])

    if memory.update(memory_params)
      render json: memory, status: 200
    else
      render json: { errors: memory.errors }, status: 422
    end
  end

  def destroy
    memory = Memory.find(params[:id])
    memory.destroy
    head 204
  end

  private

  def memory_params
    params.require(:memory).permit(:name)
  end
end