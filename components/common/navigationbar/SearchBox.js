"use client"
import { SEARCH_HISTORY } from '@/utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from "react";
import { BiSearch, BiUser } from "react-icons/bi";

export default function SearchBox() {
	const searchBoxRef = useRef(null);

	const [searchHistory, setSearchHistory] = useState(null);

	const [showSuggestion, setShowSuggestion] = useState(false);
	const handleSearchSuggestion = () => {
		setShowSuggestion(true);
	};
	const handleCloseSearchSuggestion = () => {
		setShowSuggestion(false);
	};

	const [searchKeyword, setSearchKeyword] = useState("");

	const navigate = useRouter();

	const handleOnSearchClick = () => {
		if (searchKeyword.trim() !== "") {
			let searchHistory = localStorage.getItem(SEARCH_HISTORY);
			console.log("old history: ", searchHistory);
			if (searchHistory === null || searchHistory === "") {
				searchHistory = [searchKeyword];
			} else {
				searchHistory = JSON.parse(searchHistory);
				console.log("parsed history: ", searchHistory);
				if (searchHistory.length === 5) {
					searchHistory.shift();
					searchHistory.unshift(searchKeyword);
				} else {
					searchHistory.unshift(searchKeyword);
				}
			}
			localStorage.removeItem(SEARCH_HISTORY);
			console.log("searchHistory: ", searchHistory);
			localStorage.setItem(SEARCH_HISTORY, JSON.stringify(searchHistory));
			setSearchHistory(searchHistory);
			navigate.push(`/product/search/${searchKeyword}`);
		}
	};
	const handleGetSearchHistory = (name) => {
		console.log("name: ", name);
		setSearchKeyword(name);
	};
	const SearchHistoryList = () => {
		if (searchHistory !== null) {
			let list = [];
			searchHistory.map((history, i) =>
				list.push(
					<Link
						href={`/product/search/${history}`}
						className="block text-slate-500 text-md m-2 cursor-pointer hover:bg-slate-100 p-1"
						key={i}
					>
						{searchHistory[i]}
					</Link>
				)
			);
			return list.map((item) => item);
		} else {
			return "";
		}
	};
	useEffect(() => {
		let history = localStorage.getItem(SEARCH_HISTORY);
		if (history === null) {
			history = JSON.stringify([]);
		}
		setSearchHistory(JSON.parse(history));
		document.addEventListener("click", (e) => {
			console.log(
				"searchBoxRef.current.contains(e.target): ",
				searchBoxRef.current.contains(e.target)
			);
		});
	}, []);
	return (
		<div
			ref={searchBoxRef}
			className={`w-full ${
				showSuggestion ? "drop-shadow-2xl rounded-xl" : "shadow-none"
			} xl:w-[85%] lg:w-[90%] md:w-[95%]`}
		>
			<div>
				<div className="relative flex items-center w-full justify-center">
					<input
						type="search"
						placeholder="Search your products..."
						value={searchKeyword}
						onChange={(e) => setSearchKeyword(e.target.value)}
						onBlur={(e) => handleCloseSearchSuggestion()}
						className="search-input border-none bg-slate-200 w-full transition-all px-3 py-2 outline-none text-sm md:py-3"
						onFocus={handleSearchSuggestion}
					/>
					<button
						className="px-3 py-2 outline-none border-none bg-black text-white font-semibold md:py-3"
						onClick={handleOnSearchClick}
					>
						<BiSearch size={20} />
					</button>
				</div>
				<div
					className={`${
						showSuggestion ? "block" : "hidden"
					} bg-white shadow-lg w-full absolute top-full z-20 left-0 right-0 min-h-[100px] h-auto`}
				>
					<SearchHistoryList />
					{/* <span className='block text-center text-slate-500 mt-14'>start typing...</span> */}
				</div>
			</div>
		</div>
	);
}
