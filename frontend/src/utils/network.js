/**
 * Envoie la requête fetch
 * @param {String} url - url de requête
 * @returns {Promise} - Promise avec le résultat de requête
 */
export const getApiResource = async (url) => {
	try {
		const res = await fetch(url, {
			credentials: 'include'
		});
		if (!res.ok) {
			console.error('Could not fetch. ', res.status);
			return false;
		};
		return await res.json();
	} catch(error) {
		console.error('Could not fetch. ', error.message);
		return false;
	}
}



export const postApiObjet = async (url, body) => {
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
			"Content-Type": "application/json"
			},
			credentials: 'include',
			body: JSON.stringify(body)
		});

		if (!res.ok) {
			console.error('Could not fetch. ', res.status);
			return false;
		};
		return await res.json();
	} catch(error) {
		console.error('Could not fetch. ', error.message);
		return false;
	}
}

export const postApiObjetWithImage = async (url, data) => {
	try {
		const res = await fetch(url, {
			method: "POST",
		//	headers: {
		//	"Content-Type": 'multipart/form-data'
		//	},
			credentials: 'include',
			body: data
		});

		if (!res.ok) {
			console.error('Could not fetch. ', res.status);
			return false;
		};
		return await res.json();
	} catch(error) {
		console.error('Could not fetch. ', error.message);
		return false;
	}
}

export const putApiObjetWithImage = async (url, data) => {
	try {
		const res = await fetch(url, {
			method: "PUT",
		//	headers: {
		//	"Content-Type": 'multipart/form-data'
		//	},
			credentials: 'include',
			body: data
		});

		if (!res.ok) {
			console.error('Could not fetch. ', res.status);
			return false;
		};
		return await res.json();
	} catch(error) {
		console.error('Could not fetch. ', error.message);
		return false;
	}
}

export const deleteApiObjet = async (url) => {
	try {
		const res = await fetch(url, {
			method: "DELETE",
			credentials: 'include'
		});

		if (!res.ok) {
			console.error('Could not fetch. ', res.status);
			return false;
		};
		return await res.json();
	} catch(error) {
		console.error('Could not fetch. ', error.message);
		return false;
	}
}

