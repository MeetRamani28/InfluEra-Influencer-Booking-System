import { Box, Chip } from "@mui/material";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap" mb={5} gap={2}>
      <Chip
        label="All"
        clickable
        color={selectedCategory === "ALL" ? "primary" : "default"}
        onClick={() => onSelectCategory("ALL")}
        sx={{ fontWeight: 600, px: 2, py: 1 }}
      />
      {categories.map((cat) => (
        <Chip
          key={cat._id}
          label={cat.name}
          clickable
          color={selectedCategory === cat._id ? "primary" : "default"}
          onClick={() => onSelectCategory(cat._id)}
          sx={{ fontWeight: 600, px: 2, py: 1 }}
        />
      ))}
    </Box>
  );
};

export default CategoryFilter;
