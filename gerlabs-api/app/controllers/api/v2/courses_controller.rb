class Api::V2::CoursesController < Api::V2::BaseController
  before_action :authenticate_user!

  respond_to :json

  def index
		courses = Course.all()
		render json: courses, status: 200
  end

  def show
    begin
      @course = Course.find(params[:id])
      respond_with @course
    rescue
      head 404
    end
  end

  def create
    course = Course.new(course_params)

    if course.save
      render json: course, status: 201
    else
      render json: { errors: course.errors }, status: 422
    end
  end

  def update
    course = Course.find(params[:id])

    if course.update(course_params)
      render json: course, status: 200
    else
      render json: { errors: course.errors }, status: 422
    end
  end

  def destroy
    course = Course.find(params[:id])
    course.destroy
    head 204
  end

  private

  def course_params
    params.require(:course).permit(:name, :code)
  end
end