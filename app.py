from flask import Flask, request, jsonify
from pytube import YouTube

app = Flask(__name__)

@app.route('/')
def index():
    return open('index.html').read()

@app.route('/download', methods=['POST'])
def download_video():
    try:
        data = request.get_json()
        video_url = data['url']
        yt = YouTube(video_url)
        stream = yt.streams.get_highest_resolution()
        stream.download('./downloads/')  # Change to your preferred download directory
        download_link = f'/downloads/{yt.title}.mp4'
        return jsonify({'success': True, 'download_link': download_link})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
