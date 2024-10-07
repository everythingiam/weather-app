import api from './api';
import utils from './utils';
import dom from './dom';

var city = 'forks';

document.querySelector('form')!.addEventListener('submit', (e) => {
	e.preventDefault();
	city = document.querySelector('input')!.value;
	dom.hideElements();
	init();
})

async function init() {
	try {
		await utils.setKeyFromTxt('./assets/my-api-key.txt');
		const allData = await api.getAllDataFromCity(city);
		const data = await api.getWeatherData(city);
		console.log('все данные по городу:', allData);
		dom.init(data);
	} catch (error) {
		console.error('Ошибка в процессе:', error);
	}
}

init();
