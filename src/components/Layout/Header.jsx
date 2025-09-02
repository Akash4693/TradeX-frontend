import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineClose,
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { debounce } from "lodash";

import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import { Button } from "@material-ui/core";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  //const [search, setSearch] = useState("");
  //const [isSearching, setIsSearching] = useState(false);
  // const saveTimerRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const debouncedSearch = useMemo(
    () =>
      debounce((term) => {
        if (!term || term.trim().length === 0) {
          setSearchData([]);
          return;
        }
        const filteredProducts = allProducts.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchData(filteredProducts);
      }, 500),
    [allProducts]
  );

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    //setIsSearching(true);
    debouncedSearch(term);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchData([]);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  /*   useEffect(() => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(() => {
      handleSearchChange(search);
    }, 500); // Reduced debounce time for better UX

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [search]);  */

  console.log("isSeller", isSeller);

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative" onClick={() => setSearchData([])}>
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            {searchData.length > 0 ? (
              <AiOutlineClose
                size={25}
                className="absolute right-2 top-2 cursor-pointer"
                onClick={handleClearSearch}
              />
            ) : (
              <AiOutlineSearch
                size={30}
                className="absolute right-2 top-1.5 cursor-pointer"
              />
            )}
            {searchData && searchData.length !== 0 ? (
              <div className="absolute w-full bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex items-start py-3 hover:bg-gray-200">
                          <img
                            src={`${i.images[0]?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}

          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 mt-2"
              onClick={() => setOpen(true)}
            />
          </div>

          <div
            className="flex-1 mx-10 right-3 relative"
            onClick={() => setSearchData([])}
          >
            <input
              type="text"
              placeholder="Search Product..."
              className="mt-2 h-[36px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchData.length > 0 ? (
              <AiOutlineClose
                size={25}
                className="absolute right-2 top-7 transform -translate-y-1/2 cursor-pointer"
                onClick={handleClearSearch}
              />
            ) : (
              <AiOutlineSearch
                size={30}
                className="absolute right-2 top-7 transform -translate-y-1/2 "
              />
            )}

            {searchData && searchData.length > 0 ? (
              <div className="absolute bg-white z-10 shadow-md w-full left-0 mt-1 rounded-md">
                {searchData.map((i) => (
                  <Link key={i._id} to={`/product/${i._id}`}>
                    <div className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      <img
                        src={i.images[0]?.url}
                        alt=""
                        className="w-16 h-16 mr-3 rounded-sm"
                      />
                      <h5>{i.name}</h5>
                    </div>
                  </Link>
                ))}
              </div>
            ): null}
          </div>

          <div>
            <div
              className="absolute mr-[15px]"
              onClick={() => setOpenWishlist(true) || setOpen(false)}
            >
              <AiOutlineHeart size={30} className="mt-2 -ml-10" />
              <span className="absolute right-0 top-0 mr-2 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {wishlist && wishlist.length}
              </span>
            </div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} className="mt-2" />
              <span className="absolute right-0 top-0 -mt-2  rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen grid grid-rows-[auto_1fr_auto]">
              <div className="w-full justify-between flex pr-3">
                 <div className="my-8 w-[92%] m-auto h-[40px relative]">
                 <Navbar active={activeHeading} />
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>
              
              <div className="flex-1"></div>

              <div className="flex flex-col items-center gap-4 pb-12 sm:pb-16 md:pb-20">
              <div className={`${styles.button} !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
             
              

              <div className="flex w-full justify-center gap-3">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className="w-14 h-14 rounded-full border-4 border-[#0eae88] shadow-md hover:scale-105 transition-transform duration-200"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-5 py-2 text-white bg-[#3957db] hover:bg-[#2f47b8] rounded-lg text-sm font-semibold shadow-md transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/sign-up"
                      className="px-5 py-2 text-white bg-[#3bc177] hover:bg-[#30a765] rounded-lg text-sm font-semibold shadow-md transition-colors"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
