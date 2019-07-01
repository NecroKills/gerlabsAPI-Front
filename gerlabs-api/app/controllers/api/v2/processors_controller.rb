class Api::V2::ProcessorsController < Api::V2::BaseController
  before_action :authenticate_user!

  respond_to :json

  def index
		processors = Processor.all()
		render json: processors, status: 200
  end

  def show
    begin
      @processor = Processor.find(params[:id])
      respond_with @processor
    rescue
      head 404
    end
  end

  def create
    processor = Processor.new(processor_params)

    if processor.save
      render json: processor, status: 201
    else
      render json: { errors: processor.errors }, status: 422
    end
  end

  def update
    processor = Processor.find(params[:id])

    if processor.update(processor_params)
      render json: processor, status: 200
    else
      render json: { errors: processor.errors }, status: 422
    end
  end

  def destroy
    processor = Processor.find(params[:id])
    processor.destroy
    head 204
  end

  private

  def processor_params
    params.require(:processor).permit(:name)
  end
end