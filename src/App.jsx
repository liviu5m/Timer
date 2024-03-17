import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [initialTime, setInitialTime] = useState();
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [start, setStart] = useState(false);
  const [go, setGo] = useState(true);

  useEffect(() => {
    let interval;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      clearInterval(interval);
      toast("Timer has end.");
      resetTimer();
    }

    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(initialTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handleInputChange = (e) => {
    if (e.target.value <= 0) e.target.value = "";
    else if (e.target.value > 60) e.target.value = 60;
    else if (e.target.length > 2) e.target.value = 0;
    if (e.target.value > 0 && e.target.name == "seconds") setGo(true);
    if (e.target.value > 0 && e.target.name == "seconds") setGo(false);
    if (e.target.value == 60 && e.target.name == "minutes" && !go) {
      e.target.value = 59;
    }
  };

  const sendData = (e) => {
    e.preventDefault();
    if (e.target.minutes.value != "" || e.target.seconds.value != "") {
      setStart(true);
      setTime(e.target.minutes.value * 60 + parseInt(e.target.seconds.value));
      setInitialTime(
        e.target.minutes.value * 60 + parseInt(e.target.seconds.value)
      );
    } else {
      toast("Please fill at least 1 field");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column mt-5">
      {start ? (
        <>
          <h1>{isBreak ? "Break" : "Work"} Timer</h1>
          <div className="d-flex justify-content-center align-items-center flex-column mt-3">
            <h2>{formatTime(time)}</h2>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <button className="btn-primary btn" onClick={toggleTimer}>
                {isActive ? "Pause" : "Start"}
              </button>
              <button className="btn-primary btn" onClick={resetTimer}>
                Reset
              </button>
            </div>
          </div>
        </>
      ) : (
        <form
          className="d-flex justify-content-center align-items-center flex-column"
          onSubmit={sendData}
        >
          <div class="mb-3 d-flex justify-content-center align-items-center gap-3">
            <input
              type="number"
              min={0}
              max={60}
              defaultValue={""}
              class="form-control"
              placeholder="Minutes"
              name="minutes"
              onChange={handleInputChange}
            />
            <input
              type="number"
              min={0}
              max={60}
              defaultValue={""}
              class="form-control"
              placeholder="Seconds"
              name="seconds"
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
