const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');

const sideBar = document.querySelector('.container .sidebar');

menuOpen.addEventListener('click', () => sideBar.style.left = '0');
menuClose.addEventListener('click', () => sideBar.style.left = '-100%');

const image = document.getElementById('cover'),
currentImg = document.getElementById('currentImg'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play');

const music = new Audio();

const songs = [
    {
        path: 'assets/songs/1.mp3',
        displayName: 'By Grace Alone',
        cover: 'assets/covers/1.jpg',
        artist: 'Saint World',
    },
    {
        path: 'assets/songs/2.mp3',
        displayName: 'Mwaki (Kordhell Remix)',
        cover: 'assets/covers/2.jpg',
        artist: 'Kordhell',
    },
    {
        path: 'assets/songs/3.mp3',
        displayName: 'September-San',
        cover: 'assets/covers/3.jpg',
        artist: 'Aimer',
    },
    {
        path: 'assets/songs/4.mp3',
        displayName: 'sTraNgeRs',
        cover: 'assets/covers/4.jpg',
        artist: 'Bring Me The Horizon',
    },
    {
        path: 'assets/songs/5.mp3',
        displayName: 'universo de coisas que eu desconheço',
        cover: 'assets/covers/5.jpeg',
        artist: 'ANAVITÓRIA',
    },
    
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    // Muda o icone do botão "play"
    playBtn.classList.replace('bx-play', 'bx-pause');
    // Define o hover do botão
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    // Muda o icone do botão "pause"
    playBtn.classList.replace('bx-pause', 'bx-play');
    // Define o hover do botão
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    currentImg.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % 
    songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const {duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);

function overflowSlide(song){
    if(song.displayName.length >= 20){
        title.classList.add('slide');
    }else{
        title.classList.remove('slide')
    }
}

overflowSlide(songs[musicIndex]);