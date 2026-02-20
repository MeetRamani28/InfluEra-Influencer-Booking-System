// Categories.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../features/category/CategoryActions";
import { clearCategoryState } from "../../features/category/CategorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error, successMessage } = useSelector(
    (state) => state.category
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      setToastType("success");
      setToastMessage(successMessage);
      setToastOpen(true);
      dispatch(clearCategoryState());
    }
    if (error) {
      setToastType("error");
      setToastMessage(error);
      setToastOpen(true);
      dispatch(clearCategoryState());
    }
  }, [successMessage, error, dispatch]);

  const handleOpenCreate = () => {
    setEditCategory(null);
    setFormData({ name: "" });
    setOpenDialog(true);
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setFormData({ name: category.name });
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      setToastType("error");
      setToastMessage("Category name cannot be empty!");
      setToastOpen(true);
      return;
    }

    if (editCategory) {
      dispatch(updateCategory({ id: editCategory._id, data: formData }));
    } else {
      dispatch(createCategory(formData));
    }

    setOpenDialog(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={4}>
          Categories Management
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCreate}
          sx={{ mb: 3 }}
        >
          Add Category
        </Button>

        {loading && (
          <Box textAlign="center" mt={6}>
            <CircularProgress />
          </Box>
        )}

        {!loading && categories.length === 0 && (
          <Typography color="text.secondary">No categories found.</Typography>
        )}

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} md={6} key={category._id}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {category.name}
                  </Typography>

                  <Box mt={2} display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add/Edit Category Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>
            {editCategory ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              label="Category Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              {editCategory ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={toastOpen}
          autoHideDuration={3000}
          onClose={() => setToastOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setToastOpen(false)}
            severity={toastType}
            sx={{ width: "100%" }}
          >
            {toastMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Categories;
