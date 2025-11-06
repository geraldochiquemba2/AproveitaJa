import { useState } from 'react';
import CategoryFilter from '../CategoryFilter';

export default function CategoryFilterExample() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = ['Padaria', 'Laticínios', 'Frutas', 'Bebidas', 'Snacks'];

  return (
    <CategoryFilter
      categories={categories}
      selectedCategory={selectedCategory}
      onSelectCategory={(cat) => {
        setSelectedCategory(cat);
        console.log('Selected category:', cat);
      }}
    />
  );
}
