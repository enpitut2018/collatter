class CollasController < ApplicationController
  before_action :set_colla, only: [:show, :edit, :update, :destroy]

  # GET /collas
  # GET /collas.json
  def index
    @collas = Colla.all
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
    @colla = Colla.new(colla_params)

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
      params.require(:colla).permit(:image, :tag_txt, :template_id)
    end
end
