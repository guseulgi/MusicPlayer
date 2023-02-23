// 패널 돌리기
const frame = document.querySelector('section');
const articleList = frame.querySelectorAll('article')

const len = articleList.length;
const deg = 360 / len;

const names = [
  'cardio', 'groove', 'happy',
  'light', 'lily', 'limes', 'pop', 'swing'
];

let beforeSong = 0;

for(let i = 0; i < len; i++) {
  articleList[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;

  //사진 일괄 적용
  const pic = articleList[i].querySelector('.pic');
  pic.style.backgroundImage = `url("./source/img/${names[i]}.jpg")`;

  //음악 제목 일괄 적용
  const title = articleList[i].querySelector('.text > h2');
  title.innerHTML = `🎧<br/>${names[i]}`;

  //음악 태그 삽입
  const audio = document.createElement('audio');
  audio.setAttribute('src', `./source/music/${names[i]}.mp3`);
  audio.loop = true;
  articleList[i].append(audio);
}

// Prev Next 버튼
const prev = document.querySelector('.btnPrev');
const next = document.querySelector('.btnNext');

let active = 0; //회전 위치 변수
let num = 0;    //회전 각도 변수

prev.addEventListener('click', function() {
  frame.style.transform = `rotate(${deg * ++num}deg)`;

  if(active === 0) {
    active = len - 1;
  } else {
    active -= 1;
  }

  for(let e of articleList) {
    e.classList.remove('on');
    e.querySelector('.pic').classList.remove('on');
    e.querySelector('audio').autoplay = false;
    e.querySelector('audio').pause();
  }
  articleList[active].classList.add('on');
  articleList[active].querySelector('.pic').classList.add('on');
  // articleList[active].querySelector('audio').autoplay = true;
  articleList[active].querySelector('audio').play();
  beforeSong = articleList[active];
});

next.addEventListener('click', function() {
  frame.style.transform = `rotate(${deg * --num}deg)`;

  if(active === len - 1) {
    active = 0;
  } else {
    active += 1;
  }

  for(let e of articleList) {
    e.classList.remove('on');
    e.querySelector('.pic').classList.remove('on');
    e.querySelector('audio').autoplay = false;
    e.querySelector('audio').pause();
  }
  articleList[active].classList.add('on');
  articleList[active].querySelector('.pic').classList.add('on');
  // articleList[active].querySelector('audio').autoplay = true;
  articleList[active].querySelector('audio').play();
  beforeSong = articleList[active];
});

// CD 모양 사진 회전
for (let el of articleList) {
  const play = el.querySelector('.play');
  const pause = el.querySelector('.pause');
  const reload = el.querySelector('.reload');

  play.addEventListener('click', function(e) {
    if(beforeSong === 0) {
      beforeSong = e.currentTarget;
    } else if (beforeSong !== e.currentTarget) {
      beforeSong.closest('article').querySelector('audio').pause();
      beforeSong.closest('article').querySelector('.pic').classList.remove('on');
      beforeSong = e.currentTarget;
    }

    beforeSong.closest('article').querySelector('.pic').classList.add('on');
    beforeSong.closest('article').querySelector('audio').play();
      //e.target.closest('article').querySelector('.pic').classList.add('on');
  });

  pause.addEventListener('click', function(e) {
    if(beforeSong === 0) {
      beforeSong = e.currentTarget;
    } else if (beforeSong !== e.currentTarget) { 
      beforeSong.closest('article').querySelector('.pic').classList.remove('on');
      beforeSong = e.currentTarget;
    }
    beforeSong.closest('article').querySelector('audio').pause();
  });

  reload.addEventListener('click', function(e) {
    if(beforeSong === 0) {
      beforeSong = e.currentTarget;
    } else if (beforeSong !== e.currentTarget) {
      beforeSong.closest('article').querySelector('audio').pause();
      beforeSong.closest('article').querySelector('.pic').classList.remove('on');
      beforeSong = e.currentTarget;
    }

    e.currentTarget.closest('article').querySelector('.pic').classList.add('on');
    e.currentTarget.closest('article').querySelector('audio').load();
    e.currentTarget.closest('article').querySelector('audio').play();
  });
}