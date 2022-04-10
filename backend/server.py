from flask import Flask, request, send_file
from pytube import YouTube

from io import BytesIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route("/download", methods=["POST"])
def download():
  f = request.get_json(silent=True).get("youtubeURL")
  print(f)
  buffer = BytesIO()

  try:
    url = YouTube(f)
    url.check_availability()
    
    video = url.streams.get_by_itag(18)
    # video.download()
    print(url.streams)
    video.stream_to_buffer(buffer)
    buffer.seek(0)
    return send_file(buffer, as_attachment=True, download_name="video.mp4", mimetype="video/mp4")
  
  except:
    return "not available"

if __name__ == "__main__":
  app.run(debug=True)

# yt = YouTube('https://youtu.be/WRyzVaf46Ts')
# print(yt.title)
# print(yt.thumbnail_url)