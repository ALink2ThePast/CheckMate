class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if logged_in?
      render json: ["Already logged in"], status: 422
    elsif @user
      login!(@user)
      render 'api/users/show'
    else
      render json: ["Invalid email/password combo"], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout!
      render json: {}
    else
      render json: ["You aren't signed in!"], status: 404
    end
  end
end
