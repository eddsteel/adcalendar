require 'rake/clean'
require 'rubygems'
require 'RMagick'


include Magick

def advent_photos (dir)
  (1..24).map {|n| "#{dir}/#{n}.jpg"}
end

def resize(image, width, height, name)
  puts "resize #{name}"
  image.resize(width, height)
end

def strip(image, name)
  puts "strip #{name}"
  image.delete_profile('*')
end

def strip_and_resize(image, new_name, geometry)
  image.change_geometry(geometry) do |w, h, i|
    i = resize i, w, h, new_name
    i = strip i, new_name
    i.write new_name
  end
end

BG='bg.jpg'

# originals - untouched except to rename them 1..24
ORIGINALS = FileList["photos/*jpg"]
ORIGINALS.exclude("*/#{BG}")
# renamed originals
O_DIR = 'photos'
O_PHOTOS = FileList[advent_photos O_DIR]
O_PHOTOS.exclude("*/#{BG}")
CLOBBER << O_PHOTOS
# large photos
L_DIR = 'public/images/large'
L_PHOTOS = FileList[advent_photos L_DIR]
L_PHOTOS.exclude("*/#{BG}")
CLEAN << L_PHOTOS
# thumbnails
T_DIR = 'public/images/thumbs'
T_PHOTOS = FileList[advent_photos T_DIR]
T_PHOTOS.exclude("*/#{BG}")
CLEAN << T_PHOTOS
# medium photos (lightbox)
M_DIR = 'public/images'
M_PHOTOS = FileList[advent_photos M_DIR]
M_PHOTOS.exclude("*/#{BG}")
CLEAN << M_PHOTOS

[L_DIR, T_DIR, M_DIR].each do |dir|
  directory dir
end


task :default => [:photos]

task :list do
  p O_PHOTOS
  p L_PHOTOS
  p T_PHOTOS
  p M_PHOTOS
  p ORIGINALS
end

# has to be imperative and manual
desc "Rename originals if required"
task :check_originals do
  unless O_PHOTOS.sort == (ORIGINALS.sort - [File.join(O_DIR, BG)])
    Rake::Task[:rename_originals].invoke
  end
end

task :rename_originals do
  count = 1
  ORIGINALS.sort.each do |image|
    mv image, "photos/#{count}.jpg"
    count = count.succ
  end
end

desc "Size photos and prepare them for the calendar"
task :photos => :check_originals

L_PHOTOS.each do |l|
  original = l.sub(L_DIR, O_DIR)
  file l do |f|
    cp original, f.name
  end
  file l => [L_DIR, original]
  task :photos => l
end

T_PHOTOS.each do |t|
  original = t.sub(T_DIR, O_DIR)
  file t do |f|
    strip_and_resize ImageList.new(original).first, f.name, "200x200^"
  end
  file t => [original, T_DIR]
  task :photos => t
end

M_PHOTOS.each do |m|
  original = m.sub(M_DIR, O_DIR)
  file m do |f|
    strip_and_resize ImageList.new(original).first, f.name, "1000x1000"
  end
  file m => [original, M_DIR]
  task :photos => m
end

FileList["#{M_DIR}/#{BG}"].each do |b|
  original = b.sub(M_DIR, O_DIR)
  file b do |f|
    strip_and_resize ImageList.new(original).first, f.name, "2000x2000"
  end
  l = File.join(L_DIR, BG)
  file l => original do |f|
    cp original, f.name
  end
  file b => [original, M_DIR, L_DIR]

  # Add shrunken and original BG to normal dependencies
  task :photos => [b, l]
  CLEAN << [l,b]
  CLOBBER << original
end



