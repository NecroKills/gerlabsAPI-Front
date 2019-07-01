class Api::V2::DisciplinesController < Api::V2::BaseController
  before_action :authenticate_user!

  respond_to :json

  def index
		@disciplines = Discipline.all()
		render json: @disciplines, status: 200
  end

  def show
    begin
      @discipline = Discipline.find(params[:id])
      respond_with @discipline
    rescue
      head 404
    end
  end

  def create
    discipline = Discipline.new(discipline_params)

    if discipline.save
      render json: discipline, status: 201
    else
      render json: { errors: discipline.errors }, status: 422
    end
  end

  def update
    discipline = Discipline.find(params[:id])

    if discipline.update(discipline_params)
      render json: discipline, status: 200
    else
      render json: { errors: discipline.errors }, status: 422
    end
  end

  def destroy
    discipline = Discipline.find(params[:id])
    discipline.destroy
    head 204
  end

  private

  def discipline_params
    params.require(:discipline).permit(:name, :code, :course_id)
  end
end