import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteCategory,
  resetMutationResult,
  selectAllCategories,
  selectCategoryMutationResult,
} from "../../../redux/features/categorySlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import DeleteForeeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import BoxShadowLoader from "../../Skeletons/BoxShadowLoader";


const CategoryList = () => {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector(selectAllCategories);
  const { success } = useSelector(selectCategoryMutationResult);

  const deleteHandler = (id) => {
    dispatch(deleteCategory({ id, toast }));
  };

  const columns = [
    {
      field: "title",
      headerName: "Categories",
      headerClassName: "gridHeader",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "description",
      headerName: "Description",
      headerClassName: "gridHeader",
      flex: 1.5,
      minWidth: 250,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "gridHeader",
      flex: 0.5,
      minWidth: 80,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/authorized/category/${params.row.id}`}>
              <Tooltip title="Edit" placement="top">
                <EditIcon
                  sx={{ width: "20px", height: "20px", color: "#1976d2" }}
                />
              </Tooltip>
            </Link>
            <Tooltip title="Delete" placement="top">
              <IconButton
                color="error"
                component="span"
                onClick={() => deleteHandler(params.row.id)}
              >
                <DeleteForeeverIcon sx={{ width: "20px", height: "20px" }} />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];
  const rows = [];
  categories &&
    categories.forEach((category) => {
      rows.push({
        id: category._id,
        title: category.title,
        description: category.description,
      });
    });
  useEffect(
    (success) => {
      if (success) {
        dispatch(resetMutationResult());
      }
      dispatch(getCategories({ toast }));
    },
    [dispatch, success]
  );

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "15px",
        textAlign: "center",
      }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Full list of Categories
      </Typography>
      {loading ? (
        <BoxShadowLoader />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          autoHeight
        />
      )}
    </Box>
  );
};

export default CategoryList;
