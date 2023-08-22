const title = document.getElementById('vid-title')
var videoContainer = document.getElementById('video-container');
const desc = document.getElementById('vid-desc');

async function yt() {
    const link = document.getElementById('input-field');
    const split_link = link.value.split('=');
    var youtubeVideoId = split_link[1];
    var iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315'; 
    iframe.src = 'https://www.youtube.com/embed/' + youtubeVideoId + '?autoplay=1&mute=1' + '?controls=1';
    iframe.allowFullscreen = true;
    console.log(split_link[1]);
    const url = 'https://youtube-transcriptor.p.rapidapi.com/transcript?video_id='+split_link[1]+'&lang=en';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4d21e95074mshc2f6edf46981a5ap1c4eb7jsn5d28af41eb02',
            'X-RapidAPI-Host': 'youtube-transcriptor.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        title.innerText = result[0].title;
        videoContainer.appendChild(iframe);
        desc.innerText = result[0].description;
        console.log(result);
        link.value = '';
    } catch (error) {
        console.error(error);
    }
}