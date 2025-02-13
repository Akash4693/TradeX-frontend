import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop, deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const AllProducts = () => {
  const { products = [], isLoading } = useSelector((state) => state.products); // Default to empty array
  const { seller } = useSelector((state) => state.seller);
  
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(getAllProductsShop(seller._id));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [dispatch, seller._id]);

  useEffect(() => {
    const formattedRows = products.map((item) => ({
      id: item._id,
      name: item.name,
      price: `US$ ${item.discountPrice}`,
      stock: item.stock, // Ensure field name is consistent
      sold: item.sold_out, // Ensure field name is consistent
    }));
    setRows(formattedRows);
  }, [products]);

  const handleDelete = async (id) => {
    try {
      // Optimistically update the UI
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      
      // Dispatch delete action
      await dispatch(deleteProduct(id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      // Optionally, handle the error by reverting the optimistic update
      // refetchProducts(); // Uncomment if you have a refetch function
    }
  };

  const columns = [
    { 
      field: "id", 
      headerName: "Product Id", 
      minWidth: 150, 
      flex: 0.7 
    },
    { 
      field: "name", 
      headerName: "Name", 
      minWidth: 180, 
      flex: 1.4 
    },
    { 
      field: "price", 
      headerName: "Price", 
      minWidth: 100, 
      flex: 0.6 
    },
    { 
      field: "stock", 
      headerName: "Stock", // Ensure this matches the field name in formattedRows
      type: "number", 
      minWidth: 80, 
      flex: 0.5 
    },
    { 
      field: "sold", 
      headerName: "Sold out", 
      type: "number", 
      minWidth: 130, 
      flex: 0.6 
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/product/${params.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;



 

/* import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);//added seller.-id by me now 

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload(); 
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => {
              handleDelete(params.id)
           }}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;
  */