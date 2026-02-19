export const fetchData = async (url, method, body = null) => {
	try {
		const config = {
			method: method.toUpperCase(),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}
		if (method.toUpperCase() !== 'GET' && body) {
			config.body = JSON.stringify(body)
		}
		const response = await fetch(url, config)
		const data = await response.json()
		if (!response.ok) {
			const error = new Error(data.message || 'Что-то пошло не так')
			error.data = data
			throw error
		}
		return data
	} catch (error) {
		console.error('Error fetching data:', error)
		throw error
	}
}
