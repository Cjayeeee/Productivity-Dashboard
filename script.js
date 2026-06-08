const openFeatures = () => {
  const allELems = document.querySelectorAll(".elem");
  const fullELemsPage = document.querySelectorAll(".fullElem");
  const fullELemsBackBtn = document.querySelectorAll(".back");

  allELems.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullELemsPage[elem.id].style.display = "block";
    });
  });

  fullELemsBackBtn.forEach((back) => {
    back.addEventListener("click", () => {
      fullELemsPage[back.id].style.display = "none";
    });
  });
};
openFeatures();

var data = null
const dayTime = document.querySelector('.header1 h1')
const dateTime = document.querySelector('.header1 h2')


navigator.geolocation.getCurrentPosition(
  position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log(lat, lon);
  },
  error => {
    console.log(error.message);
  }
);


const weatherAPICall = async () =>{
  const temperature = document.querySelector('.header2 .temperature')
  const weather = document.querySelector('.header2 .weather')
  const precipitation = document.querySelector('.header2 .precipitation')
  const humidity = document.querySelector('.header2 .humidity')
  const wind = document.querySelector('.header2 .wind')
  const cityName = document.querySelector('.header1 h4')

  const apiKey = '3e757af23ae8411d8cb81620260806'
  let city = 'Pune'
  let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
  data = await response.json();

  console.log(data);
  
  //19.799171 74.545353

  temperature.innerHTML = `${data.current.temp_c}°C`
  weather.innerHTML =`${data.current.condition.text}`
  precipitation.innerHTML =`Precipitation : ${data.current.precip_mm}mm`
  humidity.innerHTML =`Humidity : ${data.current.humidity}%`
  wind.innerHTML =`Wind: ${data.current.wind_kph} km/h`
  cityName.innerHTML =`${city}`
}
weatherAPICall()

setInterval(weatherAPICall,300000)


let date = null

const timeDate = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  date = new Date()

  let day = daysOfWeek[date.getDay()]
  let hours = date.getHours()
  let minutes = String(date.getMinutes()).padStart(2, "0")
  let seconds = String(date.getSeconds()).padStart(2, "0")
  let dateToday = date.getDate()
  let month = monthsOfYear[date.getMonth()]
  let year = date.getFullYear()

  dateTime.innerHTML = `${dateToday} ${month}, ${year}`

  if (hours > 12) {
    dayTime.innerHTML = `${day}, ${String(hours - 12).padStart(2, "0")}:${minutes}:${seconds} PM`
  } else {
    dayTime.innerHTML = `${day}, ${String(hours).padStart(2, "0")}:${minutes}:${seconds} AM`
  }
}

timeDate()
setInterval(timeDate, 1000)



const todoList = () => {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("task list is empty");
  }

  const renderTask = () => {
    const allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach((e, idx) => {
      sum += `<div class="task flex items-center justify-between w-full bg-[var(--pri)] px-[30px] py-[20px] rounded-lg">
                <div class="w-[70%]">
                  <h5 class="text-[var(--sec)] text-[1.7rem] w-full font-[bold] flex items-center gap-2">${e.task} <span class="${e.isImp}">imp</span></h5>
                  <p class="text-[var(--sec)] w-full">${e.details}</p>
                </div>
                <button id="${idx}" class="px-[30px] py-[15px] text-[var(--pri)] bg-green-700 rounded-lg">Mark as Completed</button>
              </div>`;
    });

    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
  };

  renderTask();

  const addTask = () => {
    const form = document.querySelector("form");
    const taskInput = document.querySelector(".input");
    const taskDetails = document.querySelector(".details");
    const taskCheckBox = document.querySelector("#check");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (taskInput.value) {
        currentTask.push({
          task: taskInput.value,
          details: taskDetails.value,
          isImp: taskCheckBox.checked,
        });

        taskInput.value = "";
        taskDetails.value = "";
        taskCheckBox.checked = false;

        renderTask();
      } else {
        alert("Please enter a task");
      }
    });
  };

  addTask();

  document.querySelector(".allTask").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      currentTask.splice(Number(e.target.id), 1);
      renderTask();
    }
  });
};
todoList();

const motivationalQuote = () => {
  const quote = document.querySelector(".motivation-2 h1");
  const author = document.querySelector(".motivation-3 h2");
  const changebtn = document.querySelector(".changeBtn");

  const fetchQuote = async () => {
    let response = await fetch("https://api.quotable.io/random");
    let data = await response.json();

    quote.innerHTML = data.content;
    author.innerHTML = "- " + data.author;
  };
  fetchQuote();
};
motivationalQuote();

const pomodoroTimer = () => {
  let timerInterval = null;
  let totalSeconds = 25 * 60;


  const timer = document.querySelector(".pomoTimer h1");
  const startBtn = document.querySelector(".startTimer");
  const pauseBtn = document.querySelector(".pauseTimer");
  const resetBtn = document.querySelector(".resetTimer");
  const alarmSound = document.querySelector(".pomoTimer audio");

  const session = document.querySelector('.pomoTimer .session')

  let isWorkSession = true;

  const updateTimer = () => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    
    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (timerInterval) return;

   
    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimer(); 
      } else {
        updateTimer(); 
        clearInterval(timerInterval);
        timerInterval = null;

        if (isWorkSession) {
          session.innerHTML = 'Break Time'
          session.style.backgroundColor = 'var(--blue)'
          isWorkSession = false;
          totalSeconds = 5 * 60;
          alarmSound.play();
          console.log("Work session ended. Break time loaded! Press Start to begin.");

        } else {
          session.innerHTML = 'Work Session'
          session.style.backgroundColor = 'var(--green)'
          isWorkSession = true;
          totalSeconds = 25 * 60;
          alarmSound.play();
          console.log("Break session ended. Work time loaded! Press Start to begin.");
        } 
        updateTimer(); 
      }
    }, 1); 
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;

    isWorkSession = true;
    totalSeconds = 25 * 60;

    updateTimer();
  };

  
  updateTimer();

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
};
pomodoroTimer();

