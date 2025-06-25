import { Category } from '../types';

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: Category[] = [
  'all',
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="category-filter">
      {categories.map(category => (
        <button
          key={category}
          className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}; 