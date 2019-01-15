require 'rmagick'

FONTNAME = 'GenJyuuGothic-Normal.ttf'

module CollasHelper
  def make_colla(in_fname, out_fname, text)
    img = Magick::ImageList.new(fname)
    font = FONTNAME
    draw = Magick::Draw.new
    draw.annotate(img, 0, 0, 5, 5, text) do
      self.font = font
      self.fill = 'black'
      self.stroke = 'transparent'
      self.pointsize = 30
      self.gravity = Magick::NorthWestGravity
    end
    img.write(out_fname)
  end
end
