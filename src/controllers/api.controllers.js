class Api {
	static async request() {
		return await fetch("https://kenzie-olympics.herokuapp.com/paises")
			.then((data) => data.json())
			.then((data) => data)
			.catch((err) => err);
	}
}
export { Api };
