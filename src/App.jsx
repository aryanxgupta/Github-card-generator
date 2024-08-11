import axios from "axios";
import { useCallback, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [showErr, setShowErr] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [username, setUsername] = useState("");

  const createCard = useCallback(async () => {
    setShowErr(false);
    setShowCard(false);
    try {
      const response = await axios.get(
        "https://api.github.com/users/" + username
      );
      setData(response.data);
      console.log(response.data);
      setShowCard(true);
    } catch (e) {
      setShowErr(true);
      console.log(e.error);
    }
  }, [username]);

  return (
    <div className="flex flex-col items-center gap-14 p-9 w-full min-h-screen">
      <div className="flex items-center justify-center gap-5 w-full">
        <input
          type="text"
          className="p-2 sm:p-4 text-xl sm:text-3xl font-mono font-bold shadow-md w-[60%] text-center rounded-2xl sm:rounded-3xl border-2 border-solid border-blue-200"
          placeholder="Enter your username to create your card"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button
          className="p-2 sm:p-4 text-2xl sm:text-3xl font-mono font-bold shadow-md rounded-2xl sm:rounded-3xl text-white bg-blue-400"
          onClick={() => {
            createCard();
          }}
        >
          Create
        </button>
      </div>
      {showCard && (
        <div className="h-[700px] w-[85vw] sm:w-[65vw] md:w-[65vw] lg:w-[30vw] bg-slate-50 overflow-hidden rounded-xl shadow-md">
          <div className="h-[80%] bg-slate-50 relative border-b-2 border-solid border-slate-200">
            <div className="h-[40%] w-full overflow-hidden">
              <img
                className="h-full w-full"
                src="https://images.unsplash.com/photo-1521080755838-d2311117f767?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="h-40 w-40 bg-white rounded-full absolute left-1/2 translate-x-[-50%] translate-y-[-70%] flex justify-center items-center">
              <div className="h-36 w-36 rounded-full overflow-hidden">
                <img className="h-full w-full" src={data.avatar_url} alt="" />
              </div>
            </div>
            <div className="h-[60%] flex flex-col items-center gap-2">
              <div className="text-black font-mono font-semibold text-xl sm:text-3xl pt-16">
                {data.login}
              </div>
              {data.name && data.location && (
                <div className="text-slate-400 font-sans text-lg px-4 text-center flex items-center gap-2">
                  <div className="text-slate-700 font-mono text-lg sm:text-xl pl-4 text-center">
                    {data.name},
                  </div>
                  <div className="text-slate-700 font-mono text-sm sm:text-xl pr-4 text-center">
                    {data.location}
                  </div>
                </div>
              )}
              <div className="text-gray-400 font-sans text-md sm:text-lg px-4 text-center my-3">
                {data.bio === null ? "NO BIO" : data.bio}
              </div>
              <div className="text-slate-400 font-mono text-lg sm:text-xl pr-4 text-center pb-2">
                Joined: {data.created_at.split('T')[0]}
              </div>
            </div>
          </div>
          <div className="h-[20%] flex px-4 py-3 items-center justify-around">
            <div className="flex flex-col items-center gap-1 font-mono font-bold border-r-2 border-solid border-slate-200 pr-2 sm:pr-5">
              <div className="text-xl sm:text-5xl">{data.public_repos}</div>
              <div className="text-sm sm:text-md text-center">Public Repos</div>
            </div>
            <div className="flex flex-col items-center gap-1 font-mono font-bold border-r-2 border-solid border-slate-200 pr-2 sm:pr-5">
              <div className="text-xl sm:text-5xl">{data.followers}</div>
              <div className="text-sm sm:text-md text-center">Followers</div>
            </div>
            <div className="flex flex-col items-center gap-1 font-mono font-bold">
              <div className="text-xl sm:text-5xl">{data.following}</div>
              <div className="text-sm sm:text-md text-center">Following</div>
            </div>
          </div>
        </div>
      )}
      {showErr && (
        <div className="flex items-center justify-center font-sans text-3xl shadow-lg bg-red-600 text-white p-3 rounded-xl animate-bounce">
          No user found
        </div>
      )}
    </div>
  );
}

export default App;
