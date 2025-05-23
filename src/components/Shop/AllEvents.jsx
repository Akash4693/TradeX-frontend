/* import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event";
import Loader from "../Layout/Loader";

const AllEvents = () => {
  const { events = [], isLoading } = useSelector((state) => state.events); // Add default value for events
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (seller && seller._id) {
        try {
          await dispatch(getAllEventsShop(seller._id));
        } catch (error) {
          console.error("Failed to fetch events: ", error);
        }
      }
    };
    fetchEvents();
  }, [dispatch, seller]);

  useEffect(() => {
    if (events) {
      const formattedRows = events.map((item) => ({
        id: item._id,
        name: item.name,
        price: `US$ ${item.discountPrice}`,
        stock: item.stock,
        sold: item.sold_out,
      }));
      setRows(formattedRows);
    }
  }, [events]);

  const handleDelete = async (id) => {
    try {
      // Optimistically update the UI
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));

      // Dispatch delete action
      await dispatch(deleteEvent(id));
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
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
      field: "stock",
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
      sortable: false,
      renderCell: (params) => {
        const productName = params.row.name.replace(/\s+/g, "-");
        return (
          <Link to={`/product/${productName}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleDelete(params.id)}>
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
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

export default AllEvents;
 




 */



import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";

const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await dispatch(getAllEventsShop(seller._id));    
      } catch (error) {
        console.error("Failed to fetch events: ", error);
      }
    };
      fetchEvents();
  }, [dispatch, seller._id]);

  useEffect(() => {
    if (events) {
    const formattedRows = events?.map((item) => ({
      id: item._id,
      name: item.name,
      price: `US$ ${item.discountPrice}`,
      stock: item.stock,
      sold: item.sold_out,
    }));
    setRows(formattedRows);
  }
  }, [events])

  const handleDelete = async (id) => {
    try {
      // Optimistically update the UI
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    
      // Dispatch delete action
      await dispatch(deleteEvent(id));
       toast.success("Event deleted successfully.");
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast.error("Failed to delete event. Please try again.");
    }
  }

  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },
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
      field: "stock",
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
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <Link to={`/product/${product_name}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
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
    
            <Button
            onClick={() => handleDelete(params.id)}
            >
              <AiOutlineDelete size={20} />
            </Button>
        
        );
      },
    },
  ];

/*   const row = [];

  events &&
  events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item.sold_out,
      });
    });
 */
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

export default AllEvents;
 