class CSSImporter < Sass::Importers::Filesystem
  def extensions
    super.merge('css' => :scss)
  end
end

class Sass::Engine
  alias initialize_without_css_importer initialize

  def initialize(template, options={})
    initialize_without_css_importer(template, options)
    #puts 'A'
    #puts options[:filename]
    #puts self.options[:load_paths]

    #root_path = File.dirname(options[:filename] || ".")
    css_importer = self.options[:load_paths].find {|lp| lp.is_a?(CSSImporter)}
    #puts '>>>>'
    #puts css_importer
    #puts '<<<<'

    unless css_importer
      paths = []
      self.options[:load_paths].each {|root_path| if root_path.is_a?(Sass::Importers::Filesystem) then paths << CSSImporter.new(root_path.root) end }
      #self.options[:load_paths].each {|root_path| if root_path.is_a?(Sass::Importers::Filesystem) then paths << root_path.root end }
      #puts paths
      #puts 'XXXX'
      self.options[:load_paths] += paths
      #paths.each {|root_path| self.options[:load_paths] << root_path}
      #root = File.dirname(options[:filename] || ".")
      #self.options[:load_paths] << CSSImporter.new(root_path)
    end

    if css_importer
      #puts css_importer.root
    end

    #puts 'B'
    #puts self.options[:load_paths]
    #puts '================================================='
  end
end
