class Helpers {
	static socketPath(pathname) {
		const splitedPath = pathname.split(':');
		const port = json.port;
		return `${splitedPath[0]}:${splitedPath[1]}:${port}`;
	}
}

export const __handlePath = Helpers.socketPath;
