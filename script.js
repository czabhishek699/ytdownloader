document.addEventListener('DOMContentLoaded', function() {
    const downloadForm = document.getElementById('download-form');
    const downloadLink = document.getElementById('download-link');
    const downloadA = document.getElementById('download-a');
    
    downloadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const videoURL = document.getElementById('video-url').value;
        
        // Send the video URL to the server for processing
        fetch('/download', {
            method: 'POST',
            body: JSON.stringify({ url: videoURL }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                downloadA.href = data.download_link;
                downloadA.style.display = 'block';
            } else {
                alert('Failed to download the video. Please check the URL and try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
