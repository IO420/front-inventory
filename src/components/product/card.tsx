"use client";

import { useCallback, useState, type FormEvent } from "react";
import { apiServerRequest } from "@/actions/apiConfig/config";
import { envConfig } from "@/actions/config";

import styles from "./card.module.css";
import SearchSelect, { SearchOption } from "../searchSelect/searchSelect";

export interface ExistingProduct {
  id: number;
  sku: string;
  name: string;
  brand: string;
}

export interface ExistingSupplier {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  active: boolean;
}

export interface NewSupplier {
  name: string;
  phone: string;
  address: string;
  email: string;
  active: boolean;
}

export interface InventoryEntryData {
  productId: number;
  quantity: number;
  purchaseCost: number;
  salePrice: number;
  supplierId: number | null;
  newSupplier: NewSupplier | null;
}

interface InventoryEntryCardProps {
  onSubmit: (data: InventoryEntryData) => void | Promise<void>;
  onClose?: () => void;
}

function extractRows<T>(responseData: unknown): T[] {
  if (Array.isArray(responseData)) {
    return responseData as T[];
  }

  if (responseData && typeof responseData === "object") {
    const data = responseData as Record<string, unknown>;

    for (const key of ["data", "items", "results", "rows"]) {
      if (Array.isArray(data[key])) {
        return data[key] as T[];
      }
    }
  }

  return [];
}

export default function InventoryEntryCard({
  onSubmit,
  onClose,
}: InventoryEntryCardProps) {
  const [selectedProduct, setSelectedProduct] = useState<SearchOption | null>(
    null,
  );

  const [selectedSupplier, setSelectedSupplier] = useState<SearchOption | null>(
    null,
  );

  const [quantity, setQuantity] = useState("");
  const [purchaseCost, setPurchaseCost] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const [showNewSupplier, setShowNewSupplier] = useState(false);

  const [supplier, setSupplier] = useState<NewSupplier>({
    name: "",
    phone: "",
    address: "",
    email: "",
    active: true,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchProducts = useCallback(
    async (query: string): Promise<SearchOption[]> => {
      const response = await apiServerRequest(
        `${envConfig.apiUrl}/products/search/${encodeURIComponent(query)}`,
      );

      const rows = extractRows<Record<string, unknown>>(response.data);

      return rows.map((product) => {
        const id = product.id_product ?? product.id;
        const name = String(product.name ?? "");
        const sku = String(product.sku ?? "");
        const brand = String(product.brand ?? "");

        return {
          id: String(id),
          label: name,
          description: [sku ? `SKU: ${sku}` : "", brand]
            .filter(Boolean)
            .join(" · "),
        };
      });
    },
    [],
  );

  const searchSuppliers = useCallback(
    async (query: string): Promise<SearchOption[]> => {
      const response = await apiServerRequest(
        `${envConfig.apiUrl}/suppliers/search`,
        {
          params: {
            q: query,
            limit: 20,
          },
        },
      );

      const rows = extractRows<Record<string, unknown>>(response.data);

      return rows
        .filter((item) => {
          const active = item.active;
          return active === true || active === 1;
        })
        .map((item) => ({
          id: String(item.id_supplier ?? item.id),
          label: String(item.name ?? ""),
          description: item.phone ? `Tel. ${String(item.phone)}` : undefined,
        }));
    },
    [],
  );

  function updateSupplier<K extends keyof NewSupplier>(
    key: K,
    value: NewSupplier[K],
  ) {
    setSupplier((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function openNewSupplierForm() {
    setSelectedSupplier(null);
    setShowNewSupplier(true);
    setError("");
  }

  function cancelNewSupplier() {
    setShowNewSupplier(false);
    setSupplier({
      name: "",
      phone: "",
      address: "",
      email: "",
      active: true,
    });
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const qty = Number(quantity);
    const cost = Number(purchaseCost);
    const price = Number(salePrice);

    if (!selectedProduct) {
      setError("Busca y selecciona el producto que deseas ingresar.");
      return;
    }

    if (!Number.isSafeInteger(qty) || qty <= 0) {
      setError("La cantidad debe ser un número entero mayor que cero.");
      return;
    }

    if (purchaseCost.trim() === "" || !Number.isFinite(cost) || cost < 0) {
      setError("Ingresa un costo de compra válido.");
      return;
    }

    if (salePrice.trim() === "" || !Number.isFinite(price) || price < 0) {
      setError("Ingresa un precio de venta válido.");
      return;
    }

    if (!showNewSupplier && !selectedSupplier) {
      setError("Selecciona un proveedor o registra uno nuevo.");
      return;
    }

    if (
      showNewSupplier &&
      (!supplier.name.trim() ||
        !supplier.phone.trim() ||
        !supplier.address.trim() ||
        !supplier.email.trim())
    ) {
      setError("Completa todos los campos obligatorios del proveedor.");
      return;
    }

    if (
      showNewSupplier &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supplier.email.trim())
    ) {
      setError("Ingresa un correo electrónico válido para el proveedor.");
      return;
    }

    const data: InventoryEntryData = {
      productId: Number(selectedProduct.id),
      quantity: qty,
      purchaseCost: cost,
      salePrice: price,
      supplierId: showNewSupplier ? null : Number(selectedSupplier!.id),
      newSupplier: showNewSupplier
        ? {
            ...supplier,
            name: supplier.name.trim(),
            phone: supplier.phone.trim(),
            address: supplier.address.trim(),
            email: supplier.email.trim(),
          }
        : null,
    };

    try {
      setLoading(true);
      await onSubmit(data);
    } catch {
      setError(
        "No se pudo registrar la entrada. Verifica los datos e inténtalo nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  const totalCost =
    quantity.trim() !== "" &&
    purchaseCost.trim() !== "" &&
    Number(quantity) > 0 &&
    Number(purchaseCost) >= 0
      ? Number(quantity) * Number(purchaseCost)
      : 0;

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>GESTIÓN DE EXISTENCIAS</span>
          <h2>Ingreso a inventario</h2>
          <p>
            Registra la entrada de productos existentes y sus datos de compra.
          </p>
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
              d="M12 16V9m-3 3 3-3 3 3"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.sectionTitle}>
          <span className={styles.step}>01</span>
          <div>
            <h3>Producto y cantidad</h3>
            <p>Busca el producto por nombre o SKU.</p>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <SearchSelect
              label="Producto existente *"
              placeholder="Escribe el nombre o SKU del producto..."
              value={selectedProduct}
              onChange={(option: any) => {
                setSelectedProduct(option);
                setError("");
              }}
              onSearch={searchProducts}
              minChars={2}
              disabled={loading}
            />
          </div>

          {selectedProduct && (
            <div className={`${styles.productSummary} ${styles.fullWidth}`}>
              <div className={styles.productMark}>
                {selectedProduct.label.charAt(0).toUpperCase()}
              </div>
              <div>
                <strong>{selectedProduct.label}</strong>
                {selectedProduct.description && (
                  <span>{selectedProduct.description}</span>
                )}
              </div>
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="quantity">
              Cantidad de entrada <span>*</span>
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              placeholder="Ej. 50"
              required
              disabled={loading}
            />
            <small>Unidades que ingresarán al inventario.</small>
          </div>
        </div>

        <div className={styles.sectionTitle}>
          <span className={styles.step}>02</span>
          <div>
            <h3>Información comercial</h3>
            <p>Define el costo de adquisición y el precio de venta.</p>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="purchaseCost">
              Costo de compra por unidad <span>*</span>
            </label>
            <div className={styles.moneyInput}>
              <span>$</span>
              <input
                id="purchaseCost"
                type="number"
                min="0"
                step="0.01"
                value={purchaseCost}
                onChange={(event) => setPurchaseCost(event.target.value)}
                placeholder="0.00"
                required
                disabled={loading}
              />
              <span className={styles.currency}>MXN</span>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="salePrice">
              Precio de venta por unidad <span>*</span>
            </label>
            <div className={styles.moneyInput}>
              <span>$</span>
              <input
                id="salePrice"
                type="number"
                min="0"
                step="0.01"
                value={salePrice}
                onChange={(event) => setSalePrice(event.target.value)}
                placeholder="0.00"
                required
                disabled={loading}
              />
              <span className={styles.currency}>MXN</span>
            </div>
          </div>

          <div className={`${styles.costSummary} ${styles.fullWidth}`}>
            <span>Costo total de esta entrada</span>
            <strong>
              {totalCost.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </strong>
            <small>Cantidad × costo de compra por unidad.</small>
          </div>
        </div>

        <div className={styles.sectionTitle}>
          <span className={styles.step}>03</span>
          <div>
            <h3>Proveedor</h3>
            <p>Busca un proveedor registrado o agrega uno nuevo.</p>
          </div>
        </div>

        <div className={styles.grid}>
          {!showNewSupplier && (
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <SearchSelect
                label="Proveedor *"
                placeholder="Escribe el nombre del proveedor..."
                value={selectedSupplier}
                onChange={(option: any) => {
                  setSelectedSupplier(option);
                  setError("");
                }}
                onSearch={searchSuppliers}
                minChars={2}
                disabled={loading}
              />

              <button
                type="button"
                className={styles.addSupplierButton}
                onClick={openNewSupplierForm}
                disabled={loading}
              >
                + Registrar nuevo proveedor
              </button>
            </div>
          )}
        </div>

        {showNewSupplier && (
          <div className={styles.supplierPanel}>
            <div className={styles.supplierHeader}>
              <div>
                <h4>Nuevo proveedor</h4>
                <p>Registra los datos de contacto del proveedor.</p>
              </div>
              <span className={styles.newBadge}>NUEVO</span>
            </div>

            <div className={styles.grid}>
              <div className={styles.field}>
                <label htmlFor="supplierName">
                  Nombre o razón social <span>*</span>
                </label>
                <input
                  id="supplierName"
                  value={supplier.name}
                  onChange={(event) =>
                    updateSupplier("name", event.target.value)
                  }
                  placeholder="Ej. Distribuidora Escolar"
                  maxLength={150}
                  required
                  disabled={loading}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="supplierPhone">
                  Teléfono <span>*</span>
                </label>
                <input
                  id="supplierPhone"
                  type="tel"
                  value={supplier.phone}
                  onChange={(event) =>
                    updateSupplier("phone", event.target.value)
                  }
                  placeholder="Ej. 5551234567"
                  maxLength={30}
                  required
                  disabled={loading}
                />
              </div>

              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label htmlFor="supplierAddress">
                  Dirección <span>*</span>
                </label>
                <input
                  id="supplierAddress"
                  value={supplier.address}
                  onChange={(event) =>
                    updateSupplier("address", event.target.value)
                  }
                  placeholder="Calle, número, colonia, ciudad..."
                  maxLength={250}
                  required
                  disabled={loading}
                />
              </div>

              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label htmlFor="supplierEmail">
                  Correo electrónico <span>*</span>
                </label>
                <input
                  id="supplierEmail"
                  type="email"
                  value={supplier.email}
                  onChange={(event) =>
                    updateSupplier("email", event.target.value)
                  }
                  placeholder="proveedor@empresa.com"
                  maxLength={254}
                  required
                  disabled={loading}
                />
              </div>

              <div className={`${styles.activeRow} ${styles.fullWidth}`}>
                <div>
                  <strong>Proveedor activo</strong>
                  <p>Puede utilizarse en futuras entradas de inventario.</p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={supplier.active}
                  aria-label="Proveedor activo"
                  className={`${styles.switch} ${
                    supplier.active ? styles.switchOn : ""
                  }`}
                  onClick={() => updateSupplier("active", !supplier.active)}
                  disabled={loading}
                >
                  <span />
                </button>
              </div>

              <div className={`${styles.fullWidth}`}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={cancelNewSupplier}
                  disabled={loading}
                >
                  Cancelar registro de proveedor
                </button>
              </div>
            </div>
          </div>
        )}

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
            {onClose && (
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar entrada"}
              {!loading && <span aria-hidden="true">→</span>}
            </button>
          </div>
        </footer>
      </form>
    </section>
  );
}
