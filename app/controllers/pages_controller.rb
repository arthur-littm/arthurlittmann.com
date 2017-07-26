require 'open-uri'

class PagesController < ApplicationController
  def home
    get_youtube_ids()
    create_map_positions()
  end

  private

  def create_map_positions
    @hash = [
      {
        "lat": 51.5188,
        "lng": 0.0667,
        "icon": "",
      },
    ]
  end

  def get_youtube_ids
    youtube = open("https://www.youtube.com/channel/UCC6p0L9affF4y4iIxB5jWoQ")
    youtube_doc = Nokogiri::HTML(youtube)
    links = youtube_doc.css('div.compact-shelf-content-container .yt-uix-sessionlink').map { |link| link['href'] }
    @latest_videos_ids = []
    links.uniq.first(9).each do |link|
      @latest_videos_ids << link.split("=")[-1]
    end
  end
end
