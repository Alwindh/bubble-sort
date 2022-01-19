import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import React, { useState } from "react";

import "./App.css";

function App() {
	const [numberArray, setNumberArray] = useState([]);
	const [currentlyChecking, setCurrentlyChecking] = useState(null);
	const [loading, setLoading] = useState(true);
	const [arrayLength, setArrayLength] = useState(50);
	const [sorting, setSorting] = useState(false);
	const [sortingSpeed, setSortingSpeed] = useState(100);
	const [doneSorting, setDoneSorting] = useState(false);

	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

	function delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	function checkIfOrdered(number1, number2) {
		if (number1 > number2) {
			return false;
		} else {
			return true;
		}
	}

	async function sort() {
		setSorting(true);
		console.log("started sorting");
		let arrayOfNumbers = numberArray;
		let sorted = false;
		let runs = 1;
		while (!sorted) {
			let everythingSorted = true;
			for (let i = 0; i < arrayOfNumbers.length - runs; i++) {
				setCurrentlyChecking(i);
				if (!checkIfOrdered(arrayOfNumbers[i], arrayOfNumbers[i + 1])) {
					[arrayOfNumbers[i], arrayOfNumbers[i + 1]] = [arrayOfNumbers[i + 1], arrayOfNumbers[i]];
					everythingSorted = false;
				}
				await delay(sortingSpeed);

				setNumberArray([...arrayOfNumbers]);
			}
			runs++;

			if (everythingSorted) {
				sorted = true;
				setCurrentlyChecking(null);
			}
		}
		console.log("done sorting");
		console.log(numberArray);
		console.log(arrayOfNumbers);
		setSorting(false);
		setDoneSorting(true);
	}

	function returnNumberArray() {
		var printString = [];
		if (numberArray.length === 0) {
			return <>loading</>;
		}

		for (let i = 0; i < numberArray.length; i++) {
			const heightString = ((numberArray[i] / arrayLength) * 100).toString() + "%";

			if (
				(currentlyChecking === i && currentlyChecking !== null) ||
				(currentlyChecking + 1 === i && currentlyChecking !== null)
			) {
				printString.push(
					<div className="flexItem">
						<div className="bar active" style={{ minHeight: heightString }}></div>
					</div>
				);
			} else {
				printString.push(
					<div className="flexItem">
						<div className="bar passive" style={{ minHeight: heightString }}></div>
					</div>
				);
			}
		}
		return printString;
	}

	if (loading) {
		buildArray(arrayLength);
		setLoading(false);
	}

	function buildArray(newArrayLength) {
		let newArray = [];
		for (let i = 1; i < newArrayLength; i++) {
			newArray.push(i);
		}
		shuffleArray(newArray);
		setNumberArray([...newArray]);
		setDoneSorting(false);
	}

	const onArraySizeSliderChange = (e) => {
		if (e.target.value !== arrayLength) {
			setArrayLength(e.target.value);
			buildArray(e.target.value);
		}
	};
	const onSortingSpeedSliderChange = (e) => {
		if (e.target.value !== sortingSpeed) {
			setSortingSpeed(e.target.value);
		}
	};

	const speedMarks = [
		{
			value: 0,
			label: "Fast",
		},
		{
			value: 100,
			label: "Medium",
		},
		{
			value: 200,
			label: "Slow",
		},
	];

	const sizeMarks = [
		{
			value: 10,
			label: "10",
		},
		{
			value: 20,
			label: "20",
		},
		{
			value: 30,
			label: "30",
		},
		{
			value: 40,
			label: "40",
		},
		{
			value: 50,
			label: "50",
		},
		{
			value: 60,
			label: "60",
		},
		{
			value: 70,
			label: "70",
		},
		{
			value: 80,
			label: "80",
		},
		{
			value: 90,
			label: "90",
		},
		{
			value: 100,
			label: "100",
		},
	];

	function returnButton() {
		if (sorting) {
			return (
				<Button onClick={() => window.location.reload()} variant="contained" color="secondary">
					Reload
				</Button>
			);
		} else if (doneSorting) {
			return (
				<Button onClick={() => buildArray(arrayLength)} variant="contained" color="secondary">
					Reset
				</Button>
			);
		} else {
			return (
				<Button onClick={() => sort()} variant="contained">
					Sort
				</Button>
			);
		}
	}

	return (
		<Container>
			<Paper>
				<div className="flexContainer topBar">
					<div className="flexItem" style={{ textAlign: "center", alignSelf: "center" }}>
						{returnButton()}
					</div>
					<div className="flexItem2">
						<Typography id="input-slider" gutterBottom>
							Array size
						</Typography>
						<Slider
							defaultValue={50}
							step={null}
							marks={sizeMarks}
							min={10}
							max={100}
							value={arrayLength}
							onChange={onArraySizeSliderChange}
							disabled={sorting}
						/>
					</div>
					<div className="flexItem2">
						<Typography id="input-slider" gutterBottom>
							Sorting speed
						</Typography>
						<Slider
							onChange={onSortingSpeedSliderChange}
							value={sortingSpeed}
							min={0}
							max={200}
							step={null}
							defaultValue={100}
							marks={speedMarks}
							disabled={sorting}
						/>
					</div>
				</div>
				<div style={{ minHeight: "60vh" }} className="flexContainer">
					{returnNumberArray()}
				</div>
				<div style={{ paddingTop: "1em" }}></div>
			</Paper>
		</Container>
	);
}

export default App;
