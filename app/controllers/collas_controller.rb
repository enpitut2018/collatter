class CollasController < ApplicationController
  include CollasHelper
  before_action :set_colla, only: [:show, :edit, :update, :destroy]

  # GET /collas
  # GET /collas.json
  def index
    @collas = Colla.all_by_popularity
  end

  # GET /collas/1
  # GET /collas/1.json
  def show
  end

  # GET /collas/new
  def new
    @colla = Colla.new
  end

  # GET /collas/1/edit
  def edit
  end

  # POST /collas
  # POST /collas.json
  def create
    tmp_params = colla_params
    logger.debug('=================================================')
    logger.debug(tmp_params)
    logger.debug(tmp_params[:image_data_url].length)
    tmp_params[:image] = base64_conversion(tmp_params[:image_data_url])
    logger.debug(base64_conversion(tmp_params[:image_data_url]))
    tmp_params[:image_data_url] = nil
    logger.debug('=================================================')
    logger.debug(tmp_params)
    logger.debug(tmp_params.class)
    @colla = Colla.new(tmp_params.except(:image_data_url))

    respond_to do |format|
      if @colla.save
        format.html { redirect_to @colla, notice: 'Colla was successfully created.' }
        format.json { render :show, status: :created, location: @colla }
      else
        format.html { render :new }
        format.json { render json: @colla.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /collas/1
  # PATCH/PUT /collas/1.json
  def update
    respond_to do |format|
      if @colla.update(colla_params)
        format.html { redirect_to @colla, notice: 'Colla was successfully updated.' }
        format.json { render :show, status: :ok, location: @colla }
      else
        format.html { render :edit }
        format.json { render json: @colla.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /collas/1
  # DELETE /collas/1.json
  def destroy
    @colla.destroy
    respond_to do |format|
      format.html { redirect_to collas_url, notice: 'Colla was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_colla
      @colla = Colla.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def colla_params
      params.require(:colla).permit(:image, :image_data_url, :tag_txt, :template_id)
    end

  def split_base64(uri_str)
    if uri_str.match(%r{data:([a-zA-Z0-9/]*?);([a-zA-Z0-9]*?),(.*)$})
      uri = Hash.new
      uri[:type] = $1
      uri[:encoder] = $2
      uri[:data] = $3
      uri[:extension] = $1.split('/')[1]
      return uri
    else
      return nil
    end
  end

  def base64_conversion(uri_str, filename = 'base64')
    image_data = split_base64(uri_str)
    image_data_string = image_data[:data]
    image_data_binary = Base64.decode64(image_data_string)

    temp_img_file = Tempfile.new(filename)
    temp_img_file.binmode
    temp_img_file << image_data_binary
    temp_img_file.rewind

    img_params = {:filename => "#{filename}.#{image_data[:extension]}", :type => image_data[:type], :tempfile => temp_img_file}
    ActionDispatch::Http::UploadedFile.new(img_params)
  end
end
