class Api::V2::VideoCardsController < Api::V2::BaseController
  before_action :authenticate_user!

  respond_to :json

  def index
		video_cards = VideoCard.all()
		render json: video_cards, status: 200
  end

  def show
    begin
      @video_card = VideoCard.find(params[:id])
      respond_with @video_card
    rescue
      head 404
    end
  end

  def create
    video_card = VideoCard.new(video_card_params)

    if video_card.save
      render json: video_card, status: 201
    else
      render json: { errors: video_card.errors }, status: 422
    end
  end

  def update
    video_card = VideoCard.find(params[:id])

    if video_card.update(video_card_params)
      render json: video_card, status: 200
    else
      render json: { errors: video_card.errors }, status: 422
    end
  end

  def destroy
    video_card = VideoCard.find(params[:id])
    video_card.destroy
    head 204
  end

  private

  def video_card_params
    params.require(:video_card).permit(:name, :memory_gpu)
  end
end