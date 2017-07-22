require 'open-uri'

class PagesController < ApplicationController
  def home
    # YouTube
    youtube = open("https://www.youtube.com/channel/UCC6p0L9affF4y4iIxB5jWoQ")
    youtube_doc = Nokogiri::HTML(youtube)
    links = youtube_doc.css('div.compact-shelf-content-container .yt-uix-sessionlink').map { |link| link['href'] }
    @latest_videos_ids = []
    links.uniq.first(3).each do |link|
      @latest_videos_ids << link.split("=")[-1]
    end

    @hash = [
      {
        "lat": 43.3027392,
        "lng": 5.3765816,
        "infowindow": "<h1>Aix - Marseille</h1><p><img src='https://d1gofzrmx0fcbg.cloudfront.net/production/cities/city_pictures/000/000/008/thumbnail/marseille.jpg?1445520529' height='200'></p>"
      },
      {
        "lat": 43.3027392,
        "lng": 5.3765816,
        "infowindow": "<h1>Aix - Marseille</h1><p><img src='https://d1gofzrmx0fcbg.cloudfront.net/production/cities/city_pictures/000/000/008/thumbnail/marseille.jpg?1445520529' height='200'></p>"
      },
      {
        "lat": 43.3027392,
        "lng": 5.3765816,
        "infowindow": "<h1>Aix - Marseille</h1><p><img src='https://d1gofzrmx0fcbg.cloudfront.net/production/cities/city_pictures/000/000/008/thumbnail/marseille.jpg?1445520529' height='200'></p>"
      },
      {
        "lat": 43.3027392,
        "lng": 5.3765816,
        "infowindow": "<h1>Aix - Marseille</h1><p><img src='https://d1gofzrmx0fcbg.cloudfront.net/production/cities/city_pictures/000/000/008/thumbnail/marseille.jpg?1445520529' height='200'></p>"
      }
    ]
  end
end
