"use client"
import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";

import { BiFilter, BiUser } from "react-icons/bi";
import { HiOutlineHome } from "react-icons/hi";
import { LiaShoppingCartSolid } from "react-icons/lia";

import SearchBox from "./SearchBox";
import requestHeader from "@/utils/requestHeader";
import { setLoading, storeUser } from "@/states/features/userSlice";
import apiUrl from "@/app/apiUrl";
import { AUTH_TOKEN_NAME } from "@/utils/constants";
import isLoggedIn from "@/utils/isLoggedIn";

export default function DesktopNavbar() {
	const mobileCategoryListRef = useRef(null);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [showMobileCategoryList, setShowMobileCategoryList] = useState(false);
	const [categroyList, setCategoryList] = useState(null);

	const handleShowMobileCategoryList = async () => {
		if (showMobileCategoryList) {
			setShowMobileCategoryList(false);
		} else {
			setShowMobileCategoryList(true);

			if (categroyList === null) {
				try {
					const res = await fetch(`${apiUrl}/category/get/all`);
					const categoryRes = await res.json();
					if (categoryRes) {
						setCategoryList(categoryRes.categories);
					}
				} catch (error) {
					setCategoryList(undefined);
				}
			} else {
				if (mobileCategoryListRef.current !== null) {
					mobileCategoryListRef.current.style.height = `${
						categroyList.length * 100
					}px`;
					mobileCategoryListRef.current.style.transition = "height 0.33s";
				}
			}
		}
	};
	const handleLogout = () => {
		localStorage.removeItem(AUTH_TOKEN_NAME);
		window.location = "/";
	};
	const getUserDetails = async () => {
		if (user.data === null && isLoggedIn() === true) {
			dispatch(setLoading(true));
			const res = await fetch(`${apiUrl}/user/get`, requestHeader("json")).then(
				(res) => res.json()
			);
			if (res) {
				if (res.success === true) {
					let totalPrice = 0;
					let totalProduct = 0;
					res.data.cartList.map((item) => {
						totalPrice += item.totalPrice;
						totalProduct += item.quantity;
					});
					dispatch(
						storeUser({
							operation: "success",
							data: {
								address: res.data.address,
								cartList: {
									list: [...res.data.cartList],
									totalPrice,
									totalProduct,
								},
								orderList: res.data.orderList,
								mobile: res.data.mobile,
								name: res.data.name,
							},
						})
					);
				}
			}
		}
	};

	useEffect(() => {
		getUserDetails();
	}, []);

	return (
		<div className="w-full bg-white shadow-sm sticky top-0 z-20 md:px-0">
			<nav className="cs-container py-1.5">
				<div className="grid grid-cols-12 items-center py-0 mb-2 lg:mb-0 lg:py-2">
					<div className="col-span-6 flex justify-start md:col-span-2">
						<Link href="/" className="font-bold text-2xl">
							<img src="/images/logo.png" className="h-[30px] sm:h-[35px]" />
						</Link>
					</div>
					<div className="md:col-span-6 justify-end w-full md:flex hidden">
						<SearchBox />
					</div>
					<div className="col-span-6 md:col-span-4 flex justify-end py-2 lg:py-0">
						<ul className="flex gap-1.5 sm:gap-3 items-center justify-end">
							<li>
								<Link
									href="/"
									className="text-slate-500 rounded-full border bg-slate-50/30 border-slate-200 p-2 flex items-center gap-1 text-base sm:text-lg"
								>
									<HiOutlineHome />
								</Link>
							</li>
							{user.data !== null && user.data !== undefined && (
								<li>
									<Link
										href="/user/profile/cart"
										className={`relative text-slate-500 rounded-full border bg-slate-50/30 border-slate-200 ${
											user.data !== undefined &&
											user.data.cartList.list.length > 0
												? "py-0.5"
												: "py-2"
										} px-2 flex items-center gap-1 text-base sm:text-lg`}
									>
										<LiaShoppingCartSolid />
										{user.data !== undefined &&
											user.data !== null &&
											user.data.cartList.list.length > 0 && (
												<span className="font-bold text-slate-800">
													{user.data.cartList.list.length}
												</span>
											)}
									</Link>
								</li>
							)}
							{user.isLoading === false &&
							user.data !== null &&
							user.data !== undefined ? (
								<>
									<li>
										<Link
											href="/user/profile/me"
											className="flex items-center rounded-full border bg-slate-50/30 border-slate-200 p-2 font-bold gap-1 text-base sm:text-lg"
										>
											<BiUser />
										</Link>
									</li>
									<li>
										<button
											onClick={handleLogout}
											className="flex items-center rounded-full border bg-slate-50/30 border-slate-200 py-1 px-3 font-semibold ms-2 gap-1 text-sm cursor-pointer md:text-base"
										>
											Logout
										</button>
									</li>
								</>
							) : (
								<li>
									<Link
										href="/user/login"
										className="text-slate-500 rounded-full border bg-slate-50/30 border-slate-200 p-2 flex items-center font-bold gap-1 text-base sm:text-lg"
									>
										<BiUser />
									</Link>
								</li>
							)}
						</ul>
					</div>
				</div>
				<div className="flex items-center md:hidden">
					<div className="relative">
						<button
							className={`flex items-center bg-slate-${
								showMobileCategoryList ? "300" : "200"
							} hover:bg-slate-300 py-[8.3px] px-2`}
							onClick={handleShowMobileCategoryList}
						>
							<p className="text-[13px] mr-1 font-semibold">Category</p>
							<BiFilter />
						</button>
						{showMobileCategoryList === true &&
							categroyList !== null &&
							categroyList !== undefined && (
								<div
									ref={mobileCategoryListRef}
									className="absolute top-full left-0 bg-white shadow-lg w-[160px] min-h-[50px] h-auto py-2"
								>
									{categroyList !== null &&
										categroyList.map((cat, i) => (
											<div
												key={i}
												className="group w-full h-full p-1 cursor-pointer"
											>
												<p className="text-[13px] font-semibold text-slate-600">
													{cat.name}
												</p>
												{cat.subcategories.length > 0 && (
													<div className="absolute left-full top-0 min-h-full bg-slate-50 w-full hidden group-hover:block p-2">
														{cat.subcategories.map((subcat, j) => (
															<Link
																href={`/product/category/${subcat.name}`}
																className="block text-[13px] py-0.5 font-semibold text-slate-600"
															>
																{subcat.name}
															</Link>
														))}
													</div>
												)}
											</div>
										))}
								</div>
							)}
						{categroyList === undefined && (
							<div className="absolute top-full left-0 bg-white shadow-lg w-[160px] min-h-[100px] h-auto py-2">
								<p className="text-[12px] text-center mt-6 text-slate-500 font-semibold">
									Failed to Fetch
								</p>
							</div>
						)}
					</div>
					<div className="w-full">
						<SearchBox />
					</div>
				</div>
			</nav>
		</div>
	);
}
