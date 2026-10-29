"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./createProduct.module.css";

export interface ProductFormData {
  sku: string;
  image: File;
  productType: string;
  unit: string;
  description: string;
  brand: string;
  name: string;
}

interface ProductCreateCardProps {
  onSubmit?: (product: ProductFormData) => void | Promise<void>;
  onClose: () => void;
}

const productTypes = [
  { value: "monografia", label: "Monografía" },
  { value: "biografia", label: "Biografía" },
  { value: "cuadernos", label: "Cuadernos" },
  { value: "libros", label: "Libros" },
  { value: "papeleria", label: "Papelería" },
  { value: "otro", label: "Otro" },
];

const units = [
  { value: "pieza", label: "Piezas" },
  { value: "hoja", label: "Hojas" },
  { value: "paquete", label: "Paquetes" },
  { value: "caja", label: "Cajas" },
  { value: "docena", label: "Docenas" },
];

export default function CreateProduct({
  onSubmit,
  onClose,
}: ProductCreateCardProps) {
  const [sku, setSku] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [productType, setProductType] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(image);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen válido.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no debe superar los 5 MB.");
      event.target.value = "";
      return;
    }

    setError("");
    setImage(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!image) {
      setError("Debes seleccionar una imagen del producto.");
      return;
    }

    const product: ProductFormData = {
      sku: sku.trim(),
      image,
      productType,
      unit,
      description: description.trim(),
      brand: brand.trim(),
      name: name.trim(),
    };

    try {
      setLoading(true);
      await onSubmit?.(product);
    } catch {
      setError("No se pudo registrar el producto. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setSku("");
    setImage(null);
    setProductType("");
    setUnit("");
    setDescription("");
    setBrand("");
    setName("");
    setError("");
  }

  return (
    <section className={styles.sectionCard}>
      <div className={styles.card}>
        <button type="button" onClick={onClose}>
          Cerrar
        </button>
        <header className={styles.header}>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>INVENTARIO</span>
            <h2>Crear producto</h2>
            <p>Completa la información para registrar un nuevo producto.</p>
          </div>

          <div className={styles.headerIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12v8.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M16.5 3.8 21 6.3"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </div>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.sectionTitle}>
            <span className={styles.step}>01</span>
            <div>
              <h3>Información general</h3>
              <p>Identifica y clasifica el producto.</p>
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="sku">
                SKU <span>*</span>
              </label>
              <input
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Ej. MON-0001"
                maxLength={80}
                required
              />
              <small>Código único de identificación.</small>
            </div>

            <div className={styles.field}>
              <label htmlFor="name">
                Nombre del producto <span>*</span>
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Aparato digestivo"
                maxLength={150}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="productType">
                Tipo de producto <span>*</span>
              </label>
              <select
                id="productType"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona un tipo
                </option>
                {productTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="unit">
                Unidad de producto <span>*</span>
              </label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona una unidad
                </option>
                {units.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label htmlFor="description">
                Descripción <span>*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe las características del producto..."
                rows={3}
                maxLength={1000}
                required
              />
              <small className={styles.counter}>
                {description.length}/1000 caracteres
              </small>
            </div>

            <div className={styles.field}>
              <label htmlFor="brand">
                Marca <span>*</span>
              </label>
              <input
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Ej. Trillas"
                maxLength={100}
                required
              />
            </div>
          </div>

          <div className={styles.sectionTitle}>
            <span className={styles.step}>02</span>
            <div>
              <h3>Imagen del producto</h3>
              <p>Agrega una imagen para reconocerlo fácilmente.</p>
            </div>
          </div>

          <div className={styles.uploadArea}>
            {preview ? (
              <div className={styles.previewContainer}>
                <img
                  src={preview}
                  alt="Vista previa del producto"
                  className={styles.preview}
                />
                <div className={styles.previewInfo}>
                  <strong>{image?.name}</strong>
                  <span>
                    {image ? (image.size / 1024 / 1024).toFixed(2) : "0"} MB
                  </span>
                  <button
                    type="button"
                    className={styles.removeImage}
                    onClick={() => setImage(null)}
                  >
                    Eliminar imagen
                  </button>
                </div>
                <label htmlFor="image" className={styles.changeImage}>
                  Cambiar
                </label>
              </div>
            ) : (
              <label htmlFor="image" className={styles.dropzone}>
                <span className={styles.uploadIcon}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 16V4m0 0L7 9m5-5 5 5M5 14v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <strong>Haz clic para subir una imagen</strong>
                <span>PNG, JPG, WEBP · Máximo 5 MB</span>
              </label>
            )}

            <input
              id="image"
              className={styles.fileInput}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleImageChange}
              required={!image}
            />
          </div>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <footer className={styles.footer}>
            <p>
              <span>*</span> Campos obligatorios
            </p>
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={resetForm}
                disabled={loading}
              >
                Limpiar
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Registrando..." : "Registrar producto"}
                {!loading && <span aria-hidden="true">→</span>}
              </button>
            </div>
          </footer>
        </form>
      </div>
    </section>
  );
}
//IO fix this