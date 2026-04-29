import { useState } from "react";

const defaultFormData = {
  name: "",
  category: "",
  price: "",
  discountPercentage: "",
  description: "",
  imageUrl: "",
};

function ItemForm({ initialValues, onSubmit, submitText }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(
    initialValues ? { ...defaultFormData, ...initialValues } : defaultFormData
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        price: Number(formData.price),
        discountPercentage:
          formData.discountPercentage === ""
            ? 0
            : Number(formData.discountPercentage),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{submitText}</h2>

      <label>Item Name</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Category</label>
      <input name="category" value={formData.category} onChange={handleChange} required />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>Discount Percentage</label>
      <input
        type="number"
        name="discountPercentage"
        value={formData.discountPercentage}
        onChange={handleChange}
        min="0"
        max="100"
        step="0.01"
      />

      <label>Description</label>
      <textarea
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Image URL</label>
      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

      <button className="btn primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitText}
      </button>
    </form>
  );
}

export default ItemForm;
