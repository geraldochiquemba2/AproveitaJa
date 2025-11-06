import AddProductForm from '../AddProductForm';

export default function AddProductFormExample() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <AddProductForm
        onSubmit={(data) => console.log('Product submitted:', data)}
      />
    </div>
  );
}
