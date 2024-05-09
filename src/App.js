import { useState } from "react";
import "./App.css";

function App() {
	const [userData, setUserData] = useState([]);
	const [singleUserData, setSingleUserData] = useState(null);
	const [moreInfo, setmoreInfo] = useState(false);
	const fetchData = () => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((data) => {
				setUserData(data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	};
	const showMoreInfo = (id) => {
		fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setSingleUserData(data);
				setmoreInfo(true);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	};
	const [showAll, setShowAll] = useState(false);

	const handleClick = () => {
		setShowAll(!showAll);
	};

	return (
		<div className="App">
			<button
				className="bg-orange-500 px-4 py-2 rounded-md my-8 font-medium text-white"
				onClick={() => fetchData()}
			>
				Fetch Data
			</button>
			<section>
				<div>
					<h2 className="text-2xl font-medium">
						This will show the user information
					</h2>
					<div>
						{userData && userData.length > 0 && (
							<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 mt-6 justify-items-center items-center">
								{showAll
									? userData.map((user, index) => (
											<div
												className="bg-orange-200 p-2 rounded-md max-w-72"
												key={index}
											>
												<p>Name: {user.name}</p>
												<p>Email: {user.email}</p>
												{moreInfo && singleUserData.id === user.id ? (
													<p>{singleUserData.phone}</p>
												) : (
													``
												)}
												<button
													onClick={() => showMoreInfo(user.id)}
													className="px-2 mt-2 rounded-sm bg-orange-400"
												>
													More Info
												</button>
											</div>
									  ))
									: userData.slice(0, 6).map((user, index) => (
											<div
												className="bg-orange-200 p-2 rounded-md max-w-72"
												key={index}
											>
												<p>Name: {user.name}</p>
												<p>Email: {user.email}</p>
												{moreInfo && singleUserData.id === user.id ? (
													<p>{singleUserData.phone}</p>
												) : (
													``
												)}
												<button
													onClick={() => showMoreInfo(user.id)}
													className="px-2 mt-2 rounded-sm bg-orange-400"
												>
													More Info
												</button>
											</div>
									  ))}
							</div>
						)}
						{userData && userData.length > 6 && (
							<button
								className="bg-orange-500 px-4 py-2 rounded-md my-8 font-medium text-white"
								onClick={handleClick}
							>
								{showAll ? "Show Less" : "Show More"}
							</button>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}

export default App;
