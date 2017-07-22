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
        "lat": 51.5074,
        "lng": 0.1278,
        "infowindow": "<h4 class='map-info'>London</h4>"
      },
    ]
  end
end
