'use strict';

const startTime = new Date().getTime();

// Input
// TO-DO: Change to read XLSX files
const RAW_ANSWERS = '10,8,6,9,10,8,10,7,10,9,10,10,8,10,0,5,9,10,9,7,7,10,9,10,2,8,10,9,0,7,10,9,10,10,5,9,8,9,8,5,10,10,10,10,10,5,10,10,5,9,10,9,10,7,10,9,7,7,10,4,10,10,10,6,9,8,6,10,3,9,10,10,5,3,8,5,9,5,8,5,7,10,5,4,7,10,5,0,5,8,10,9,10,8,10,10,4,8,10,7,5,5,8,9,8,9,10,0,10,10';
const ANSWERS = RAW_ANSWERS.split(',');

// Checks if any list answers are invalid
function validateAnswers(answers) {

	for (let i = 0, li = answers.length; i < li; i++) {

		if (isNaN(answers[i])) {

			return false;
		}

		const answer = Number(answers[i]);

		if (answer < 0 || answer > 10) {

			return false;
		}
	}

	return true;
}

// Checks if an answer is in the given range
function checkAnswer(answer, min, max) {

	const intAnswer = Number(answer);

	return intAnswer >= min && intAnswer <= max;
}

// Filter answers that are in a given range
function filterTotalAnswers(answers, min, max) {

	return answers.filter(answer => checkAnswer(answer, min, max)).length;
}

// Get percent value
function getPercent(value, total) {

	return (value / total) * 100;
}

// Get NPS zone
function getZone(nps) {

	if (nps > 75 && nps <= 100) {

		return 'Excellence';
	} else if (nps > 50 && nps <= 75) {

		return 'Quality';
	} else if (nps > 0 && nps <= 50) {

		return 'Improvement';
	} else {

		return 'Critical';
	}
}

if (validateAnswers(ANSWERS) === false) {

	console.log('There are some invalid answer values in your input. Please check!');
} else {

	const totalAnswers = ANSWERS.length;
	const totalDetractors = filterTotalAnswers(ANSWERS, 0, 6);
	const totalPassives = filterTotalAnswers(ANSWERS, 7, 8);
	const totalPromoters = filterTotalAnswers(ANSWERS, 9, 10);

	const percentDetractors = getPercent(totalDetractors, totalAnswers);
	const percentPassives = getPercent(totalPassives, totalAnswers);
	const percentPromoters = getPercent(totalPromoters, totalAnswers);

	const NPS = Math.round(percentPromoters - percentDetractors);
	const zone = getZone(NPS);

	console.log('\n|------------|');
	console.log('|  NODE NPS  |');
	console.log('|------------|\n');
	console.log(`Total answers: ${totalAnswers}\n`);
	console.log(`Detractors: ${totalDetractors} (${percentDetractors.toFixed(2)}%)`);
	console.log(`Passives: ${totalPassives} (${percentPassives.toFixed(2)}%)`);
	console.log(`Promoters: ${totalPromoters} (${percentPromoters.toFixed(2)}%)\n`);
	console.log(`YOUR NPS: ${NPS}\n`);
	console.log(`You are at [${zone}] Zone.\n`);
	console.log(`Result given in ${((new Date().getTime() - startTime) / 100).toFixed(5)} sec.`);
}